"use client";

import { useEffect, useState, useCallback } from "react";
import { CreditCard, Plus, X } from "lucide-react";

interface Invoice {
    _id: string;
    ownerId: { _id: string; name: string; email: string };
    items: { description: string; amount: number }[];
    total: number;
    status: string;
    createdAt: string;
}

interface User {
    _id: string;
    name: string;
    email: string;
}

export default function ReceptionistBillingPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [owners, setOwners] = useState<User[]>([]);
    const [form, setForm] = useState({
        ownerId: "",
        items: [{ description: "", amount: 0 }],
    });

    const fetchData = useCallback(async () => {
        const res = await fetch("/api/invoices");
        setInvoices(await res.json());

        // Get unique owners from pets list
        const petsRes = await fetch("/api/pets");
        const pets = await petsRes.json();
        const uniqueOwners: Record<string, User> = {};
        pets.forEach((p: { ownerId: User }) => {
            if (p.ownerId?._id) uniqueOwners[p.ownerId._id] = p.ownerId;
        });
        setOwners(Object.values(uniqueOwners));
        setLoading(false);
    }, []);

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, [fetchData]);

    const addItem = () => setForm({ ...form, items: [...form.items, { description: "", amount: 0 }] });
    const removeItem = (i: number) => setForm({ ...form, items: form.items.filter((_, idx) => idx !== i) });
    const updateItem = (i: number, field: string, value: string | number) => {
        const newItems = [...form.items];
        newItems[i] = { ...newItems[i], [field]: value };
        setForm({ ...form, items: newItems });
    };

    const total = form.items.reduce((sum, item) => sum + Number(item.amount), 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("/api/invoices", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ownerId: form.ownerId,
                items: form.items.map(i => ({ ...i, amount: Number(i.amount) })),
            }),
        });
        setShowForm(false);
        setForm({ ownerId: "", items: [{ description: "", amount: 0 }] });
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
                <h2 className="text-3xl font-bold font-heading">Billing & Invoices</h2>
                <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                    <Plus className="w-4 h-4" /> New Invoice
                </button>
            </div>

            {/* Create Invoice Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">Create Invoice</h3>
                            <button onClick={() => setShowForm(false)} className="p-1 hover:bg-muted rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Pet Owner</label>
                                <select value={form.ownerId} onChange={(e) => setForm({ ...form, ownerId: e.target.value })} required className="w-full px-3 py-2 border rounded-lg bg-background outline-none">
                                    <option value="">Select owner...</option>
                                    {owners.map((o) => <option key={o._id} value={o._id}>{o.name} ({o.email})</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Line Items</label>
                                {form.items.map((item, i) => (
                                    <div key={i} className="flex gap-2 mb-2">
                                        <input value={item.description} onChange={(e) => updateItem(i, "description", e.target.value)} required className="flex-1 px-3 py-2 border rounded-lg bg-background outline-none text-sm" placeholder="Service description" />
                                        <input type="number" value={item.amount || ""} onChange={(e) => updateItem(i, "amount", e.target.value)} required className="w-24 px-3 py-2 border rounded-lg bg-background outline-none text-sm" placeholder="₹ Amt" />
                                        {form.items.length > 1 && (
                                            <button type="button" onClick={() => removeItem(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><X className="w-4 h-4" /></button>
                                        )}
                                    </div>
                                ))}
                                <button type="button" onClick={addItem} className="text-sm text-primary hover:underline">+ Add item</button>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                                <span className="font-semibold">Total</span>
                                <span className="text-xl font-bold">₹{total.toLocaleString("en-IN")}</span>
                            </div>

                            <button type="submit" className="w-full py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium">
                                Create Invoice
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Invoices List */}
            {invoices.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                    <CreditCard className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No invoices yet</h3>
                    <p className="text-muted-foreground">Create your first invoice to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {invoices.map((invoice) => (
                        <div key={invoice._id} className="bg-card rounded-xl border border-border p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h3 className="font-bold">{invoice.ownerId?.name}</h3>
                                    <p className="text-sm text-muted-foreground">{invoice.ownerId?.email}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold">₹{invoice.total?.toLocaleString("en-IN")}</p>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${invoice.status === "PAID"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {invoice.status}
                                    </span>
                                </div>
                            </div>
                            <div className="border-t pt-3 space-y-1">
                                {invoice.items?.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">{item.description}</span>
                                        <span>₹{item.amount?.toLocaleString("en-IN")}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-3">
                                {new Date(invoice.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
