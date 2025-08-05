"use client";

import { DashboardProps } from "@/types/types";
import AdminDashboard from "./AdminDashboard";
import DriverDashboard from "./DriverDashboard";

export default function Dashboard({ user, clients = [], drivers = [] }: DashboardProps) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Welcome, {user.name || user.email}!
            </h1>

            {user.role === "admin" && <AdminDashboard clients={clients} drivers={drivers} />}
            {user.role === "driver" && (
                <DriverDashboard
                    userId={user._id}
                    clients={clients}
                />
            )}
        </div>
    );
}