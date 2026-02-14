import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Pet from "@/models/Pet";

export async function GET() {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const user = session.user as unknown as Record<string, string>;

    let filter = {};
    if (user.role === "PATIENT") {
        filter = { ownerId: user.id };
    }

    const pets = await Pet.find(filter)
        .populate("ownerId", "name email")
        .sort({ createdAt: -1 })
        .lean();

    return NextResponse.json(pets);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const user = session.user as unknown as Record<string, string>;
    const body = await req.json();

    const pet = await Pet.create({
        name: body.name,
        species: body.species,
        breed: body.breed,
        age: body.age || null,
        weight: body.weight || null,
        ownerId: user.role === "PATIENT" ? user.id : body.ownerId,
        medicalNotes: body.medicalNotes || "",
    });

    return NextResponse.json(pet, { status: 201 });
}
