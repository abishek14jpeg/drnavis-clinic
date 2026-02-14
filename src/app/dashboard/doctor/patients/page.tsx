"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

interface Pet {
    _id: string;
    name: string;
    species: string;
    breed: string;
    age?: number;
    weight?: number;
    medicalNotes?: string;
    ownerId: { _id: string; name: string; email: string };
}

export default function DoctorPatientsPage() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/pets").then(r => r.json()).then(data => {
            setPets(data);
            setLoading(false);
        });
    }, []);

    // Group pets by owner
    const byOwner: Record<string, { owner: { name: string; email: string }; pets: Pet[] }> = {};
    pets.forEach((pet) => {
        const ownerId = pet.ownerId?._id || "unknown";
        if (!byOwner[ownerId]) {
            byOwner[ownerId] = { owner: pet.ownerId || { name: "Unknown", email: "" }, pets: [] };
        }
        byOwner[ownerId].pets.push(pet);
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold font-heading">Patient Records</h2>

            {Object.keys(byOwner).length === 0 ? (
                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                    <Users className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No patients yet</h3>
                    <p className="text-muted-foreground">Patient records will appear once pet owners register.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {Object.entries(byOwner).map(([ownerId, { owner, pets: ownerPets }]) => (
                        <div key={ownerId} className="bg-card rounded-xl border border-border p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {owner.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold">{owner.name}</h3>
                                    <p className="text-sm text-muted-foreground">{owner.email}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {ownerPets.map((pet) => (
                                    <div key={pet._id} className="bg-muted/50 rounded-lg p-3 border border-border/50">
                                        <p className="font-semibold">{pet.name}</p>
                                        <p className="text-sm text-muted-foreground">{pet.species} • {pet.breed}</p>
                                        <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                                            {pet.age && <span>{pet.age} yrs</span>}
                                            {pet.weight && <span>{pet.weight} kg</span>}
                                        </div>
                                        {pet.medicalNotes && (
                                            <p className="text-xs text-muted-foreground mt-2 italic">{pet.medicalNotes}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
