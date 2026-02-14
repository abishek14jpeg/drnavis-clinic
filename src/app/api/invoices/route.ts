import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Invoice from "@/models/Invoice";

export async function GET() {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const user = session.user as unknown as Record<string, string>;

    let filter = {};
    if (user.role === "PATIENT") {
        filter = { ownerId: user.id };
    }

    const invoices = await Invoice.find(filter)
        .populate("ownerId", "name email phone")
        .populate("appointmentId")
        .sort({ createdAt: -1 })
        .lean();

    return NextResponse.json(invoices);
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = session.user as unknown as Record<string, string>;
    if (user.role === "PATIENT") {
        return NextResponse.json({ error: "Only staff can create invoices" }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();

    const total = body.items.reduce(
        (sum: number, item: { amount: number }) => sum + item.amount,
        0
    );

    const invoice = await Invoice.create({
        appointmentId: body.appointmentId || null,
        ownerId: body.ownerId,
        items: body.items,
        total,
        status: "UNPAID",
    });

    return NextResponse.json(invoice, { status: 201 });
}
