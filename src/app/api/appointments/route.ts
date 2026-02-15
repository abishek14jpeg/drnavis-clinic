import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";
import Pet from "@/models/Pet";

export async function GET() {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const user = session.user as unknown as Record<string, string>;
    const role = user.role;
    const userId = user.id;

    let filter = {};
    if (role === "PATIENT") {
        filter = { ownerId: userId };
    }
    // DOCTOR and RECEPTIONIST can see all

    const appointments = await Appointment.find(filter)
        .populate("petId", "name species breed")
        .populate("ownerId", "name email phone")
        .sort({ date: -1 })
        .lean();

    return NextResponse.json(appointments);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const user = session.user as unknown as Record<string, string>;
    const body = await req.json();

    // Verify the pet belongs to the user (if patient)
    if (user.role === "PATIENT") {
        const pet = await Pet.findById(body.petId);
        if (!pet || pet.ownerId.toString() !== user.id) {
            return NextResponse.json({ error: "Invalid pet" }, { status: 400 });
        }
    }

    const appointment = await Appointment.create({
        petId: body.petId,
        ownerId: user.role === "PATIENT" ? user.id : body.ownerId,
        doctorId: body.doctorId || null,
        date: new Date(body.date),
        timeSlot: body.timeSlot,
        reason: body.reason,
        appointmentType: body.appointmentType || "CLINIC",
        contactPhone1: body.contactPhone1 || "",
        contactPhone2: body.contactPhone2 || "",
        area: body.area || "",
        status: "PENDING",
        notes: body.notes || "",
    });

    return NextResponse.json(appointment, { status: 201 });
}
