import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Pet from "@/models/Pet";

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

    const pet = await Pet.findById(id);
    if (!pet) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (user.role === "PATIENT" && pet.ownerId.toString() !== user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await Pet.findByIdAndUpdate(id, { $set: body }, { new: true });
    return NextResponse.json(updated);
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const { id } = await params;
    const user = session.user as unknown as Record<string, string>;

    const pet = await Pet.findById(id);
    if (!pet) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (user.role === "PATIENT" && pet.ownerId.toString() !== user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Pet.findByIdAndDelete(id);
    return NextResponse.json({ message: "Pet deleted" });
}
