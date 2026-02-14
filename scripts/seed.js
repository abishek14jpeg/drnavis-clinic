/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGODB_URI = "mongodb://localhost:27017/drnavis-clinic";

async function seed() {
    console.log("🔌 Connecting to local MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected!\n");

    const db = mongoose.connection.db;

    // Clear existing data
    const collections = await db.listCollections().toArray();
    for (const col of collections) {
        await db.dropCollection(col.name);
        console.log("  🗑  Dropped collection: " + col.name);
    }
    console.log("");

    // ─── Users ─────────────────────────────────
    const usersCol = db.collection("users");
    const hashedPassword = await bcrypt.hash("clinic123", 12);

    const doctor = {
        name: "Dr. Navi",
        email: "doctor@clinic.com",
        password: hashedPassword,
        role: "DOCTOR",
        phone: "+91 98765 43210",
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const receptionist = {
        name: "Priya Receptionist",
        email: "reception@clinic.com",
        password: hashedPassword,
        role: "RECEPTIONIST",
        phone: "+91 98765 43211",
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const patient = {
        name: "Abishek KG",
        email: "abishek.kg2023@vitstudent.ac.in",
        password: hashedPassword,
        role: "PATIENT",
        phone: "+91 98765 43212",
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const insertedUsers = await usersCol.insertMany([doctor, receptionist, patient]);
    const userIds = Object.values(insertedUsers.insertedIds);

    console.log("👤 Users created:");
    console.log("  📧 doctor@clinic.com (DOCTOR) — password: clinic123");
    console.log("  📧 reception@clinic.com (RECEPTIONIST) — password: clinic123");
    console.log("  📧 abishek.kg2023@vitstudent.ac.in (PATIENT) — password: clinic123");
    console.log("");

    // ─── Pets ──────────────────────────────────
    const petsCol = db.collection("pets");
    const pets = [
        {
            name: "Bruno",
            species: "Dog",
            breed: "Golden Retriever",
            age: 3,
            weight: 28.5,
            ownerId: userIds[2],
            medicalNotes: "Annual vaccination due in March. Allergic to chicken-based treats.",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: "Whiskers",
            species: "Cat",
            breed: "Persian",
            age: 2,
            weight: 4.2,
            ownerId: userIds[2],
            medicalNotes: "Indoor cat. Had minor eye infection last month — fully recovered.",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: "Coco",
            species: "Dog",
            breed: "Shih Tzu",
            age: 5,
            weight: 6.1,
            ownerId: userIds[2],
            medicalNotes: "Requires dental cleaning every 6 months.",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    const insertedPets = await petsCol.insertMany(pets);
    const petIds = Object.values(insertedPets.insertedIds);
    console.log("🐾 Pets created: Bruno (Golden Retriever), Whiskers (Persian), Coco (Shih Tzu)");
    console.log("");

    // ─── Appointments ─────────────────────────
    const appointmentsCol = db.collection("appointments");
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const appointments = [
        {
            petId: petIds[0],
            ownerId: userIds[2],
            doctorId: userIds[0],
            date: tomorrow,
            timeSlot: "10:00 AM",
            reason: "Vaccination",
            status: "CONFIRMED",
            notes: "Annual booster shot due",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            petId: petIds[1],
            ownerId: userIds[2],
            doctorId: userIds[0],
            date: dayAfter,
            timeSlot: "02:30 PM",
            reason: "General Checkup",
            status: "PENDING",
            notes: "Routine health checkup",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            petId: petIds[2],
            ownerId: userIds[2],
            doctorId: userIds[0],
            date: yesterday,
            timeSlot: "11:00 AM",
            reason: "Dental Care",
            status: "COMPLETED",
            notes: "Dental cleaning completed. No issues found.",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    const insertedAppts = await appointmentsCol.insertMany(appointments);
    const apptIds = Object.values(insertedAppts.insertedIds);
    console.log("📅 Appointments: 1 Confirmed (tomorrow), 1 Pending (day after), 1 Completed (yesterday)");
    console.log("");

    // ─── Lab Reports ──────────────────────────
    const labReportsCol = db.collection("labreports");
    await labReportsCol.insertMany([
        {
            petId: petIds[0],
            appointmentId: apptIds[2],
            testName: "Complete Blood Count",
            testType: "Blood Test (CBC)",
            results: "WBC: 12.5 x10^9/L (Normal: 5.5-16.9)\nRBC: 6.8 x10^12/L (Normal: 5.5-8.5)\nHemoglobin: 15.2 g/dL (Normal: 12-18)\nPlatelets: 285 x10^9/L (Normal: 175-500)\n\nAll values within normal range",
            status: "COMPLETED",
            createdBy: userIds[0],
            notes: "Healthy results. No concerns.",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            petId: petIds[1],
            testName: "Urinalysis",
            testType: "Urinalysis",
            results: "",
            status: "PENDING",
            createdBy: userIds[0],
            notes: "Awaiting sample collection",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);
    console.log("🧪 Lab Reports: 1 Completed (CBC for Bruno), 1 Pending (Urinalysis for Whiskers)");
    console.log("");

    // ─── Queue Entries ────────────────────────
    const queueCol = db.collection("queueentries");
    await queueCol.insertMany([
        {
            petId: petIds[0],
            ownerId: userIds[2],
            reason: "Vaccination",
            status: "CONSULTING",
            position: 1,
            checkedInAt: new Date(),
            notes: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            petId: petIds[1],
            ownerId: userIds[2],
            reason: "General Checkup",
            status: "WAITING",
            position: 2,
            checkedInAt: new Date(),
            notes: "",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);
    console.log("📋 Queue: Bruno (Consulting), Whiskers (Waiting)");
    console.log("");

    // ─── Invoices ─────────────────────────────
    const invoicesCol = db.collection("invoices");
    await invoicesCol.insertMany([
        {
            appointmentId: apptIds[2],
            ownerId: userIds[2],
            items: [
                { description: "Dental Cleaning", amount: 2500 },
                { description: "Consultation Fee", amount: 500 },
                { description: "Medication (Antibiotics)", amount: 350 },
            ],
            total: 3350,
            status: "PAID",
            paidAt: yesterday,
            createdAt: yesterday,
            updatedAt: yesterday,
        },
        {
            appointmentId: apptIds[0],
            ownerId: userIds[2],
            items: [
                { description: "Annual Vaccination (Booster)", amount: 1200 },
                { description: "Consultation Fee", amount: 500 },
            ],
            total: 1700,
            status: "UNPAID",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);
    console.log("💳 Invoices: Rs.3,350 (Paid), Rs.1,700 (Unpaid)");

    console.log("\n═══════════════════════════════════════════");
    console.log("🎉 Seed complete! Database is ready.");
    console.log("═══════════════════════════════════════════");
    console.log("\n📋 Login credentials:");
    console.log("  ┌─────────────────────────────────────────────────┐");
    console.log("  │  DOCTOR:       doctor@clinic.com                │");
    console.log("  │  RECEPTIONIST: reception@clinic.com             │");
    console.log("  │  PATIENT:      abishek.kg2023@vitstudent.ac.in  │");
    console.log("  │  Password:     clinic123 (for all accounts)     │");
    console.log("  └─────────────────────────────────────────────────┘");

    await mongoose.disconnect();
    process.exit(0);
}

seed().catch(function (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});
