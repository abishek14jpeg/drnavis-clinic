import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Appointment from "@/models/Appointment";

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const user = session.user as unknown as Record<string, string>;

    const appointment = await Appointment.findById(id);
    if (!appointment) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Patients can only cancel their own
    if (user.role === "PATIENT") {
        if (appointment.ownerId.toString() !== user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
        if (body.status && body.status !== "CANCELLED") {
            return NextResponse.json({ error: "Patients can only cancel" }, { status: 403 });
        }
    }

    const updated = await Appointment.findByIdAndUpdate(
        id,
        { $set: body },
        { new: true }
    ).populate("petId", "name species breed")
        .populate("ownerId", "name email phone");

    return NextResponse.json(updated);
}
