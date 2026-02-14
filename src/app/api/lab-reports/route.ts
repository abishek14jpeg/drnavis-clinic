import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import LabReport from "@/models/LabReport";

export async function GET() {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const user = session.user as unknown as Record<string, string>;

    let filter = {};
    if (user.role === "PATIENT") {
        // Get lab reports for this patient's pets
        const Pet = (await import("@/models/Pet")).default;
        const pets = await Pet.find({ ownerId: user.id }).select("_id");
        const petIds = pets.map((p: { _id: unknown }) => p._id);
        filter = { petId: { $in: petIds } };
    }

    const reports = await LabReport.find(filter)
        .populate("petId", "name species breed")
        .populate("createdBy", "name")
        .sort({ createdAt: -1 })
        .lean();

    return NextResponse.json(reports);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = session.user as unknown as Record<string, string>;
    if (user.role === "PATIENT") {
        return NextResponse.json({ error: "Only staff can create lab reports" }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();

    const report = await LabReport.create({
        petId: body.petId,
        appointmentId: body.appointmentId || null,
        testName: body.testName,
        testType: body.testType,
        results: body.results || "",
        status: body.results ? "COMPLETED" : "PENDING",
        createdBy: user.id,
        notes: body.notes || "",
    });

    return NextResponse.json(report, { status: 201 });
}
