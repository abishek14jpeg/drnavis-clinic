"use client";

import { useEffect, useState, useCallback } from "react";
import { FlaskConical, Plus, X } from "lucide-react";

interface Pet {
    _id: string;
    name: string;
    species: string;
}

interface LabReport {
    _id: string;
    petId: { _id: string; name: string; species: string };
    testName: string;
    testType: string;
    results: string;
    status: string;
    notes?: string;
    createdAt: string;
}

const TEST_TYPES = [
    "Blood Test (CBC)", "Blood Chemistry", "Urinalysis", "X-Ray",
    "Ultrasound", "Skin Scraping", "Fecal Analysis", "Biopsy", "Other"
];

export default function DoctorLabReportsPage() {
    const [reports, setReports] = useState<LabReport[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ petId: "", testName: "", testType: "", results: "", notes: "" });

    const fetchData = useCallback(async () => {
        const [reportsRes, petsRes] = await Promise.all([
            fetch("/api/lab-reports"),
            fetch("/api/pets"),
        ]);
        setReports(await reportsRes.json());
        setPets(await petsRes.json());
        setLoading(false);
    }, []);

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, [fetchData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/lab-reports", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setShowForm(false);
        setForm({ petId: "", testName: "", testType: "", results: "", notes: "" });
        fetchData();
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
                <h2 className="text-3xl font-bold font-heading">Lab Reports</h2>
                <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                    <Plus className="w-4 h-4" /> New Report
                </button>
            </div>

            {/* Create Report Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg mx-4 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">Create Lab Report</h3>
                            <button onClick={() => setShowForm(false)} className="p-1 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Select Pet</label>
                                <select value={form.petId} onChange={(e) => setForm({ ...form, petId: e.target.value })} required className="w-full px-3 py-2 border rounded-lg bg-background outline-none">
                                    <option value="">Choose pet...</option>
                                    {pets.map((p) => <option key={p._id} value={p._id}>{p.name} ({p.species})</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Test Name</label>
                                <input value={form.testName} onChange={(e) => setForm({ ...form, testName: e.target.value })} required className="w-full px-3 py-2 border rounded-lg bg-background outline-none" placeholder="e.g. Complete Blood Count" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Test Type</label>
                                <select value={form.testType} onChange={(e) => setForm({ ...form, testType: e.target.value })} required className="w-full px-3 py-2 border rounded-lg bg-background outline-none">
                                    <option value="">Choose type...</option>
                                    {TEST_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Results</label>
                                <textarea value={form.results} onChange={(e) => setForm({ ...form, results: e.target.value })} rows={4} className="w-full px-3 py-2 border rounded-lg bg-background outline-none resize-none font-mono text-sm" placeholder="WBC: 12.5 x10^9/L (Normal: 5.5-16.9)&#10;RBC: 6.8 x10^12/L (Normal: 5.5-8.5)..." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Notes</label>
                                <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full px-3 py-2 border rounded-lg bg-background outline-none" placeholder="Doctor's notes..." />
                            </div>
                            <button type="submit" className="w-full py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium">
                                Create Report
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Reports List */}
            {reports.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                    <FlaskConical className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No lab reports</h3>
                    <p className="text-muted-foreground">Create your first lab report.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reports.map((report) => (
                        <div key={report._id} className="bg-card rounded-xl border border-border p-5">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h3 className="font-bold">{report.testName}</h3>
                                    <p className="text-sm text-muted-foreground">{report.petId?.name} • {report.testType}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${report.status === "COMPLETED"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}>
                                    {report.status}
                                </span>
                            </div>
                            {report.results && (
                                <div className="bg-muted/50 p-3 rounded-lg text-sm font-mono whitespace-pre-wrap mt-2">{report.results}</div>
                            )}
                            <p className="text-xs text-muted-foreground mt-2">
                                {new Date(report.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
