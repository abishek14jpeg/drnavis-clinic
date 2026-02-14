"use client";

import { useEffect, useState, useCallback } from "react";
import { ClipboardList } from "lucide-react";

interface QueueEntry {
    _id: string;
    petId: { name: string; species: string; breed: string };
    ownerId: { name: string; phone?: string };
    reason: string;
    status: string;
    position: number;
    checkedInAt: string;
}

export default function ReceptionQueuePage() {
    const [queue, setQueue] = useState<QueueEntry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchQueue = useCallback(async () => {
        const res = await fetch("/api/queue");
        const data = await res.json();
        setQueue(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        (async () => {
            await fetchQueue();
        })();
    }, [fetchQueue]);

    const updateStatus = async (id: string, status: string) => {
        await fetch("/api/queue", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });
        fetchQueue();
    };

    const waiting = queue.filter(q => q.status === "WAITING");
    const consulting = queue.filter(q => q.status === "CONSULTING");

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
                <h2 className="text-3xl font-bold font-heading">Live Queue Management</h2>
                <div className="flex gap-2">
                    <div className="px-4 py-2 bg-card border rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Waiting</p>
                        <p className="text-xl font-bold text-yellow-500">{waiting.length}</p>
                    </div>
                    <div className="px-4 py-2 bg-card border rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Consulting</p>
                        <p className="text-xl font-bold text-green-500">{consulting.length}</p>
                    </div>
                </div>
            </div>

            {queue.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                    <ClipboardList className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Queue is empty</h3>
                    <p className="text-muted-foreground">Patients will appear here when checked in.</p>
                </div>
            ) : (
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="grid grid-cols-12 bg-muted/50 p-4 border-b font-medium text-sm">
                        <div className="col-span-1">#</div>
                        <div className="col-span-3">Pet Owner</div>
                        <div className="col-span-2">Pet</div>
                        <div className="col-span-2">Reason</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2">Actions</div>
                    </div>
                    <div className="divide-y">
                        {queue.map((entry) => (
                            <div key={entry._id} className="grid grid-cols-12 p-4 items-center hover:bg-muted/30 transition-colors">
                                <div className="col-span-1 text-muted-foreground">{entry.position}</div>
                                <div className="col-span-3">
                                    <p className="font-medium">{entry.ownerId?.name}</p>
                                    {entry.ownerId?.phone && <p className="text-xs text-muted-foreground">{entry.ownerId.phone}</p>}
                                </div>
                                <div className="col-span-2 text-sm">{entry.petId?.name} ({entry.petId?.species})</div>
                                <div className="col-span-2 text-sm">{entry.reason}</div>
                                <div className="col-span-2">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${entry.status === "CONSULTING"
                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                        }`}>
                                        {entry.status}
                                    </span>
                                </div>
                                <div className="col-span-2 flex gap-2">
                                    {entry.status === "WAITING" && (
                                        <button onClick={() => updateStatus(entry._id, "CONSULTING")} className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                            Start
                                        </button>
                                    )}
                                    {entry.status === "CONSULTING" && (
                                        <button onClick={() => updateStatus(entry._id, "COMPLETED")} className="text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                            Done
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
