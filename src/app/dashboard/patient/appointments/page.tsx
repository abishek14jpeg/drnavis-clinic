"use client";

import { useEffect, useState, useCallback } from "react";
import { Calendar, XCircle } from "lucide-react";

interface Appointment {
    _id: string;
    petId: { _id: string; name: string; species: string; breed: string };
    date: string;
    timeSlot: string;
    reason: string;
    status: string;
    notes?: string;
}

export default function PatientAppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = useCallback(async () => {
        const res = await fetch("/api/appointments");
        const data = await res.json();
        setAppointments(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        (async () => {
            await fetchAppointments();
        })();
    }, [fetchAppointments]);

    const cancelAppointment = async (id: string) => {
        if (!confirm("Cancel this appointment?")) return;
        await fetch(`/api/appointments/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "CANCELLED" }),
        });
        fetchAppointments();
    };

    const statusColors: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        CONFIRMED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        COMPLETED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
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
                <h2 className="text-3xl font-bold font-heading">My Appointments</h2>
                <a href="/dashboard/patient/book" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    <Calendar className="w-4 h-4" /> Book New
                </a>
            </div>

            {appointments.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                    <Calendar className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No appointments yet</h3>
                    <p className="text-muted-foreground">Book your first appointment to get started!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {appointments.map((appt) => (
                        <div key={appt._id} className="bg-card rounded-xl border border-border p-5 hover:border-primary/20 transition-all">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                                        🐾
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{appt.reason}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {appt.petId?.name} ({appt.petId?.species}) • {new Date(appt.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} at {appt.timeSlot}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[appt.status] || ""}`}>
                                        {appt.status}
                                    </span>
                                    {(appt.status === "PENDING" || appt.status === "CONFIRMED") && (
                                        <button onClick={() => cancelAppointment(appt._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Cancel">
                                            <XCircle className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                            {appt.notes && <p className="mt-3 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">{appt.notes}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
