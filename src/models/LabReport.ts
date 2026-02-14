import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ILabReport extends Document {
    petId: Types.ObjectId;
    appointmentId?: Types.ObjectId;
    testName: string;
    testType: string;
    results: string;
    status: "PENDING" | "COMPLETED";
    createdBy: Types.ObjectId;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const LabReportSchema = new Schema<ILabReport>(
    {
        petId: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
        appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment" },
        testName: { type: String, required: true },
        testType: { type: String, required: true },
        results: { type: String, default: "" },
        status: {
            type: String,
            enum: ["PENDING", "COMPLETED"],
            default: "PENDING",
        },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        notes: { type: String },
    },
    { timestamps: true }
);

const LabReport: Model<ILabReport> =
    mongoose.models.LabReport ||
    mongoose.model<ILabReport>("LabReport", LabReportSchema);

export default LabReport;
