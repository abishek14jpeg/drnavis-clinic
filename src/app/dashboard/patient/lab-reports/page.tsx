"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

interface LabReport {
    _id: string;
    petId: { name: string; species: string };
    testName: string;
    testType: string;
    results: string;
    status: string;
    createdBy: { name: string };
    notes?: string;
    createdAt: string;
}

export default function PatientLabReportsPage() {
    const [reports, setReports] = useState<LabReport[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/lab-reports").then(r => r.json()).then(data => {
            setReports(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold font-heading">Lab Reports</h2>

            {reports.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                    <FileText className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No lab reports</h3>
                    <p className="text-muted-foreground">Lab reports from your vet will appear here.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reports.map((report) => (
                        <div key={report._id} className="bg-card rounded-xl border border-border p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h3 className="font-bold text-lg">{report.testName}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {report.petId?.name} • {report.testType} • by {report.createdBy?.name}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${report.status === "COMPLETED"
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    }`}>
                                    {report.status}
                                </span>
                            </div>
                            {report.results && (
                                <div className="bg-muted/50 p-4 rounded-lg text-sm font-mono whitespace-pre-wrap">
                                    {report.results}
                                </div>
                            )}
                            {report.notes && <p className="mt-2 text-sm text-muted-foreground">{report.notes}</p>}
                            <p className="mt-2 text-xs text-muted-foreground">
                                {new Date(report.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
