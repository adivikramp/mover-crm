"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Client, ClientAssignmentProps } from "@/types/types";

export default function ClientAssignment({ clients, drivers }: ClientAssignmentProps) {
    const router = useRouter();
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

    const getDriverId = (client: Client) => {
        if (!client.assignedDriver) return "";
        return typeof client.assignedDriver === 'object'
            ? client.assignedDriver._id
            : client.assignedDriver;
    };

    const handleAssign = async (clientId: string, driverId: string) => {
        setLoadingStates(prev => ({ ...prev, [clientId]: true }));

        try {
            const response = await fetch("/api/clients/assign", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ clientId, driverId })
            });

            if (!response.ok) throw new Error("Assignment failed");

            router.refresh();
        } catch (error) {
            console.error("Assignment error:", error);
        } finally {
            setLoadingStates(prev => ({ ...prev, [clientId]: false }));
        }
    };

    const [selectedDriverIds, setSelectedDriverIds] = useState<Record<string, string>>(
        () => clients.reduce((acc, client) => {
            acc[client._id] = getDriverId(client);
            return acc;
        }, {} as Record<string, string>)
    );

    const handleSelectChange = (clientId: string, driverId: string) => {
        setSelectedDriverIds(prev => ({ ...prev, [clientId]: driverId }));
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Assign Clients to Drivers</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 text-left">Client</th>
                            <th className="py-2 px-4 text-left">Driver</th>
                            <th className="py-2 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => {
                            const currentDriverId = getDriverId(client);
                            const selectedDriverId = selectedDriverIds[client._id] ?? "";
                            const isSameDriver = selectedDriverId === currentDriverId;

                            return (
                                <tr key={client._id} className="border-b border-gray-200">
                                    <td className="py-3 px-4">{client.name}</td>
                                    <td className="py-3 px-4">
                                        <select
                                            value={selectedDriverId}
                                            onChange={(e) => handleSelectChange(client._id, e.target.value)}
                                            className="border rounded px-2 py-1 w-full"
                                        >
                                            <option value="">Unassigned</option>
                                            {drivers.map((driver) => (
                                                <option key={driver._id} value={driver._id}>
                                                    {driver.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => handleAssign(client._id, selectedDriverId)}
                                            disabled={isSameDriver || loadingStates[client._id]}
                                            className={`px-3 py-1 rounded ${isSameDriver || loadingStates[client._id]
                                                ? "bg-gray-300 cursor-not-allowed"
                                                : "bg-blue-500 text-white hover:bg-blue-600"
                                                }`}
                                        >
                                            {loadingStates[client._id] ? "Saving..." : "Confirm"}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}