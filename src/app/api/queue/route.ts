import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import QueueEntry from "@/models/QueueEntry";

export async function GET() {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();

    const entries = await QueueEntry.find({ status: { $ne: "COMPLETED" } })
        .populate("petId", "name species breed")
        .populate("ownerId", "name phone")
        .sort({ position: 1 })
        .lean();

    return NextResponse.json(entries);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const body = await req.json();

    // Get next position
    const lastEntry = await QueueEntry.findOne({ status: { $ne: "COMPLETED" } })
        .sort({ position: -1 });
    const nextPosition = lastEntry ? lastEntry.position + 1 : 1;

    const entry = await QueueEntry.create({
        petId: body.petId,
        ownerId: body.ownerId,
        reason: body.reason,
        status: "WAITING",
        position: nextPosition,
        notes: body.notes || "",
    });

    return NextResponse.json(entry, { status: 201 });
}

export async function PATCH(req: NextRequest) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = session.user as unknown as Record<string, string>;
    if (user.role === "PATIENT") {
        return NextResponse.json({ error: "Only staff can manage queue" }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();

    const updated = await QueueEntry.findByIdAndUpdate(
        body.id,
        { $set: { status: body.status } },
        { new: true }
    ).populate("petId", "name species breed")
        .populate("ownerId", "name phone");

    return NextResponse.json(updated);
}
