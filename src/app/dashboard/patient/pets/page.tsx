"use client";

import { useEffect, useState } from "react";
import { PawPrint, Plus, Trash2, Edit3, X } from "lucide-react";

interface Pet {
    _id: string;
    name: string;
    species: string;
    breed: string;
    age?: number;
    weight?: number;
    medicalNotes?: string;
}

export default function PatientPetsPage() {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editPet, setEditPet] = useState<Pet | null>(null);
    const [form, setForm] = useState({ name: "", species: "", breed: "", age: "", weight: "", medicalNotes: "" });

    const fetchPets = async () => {
        const res = await fetch("/api/pets");
        const data = await res.json();
        setPets(data);
        setLoading(false);
    };

    useEffect(() => { fetchPets(); }, []);

    const resetForm = () => {
        setForm({ name: "", species: "", breed: "", age: "", weight: "", medicalNotes: "" });
        setEditPet(null);
        setShowForm(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...form,
            age: form.age ? Number(form.age) : null,
            weight: form.weight ? Number(form.weight) : null,
        };

        if (editPet) {
            await fetch(`/api/pets/${editPet._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        } else {
            await fetch("/api/pets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        }
        resetForm();
        fetchPets();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to remove this pet?")) return;
        await fetch(`/api/pets/${id}`, { method: "DELETE" });
        fetchPets();
    };

    const startEdit = (pet: Pet) => {
        setEditPet(pet);
        setForm({
            name: pet.name,
            species: pet.species,
            breed: pet.breed,
            age: pet.age?.toString() || "",
            weight: pet.weight?.toString() || "",
            medicalNotes: pet.medicalNotes || "",
        });
        setShowForm(true);
    };

    const speciesEmoji: Record<string, string> = {
        Dog: "🐕", Cat: "🐈", Bird: "🐦", Rabbit: "🐇", Fish: "🐠", Hamster: "🐹",
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold font-heading">My Pets</h2>
                <button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add Pet
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">{editPet ? "Edit Pet" : "Add New Pet"}</h3>
                            <button onClick={resetForm} className="p-1 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Pet Name</label>
                                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary/50 outline-none" placeholder="e.g. Max" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Species</label>
                                    <select value={form.species} onChange={(e) => setForm({ ...form, species: e.target.value })} required className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary/50 outline-none">
                                        <option value="">Select</option>
                                        <option>Dog</option><option>Cat</option><option>Bird</option><option>Rabbit</option><option>Fish</option><option>Hamster</option><option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Breed</label>
                                    <input value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })} required className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary/50 outline-none" placeholder="e.g. Labrador" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Age (years)</label>
                                    <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary/50 outline-none" placeholder="e.g. 3" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                                    <input type="number" step="0.1" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary/50 outline-none" placeholder="e.g. 12.5" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Medical Notes</label>
                                <textarea value={form.medicalNotes} onChange={(e) => setForm({ ...form, medicalNotes: e.target.value })} rows={2} className="w-full px-3 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary/50 outline-none resize-none" placeholder="Any allergies, conditions..." />
                            </div>
                            <button type="submit" className="w-full py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-colors">
                                {editPet ? "Update Pet" : "Add Pet"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Pet Cards */}
            {pets.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                    <PawPrint className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No pets yet</h3>
                    <p className="text-muted-foreground">Add your first pet to get started!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pets.map((pet) => (
                        <div key={pet._id} className="bg-card rounded-xl border border-border p-5 hover:border-primary/30 transition-all group">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="text-3xl">{speciesEmoji[pet.species] || "🐾"}</div>
                                    <div>
                                        <h3 className="font-bold text-lg">{pet.name}</h3>
                                        <p className="text-sm text-muted-foreground">{pet.species} • {pet.breed}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => startEdit(pet)} className="p-1.5 hover:bg-muted rounded-lg"><Edit3 className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(pet._id)} className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <div className="flex gap-4 text-sm">
                                {pet.age && <span className="text-muted-foreground">{pet.age} yrs old</span>}
                                {pet.weight && <span className="text-muted-foreground">{pet.weight} kg</span>}
                            </div>
                            {pet.medicalNotes && (
                                <p className="mt-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded-lg">{pet.medicalNotes}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
