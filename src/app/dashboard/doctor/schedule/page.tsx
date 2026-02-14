"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

interface Appointment {
    _id: string;
    petId: { name: string; species: string; breed: string };
    ownerId: { name: string };
    date: string;
    timeSlot: string;
    reason: string;
    status: string;
}

export default function DoctorSchedulePage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/appointments").then(r => r.json()).then(data => {
            setAppointments(data);
            setLoading(false);
        });
    }, []);

    const statusConfig: Record<string, { color: string; label: string }> = {
        PENDING: { color: "bg-yellow-500", label: "Pending" },
        CONFIRMED: { color: "bg-blue-500", label: "Upcoming" },
        COMPLETED: { color: "bg-green-500", label: "Completed" },
        CANCELLED: { color: "bg-red-500", label: "Cancelled" },
    };

    const grouped = {
        upcoming: appointments.filter(a => a.status === "CONFIRMED" || a.status === "PENDING"),
        completed: appointments.filter(a => a.status === "COMPLETED"),
        cancelled: appointments.filter(a => a.status === "CANCELLED"),
    };

    const updateStatus = async (id: string, status: string) => {
        await fetch(`/api/appointments/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        const res = await fetch("/api/appointments");
        setAppointments(await res.json());
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    const renderCard = (appt: Appointment) => {
        const cfg = statusConfig[appt.status] || statusConfig.PENDING;
        return (
            <div key={appt._id} className="p-4 bg-muted/50 rounded-lg border border-border hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                    <p className="font-bold">{appt.petId?.name} ({appt.petId?.species})</p>
                    <span className={`w-2 h-2 rounded-full ${cfg.color}`} />
                </div>
                <p className="text-sm text-muted-foreground">{appt.reason}</p>
                <p className="text-sm text-muted-foreground">Owner: {appt.ownerId?.name}</p>
                <p className="text-xs text-primary mt-2">
                    {new Date(appt.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} at {appt.timeSlot}
                </p>
                {(appt.status === "PENDING" || appt.status === "CONFIRMED") && (
                    <div className="flex gap-2 mt-3">
                        {appt.status === "PENDING" && (
                            <button onClick={() => updateStatus(appt._id, "CONFIRMED")} className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                Confirm
                            </button>
                        )}
                        <button onClick={() => updateStatus(appt._id, "COMPLETED")} className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                            Complete
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold font-heading">Surgery Schedule</h2>

            {appointments.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                    <Calendar className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No appointments</h3>
                    <p className="text-muted-foreground">Appointments will appear here once patients book them.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-card p-4 rounded-xl border border-border">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" /> Upcoming ({grouped.upcoming.length})
                        </h3>
                        <div className="space-y-3">{grouped.upcoming.map(renderCard)}</div>
                    </div>

                    <div className="bg-card p-4 rounded-xl border border-border">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" /> Completed ({grouped.completed.length})
                        </h3>
                        <div className="space-y-3">{grouped.completed.map(renderCard)}</div>
                    </div>

                    <div className="bg-card p-4 rounded-xl border border-border">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500" /> Cancelled ({grouped.cancelled.length})
                        </h3>
                        <div className="space-y-3">{grouped.cancelled.map(renderCard)}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
