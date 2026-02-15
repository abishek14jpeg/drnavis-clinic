"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Check, MapPin, Phone, Home, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Pet {
    _id: string;
    name: string;
    species: string;
    breed: string;
}

const CLINIC_SLOTS_REGULAR = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
];

const CLINIC_SLOTS_WEDNESDAY = [
    "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
];

const HOUSE_CALL_SLOTS = [
    "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
    "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM",
    "04:30 PM", "05:00 PM", "05:30 PM",
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
        appointmentType: "CLINIC" as "CLINIC" | "HOUSE_CALL",
        contactPhone1: "",
        contactPhone2: "",
        area: "",
    });

    useEffect(() => {
        fetch("/api/pets").then(r => r.json()).then(data => {
            setPets(data);
            setLoading(false);
        });
    }, []);

    // Determine if selected date is Wednesday
    const isWednesday = form.date ? new Date(form.date).getDay() === 3 : false;

    // Get available time slots based on type and day
    const getTimeSlots = () => {
        if (form.appointmentType === "HOUSE_CALL") return HOUSE_CALL_SLOTS;
        if (isWednesday) return CLINIC_SLOTS_WEDNESDAY;
        return CLINIC_SLOTS_REGULAR;
    };

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

    const timeSlots = getTimeSlots();

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold font-heading">Book an Appointment</h2>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl border border-border p-6">
                {/* Appointment Type */}
                <div>
                    <label className="block text-sm font-semibold mb-2">Appointment Type</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, appointmentType: "CLINIC", timeSlot: "" })}
                            className={`p-4 border rounded-xl text-left transition-all flex items-center gap-3 ${form.appointmentType === "CLINIC"
                                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                    : "border-border hover:border-primary/30"
                                }`}
                        >
                            <Building2 className="w-5 h-5 text-primary" />
                            <div>
                                <p className="font-bold">Clinic Visit</p>
                                <p className="text-xs text-muted-foreground">Visit the clinic</p>
                            </div>
                        </button>
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, appointmentType: "HOUSE_CALL", timeSlot: "" })}
                            className={`p-4 border rounded-xl text-left transition-all flex items-center gap-3 ${form.appointmentType === "HOUSE_CALL"
                                    ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                    : "border-border hover:border-primary/30"
                                }`}
                        >
                            <Home className="w-5 h-5 text-green-600" />
                            <div>
                                <p className="font-bold">House Call</p>
                                <p className="text-xs text-muted-foreground">Doctor visits you</p>
                            </div>
                        </button>
                    </div>
                    {form.appointmentType === "CLINIC" && (
                        <p className="text-xs text-muted-foreground mt-2">
                            Mon, Tue, Thu–Sun: 10 AM – 1 PM &amp; 6 PM – 9 PM | Wed: 6 PM – 9 PM only
                        </p>
                    )}
                    {form.appointmentType === "HOUSE_CALL" && (
                        <p className="text-xs text-green-600 mt-2">
                            House calls available outside clinic hours. Address/area required.
                        </p>
                    )}
                </div>

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

                {/* Contact Information */}
                <div className="space-y-3">
                    <label className="block text-sm font-semibold flex items-center gap-2">
                        <Phone className="w-4 h-4" /> Contact Information
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-muted-foreground mb-1">Phone Number 1 *</label>
                            <input
                                type="tel"
                                value={form.contactPhone1}
                                onChange={(e) => setForm({ ...form, contactPhone1: e.target.value })}
                                required
                                className="w-full px-4 py-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary/50 outline-none"
                                placeholder="e.g. 93634 14845"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-muted-foreground mb-1">Phone Number 2 (optional)</label>
                            <input
                                type="tel"
                                value={form.contactPhone2}
                                onChange={(e) => setForm({ ...form, contactPhone2: e.target.value })}
                                className="w-full px-4 py-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary/50 outline-none"
                                placeholder="Alternate number"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-muted-foreground mb-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> Area / Address *
                        </label>
                        <input
                            type="text"
                            value={form.area}
                            onChange={(e) => setForm({ ...form, area: e.target.value })}
                            required
                            className="w-full px-4 py-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder={form.appointmentType === "HOUSE_CALL" ? "Full address for house call" : "Your area, e.g. Kalapatti, Saravanampatti"}
                        />
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
                        onChange={(e) => setForm({ ...form, date: e.target.value, timeSlot: "" })}
                        required
                        className="w-full px-4 py-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary/50 outline-none"
                    />
                    {form.date && isWednesday && form.appointmentType === "CLINIC" && (
                        <p className="text-xs text-amber-600 mt-1">Wednesday — clinic open only 6 PM – 9 PM</p>
                    )}
                </div>

                {/* Time Slot */}
                <div>
                    <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Select Time
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((slot) => (
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
                    disabled={submitting || !form.petId || !form.date || !form.timeSlot || !form.reason || !form.contactPhone1 || !form.area}
                    className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {submitting ? "Booking..." : `Confirm ${form.appointmentType === "HOUSE_CALL" ? "House Call" : "Appointment"}`}
                </button>
            </form>
        </div>
    );
}
