import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IInvoiceItem {
    description: string;
    amount: number;
}

export interface IInvoice extends Document {
    appointmentId?: Types.ObjectId;
    ownerId: Types.ObjectId;
    items: IInvoiceItem[];
    total: number;
    status: "UNPAID" | "PAID";
    paidAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const InvoiceItemSchema = new Schema<IInvoiceItem>(
    {
        description: { type: String, required: true },
        amount: { type: Number, required: true },
    },
    { _id: false }
);

const InvoiceSchema = new Schema<IInvoice>(
    {
        appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment" },
        ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        items: { type: [InvoiceItemSchema], required: true },
        total: { type: Number, required: true },
        status: {
            type: String,
            enum: ["UNPAID", "PAID"],
            default: "UNPAID",
        },
        paidAt: { type: Date },
    },
    { timestamps: true }
);

const Invoice: Model<IInvoice> =
    mongoose.models.Invoice ||
    mongoose.model<IInvoice>("Invoice", InvoiceSchema);

export default Invoice;
