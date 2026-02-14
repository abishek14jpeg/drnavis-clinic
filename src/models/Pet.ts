import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IPet extends Document {
    name: string;
    species: string;
    breed: string;
    age?: number;
    weight?: number;
    ownerId: Types.ObjectId;
    medicalNotes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const PetSchema = new Schema<IPet>(
    {
        name: { type: String, required: true, trim: true },
        species: { type: String, required: true, trim: true },
        breed: { type: String, required: true, trim: true },
        age: { type: Number },
        weight: { type: Number },
        ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        medicalNotes: { type: String },
    },
    { timestamps: true }
);

const Pet: Model<IPet> =
    mongoose.models.Pet || mongoose.model<IPet>("Pet", PetSchema);

export default Pet;
