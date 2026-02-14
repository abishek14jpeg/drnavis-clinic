import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IQueueEntry extends Document {
    petId: Types.ObjectId;
    ownerId: Types.ObjectId;
    reason: string;
    status: "WAITING" | "CONSULTING" | "COMPLETED";
    position: number;
    checkedInAt: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const QueueEntrySchema = new Schema<IQueueEntry>(
    {
        petId: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
        ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        reason: { type: String, required: true },
        status: {
            type: String,
            enum: ["WAITING", "CONSULTING", "COMPLETED"],
            default: "WAITING",
        },
        position: { type: Number, required: true },
        checkedInAt: { type: Date, default: Date.now },
        notes: { type: String },
    },
    { timestamps: true }
);

const QueueEntry: Model<IQueueEntry> =
    mongoose.models.QueueEntry ||
    mongoose.model<IQueueEntry>("QueueEntry", QueueEntrySchema);

export default QueueEntry;
