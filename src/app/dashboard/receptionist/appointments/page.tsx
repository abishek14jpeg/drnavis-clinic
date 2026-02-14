"use client";

import { useEffect, useState } from "react";
import { Calendar, CheckCircle, XCircle } from "lucide-react";

interface Appointment {
    _id: string;
    petId: { name: string; species: string };
    ownerId: { name: string; email: string; phone?: string };
    date: string;
    timeSlot: string;
    reason: string;
    status: string;
}

export default function ReceptionistAppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("ALL");

    const fetchAppointments = async () => {
        const res = await fetch("/api/appointments");
        const data = await res.json();
        setAppointments(data);
        setLoading(false);
    };

    useEffect(() => { fetchAppointments(); }, []);

    const updateStatus = async (id: string, status: string) => {
        await fetch(`/api/appointments/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        fetchAppointments();
    };

    const filtered = filter === "ALL" ? appointments : appointments.filter(a => a.status === filter);

    const statusColors: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-700",
        CONFIRMED: "bg-blue-100 text-blue-700",
        COMPLETED: "bg-green-100 text-green-700",
        CANCELLED: "bg-red-100 text-red-700",
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
                <h2 className="text-3xl font-bold font-heading">All Appointments</h2>
                <div className="flex gap-1 bg-muted rounded-lg p-1">
                    {["ALL", "PENDING", "CONFIRMED", "COMPLETED"].map((s) => (
                        <button key={s} onClick={() => setFilter(s)}
                            className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${filter === s ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"
                                }`}
                        >{s}</button>
                    ))}
                </div>
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                    <Calendar className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No appointments</h3>
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map((appt) => (
                        <div key={appt._id} className="bg-card rounded-xl border border-border p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl">🐾</div>
                                <div>
                                    <h3 className="font-bold">{appt.ownerId?.name} — {appt.petId?.name} ({appt.petId?.species})</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {appt.reason} • {new Date(appt.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} at {appt.timeSlot}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[appt.status] || ""}`}>
                                    {appt.status}
                                </span>
                                {appt.status === "PENDING" && (
                                    <>
                                        <button onClick={() => updateStatus(appt._id, "CONFIRMED")} className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Confirm">
                                            <CheckCircle className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => updateStatus(appt._id, "CANCELLED")} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Cancel">
                                            <XCircle className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
