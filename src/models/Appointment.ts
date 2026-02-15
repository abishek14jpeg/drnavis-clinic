import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IAppointment extends Document {
    petId: Types.ObjectId;
    ownerId: Types.ObjectId;
    doctorId?: Types.ObjectId;
    date: Date;
    timeSlot: string;
    reason: string;
    appointmentType: "CLINIC" | "HOUSE_CALL";
    contactPhone1: string;
    contactPhone2?: string;
    area: string;
    status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
    {
        petId: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
        ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        doctorId: { type: Schema.Types.ObjectId, ref: "User" },
        date: { type: Date, required: true },
        timeSlot: { type: String, required: true },
        reason: { type: String, required: true },
        appointmentType: {
            type: String,
            enum: ["CLINIC", "HOUSE_CALL"],
            default: "CLINIC",
        },
        contactPhone1: { type: String, default: "" },
        contactPhone2: { type: String },
        area: { type: String, default: "" },
        status: {
            type: String,
            enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"],
            default: "PENDING",
        },
        notes: { type: String },
    },
    { timestamps: true }
);

const Appointment: Model<IAppointment> =
    mongoose.models.Appointment ||
    mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default Appointment;
