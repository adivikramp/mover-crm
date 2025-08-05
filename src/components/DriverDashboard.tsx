"use client";

import { Client, DriverDashboardProps } from "@/types/types";
import { useState, useEffect } from "react";

export default function DriverDashboard({ userId, clients }: DriverDashboardProps) {
    const [assignedClients, setAssignedClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            console.error("User ID is undefined!");
            setLoading(false);
            return;
        }

        const filteredClients = clients.filter(client => {
            if (!client.assignedDriver) return false;

            const assignedDriverId = typeof client.assignedDriver === 'string'
                ? client.assignedDriver
                : client.assignedDriver._id?.toString();

            return assignedDriverId === userId.toString();
        });

        console.log("Filtered clients for driver:", filteredClients);
        setAssignedClients(filteredClients);
        setLoading(false);
    }, [userId, clients]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Your Assigned Clients</h2>
            {assignedClients.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {assignedClients.map(client => (
                        <div key={client._id} className="bg-white p-4 rounded shadow">
                            <h3 className="font-medium">{client.name}</h3>
                            <p className="text-gray-600">{client.address}</p>
                            <p className="text-gray-600">{client.phone}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-gray-500">
                    <p>No clients assigned to you yet</p>
                    <p className="text-sm mt-2">Your user ID: {userId}</p>
                </div>
            )}
        </div>
    );
}