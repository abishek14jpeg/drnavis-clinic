"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface Pet {
    _id: string;
    name: string;
    species: string;
    breed: string;
}

const TIME_SLOTS = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM",
];

const REASONS = [
    "General Checkup", "Vaccination", "Dental Care", "Skin Issue",
    "Injury / Wound", "Deworming", "Surgery Consultation", "Follow Up", "Other"
];

export default function BookAppointmentPage() {
    const router = useRouter();
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const [form, setForm] = useState({
        petId: "",
        date: "",
        timeSlot: "",
        reason: "",
        notes: "",
    });

    useEffect(() => {
        fetch("/api/pets").then(r => r.json()).then(data => {
            setPets(data);
            setLoading(false);
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        const res = await fetch("/api/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            setSuccess(true);
            setTimeout(() => router.push("/dashboard/patient/appointments"), 2000);
        }
        setSubmitting(false);
    };

    // Min date = tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Appointment Booked!</h2>
                <p className="text-muted-foreground">Redirecting to your appointments...</p>
            </div>
        );
    }

    if (pets.length === 0) {
        return (
            <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <h3 className="text-xl font-semibold mb-2">No pets registered</h3>
                <p className="text-muted-foreground mb-4">Please add a pet before booking an appointment.</p>
                <button onClick={() => router.push("/dashboard/patient/pets")}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
                >
                    Add a Pet
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold font-heading">Book an Appointment</h2>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl border border-border p-6">
                {/* Select Pet */}
                <div>
                    <label className="block text-sm font-semibold mb-2">Select Pet</label>
                    <div className="grid grid-cols-2 gap-3">
                        {pets.map((pet) => (
                            <button
                                key={pet._id}
                                type="button"
                                onClick={() => setForm({ ...form, petId: pet._id })}
                                className={`p-4 border rounded-xl text-left transition-all ${form.petId === pet._id
                                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                        : "border-border hover:border-primary/30"
                                    }`}
                            >
                                <p className="font-bold">{pet.name}</p>
                                <p className="text-sm text-muted-foreground">{pet.species} • {pet.breed}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Select Date
                    </label>
                    <input
                        type="date"
                        min={minDate}
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        required
                        className="w-full px-4 py-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary/50 outline-none"
                    />
                </div>

                {/* Time Slot */}
                <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Select Time
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {TIME_SLOTS.map((slot) => (
                            <button
                                key={slot}
                                type="button"
                                onClick={() => setForm({ ...form, timeSlot: slot })}
                                className={`px-3 py-2 text-sm border rounded-lg transition-all ${form.timeSlot === slot
                                        ? "border-primary bg-primary/10 text-primary font-medium"
                                        : "border-border hover:border-primary/30"
                                    }`}
                            >
                                {slot}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reason */}
                <div>
                    <label className="block text-sm font-semibold mb-2">Reason for Visit</label>
                    <div className="flex flex-wrap gap-2">
                        {REASONS.map((reason) => (
                            <button
                                key={reason}
                                type="button"
                                onClick={() => setForm({ ...form, reason })}
                                className={`px-3 py-1.5 text-sm border rounded-full transition-all ${form.reason === reason
                                        ? "border-primary bg-primary text-white"
                                        : "border-border hover:border-primary/30"
                                    }`}
                            >
                                {reason}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-sm font-semibold mb-2">Additional Notes</label>
                    <textarea
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary/50 outline-none resize-none"
                        placeholder="Any symptoms, concerns, or special needs..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting || !form.petId || !form.date || !form.timeSlot || !form.reason}
                    className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {submitting ? "Booking..." : "Confirm Appointment"}
                </button>
            </form>
        </div>
    );
}
