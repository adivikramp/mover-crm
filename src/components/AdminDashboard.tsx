"use client";

import { useState, useEffect } from "react";
import { Client, Driver } from "@/types/types";
import ClientAssignment from "./ClientAssignment";

export default function AdminDashboard({ clients = [], drivers = [] }: { clients: Client[], drivers: Driver[] }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) return <div className="p-6">Loading clients...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Client Assignments</h2>
            <ClientAssignment clients={clients} drivers={drivers} />
        </div>
    );
}