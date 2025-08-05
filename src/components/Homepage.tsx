"use client";

import { useState } from "react";
import Image from "next/image";
import LineChart from "@/components/LineChart";
import Navbar from "@/components/Navbar";
import PieChart from "@/components/PieChart";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import { tableData } from "@/data/tableData";
import { HomepageProps } from "@/types/types";

export default function Homepage({ user, clients, drivers }: HomepageProps) {
    const [selectedTab, setSelectedTab] = useState("Dashboard");

    const renderContent = () => {
        switch (selectedTab) {
            case "Dashboard":
                return (
                    <div className="flex flex-col col-span-4 md:col-span-3 bg-gray-50 p-6 rounded w-full h-full overflow-y-auto">
                        <Dashboard user={user} clients={clients} drivers={drivers} />
                    </div>
                )

            case "Clients":
                return (
                    <div className="flex flex-col col-span-4 md:col-span-3 bg-gray-50 p-6 rounded w-full h-full overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">All Clients</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-3 px-4 text-left">Client Name</th>
                                        <th className="py-3 px-4 text-left">Address</th>
                                        <th className="py-3 px-4 text-left">Phone</th>
                                        <th className="py-3 px-4 text-left">Assigned Driver</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients.map((client) => {
                                        const driverName = client.assignedDriver
                                            ? typeof client.assignedDriver === 'object'
                                                ? client.assignedDriver.name
                                                : "Driver (ID: " + client.assignedDriver + ")"
                                            : "Unassigned";

                                        return (
                                            <tr key={client._id} className="border-b border-gray-200 hover:bg-gray-50">
                                                <td className="py-3 px-4">{client.name}</td>
                                                <td className="py-3 px-4">{client.address}</td>
                                                <td className="py-3 px-4">{client.phone}</td>
                                                <td className="py-3 px-4">{driverName}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case "Brigades":
                return (
                    <div className="flex flex-col col-span-4 md:col-span-3 bg-gray-50 p-6 rounded w-full h-full overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg">Crew tracking</h2>
                            <a href="#" className="text-blue-500">Return to brigades</a>
                        </div>
                        <div className="relative w-full h-72 md:h-full bg-gray-200 flex items-center justify-center rounded-xl">
                            <Image
                                src="/images/img-1.png"
                                alt="Brigade Map"
                                fill
                                className="rounded-xl bg-cover"
                            />
                        </div>
                        <div className="flex flex-col items-center mt-4">
                            <div className="grid grid-cols-3 w-full gap-x-4">
                                <button className="bg-red-100 text-red-800 p-2 rounded-full cursor-pointer duration-200 hover:scale-105">Brigade #1</button>
                                <button className="bg-green-100 text-green-800 p-2 rounded-full cursor-pointer duration-200 hover:scale-105">Brigade #2</button>
                                <button className="bg-red-100 text-red-800 p-2 rounded-full cursor-pointer duration-200 hover:scale-105">Brigade #3</button>
                            </div>
                            <div className="w-full flex flex-col md:flex-row justify-between md:items-center mt-2">
                                <span className="mt-2 text-gray-500 text-sm">Updated: 14:25, 14 April 2025</span>
                                <button className="mt-4 bg-gradient-to-r from-[#73a4d1] to-[#4c8cc8] text-white py-2 px-12 rounded cursor-pointer duration-200 hover:scale-105">Update</button>
                            </div>
                        </div>
                    </div>
                );

            case "Reports":
                return (
                    <div className="flex flex-col col-span-4 md:col-span-3 bg-gray-50 p-6 rounded w-full h-full overflow-y-auto">
                        <span className="text-md">Reports and statistics</span>
                        <span className="text-sm mt-2">Company performance analytics</span>

                        <div className="grid grid-cols-4 gap-x-4 justify-between items-center mt-4 gap-y-4">
                            <select className="col-span-4 md:col-span-2 p-2 rounded bg-gray-200 text-sm">
                                <option>Period: April 2025</option>
                            </select>
                            <div className="col-span-4 md:col-span-2 grid grid-cols-2 gap-x-4">
                                <button className="bg-blue-500 text-white p-2 rounded cursor-pointer duration-200 hover:scale-105">Apply</button>
                                <button className="bg-gray-200 text-gray-700 p-2 rounded cursor-pointer duration-200 hover:scale-105">Export PDF</button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mt-4 h-full">
                            {/* Distribution of order types (Pie chart section) */}
                            <div className="col-span-2 md:col-span-1 bg-white p-4 rounded shadow h-full">
                                <h3 className="text-sm font-semibold">Distribution of order types</h3>
                                <div className="h-52 flex items-center justify-center bg-white mt-2 rounded">
                                    <PieChart />
                                </div>
                            </div>

                            {/* Revenue Dynamics (Line chart section) */}
                            <div className="col-span-2 md:col-span-1 bg-white p-4 rounded shadow h-full">
                                <h3 className="text-sm font-semibold">Revenue Dynamics (in thousand)</h3>
                                <div className="h-52 flex items-center justify-center bg-white mt-2 rounded">
                                    <LineChart />
                                </div>
                            </div>

                            {/* Team Efficiency Table */}
                            <div className="bg-white p-4 rounded shadow col-span-2 h-full">
                                <h3 className="text-lg font-semibold text-gray-600">Team Efficiency (April 2025)</h3>
                                <div className="w-full overflow-x-auto md:overflow-x-visible">
                                    <table className="w-full mt-2 text-sm min-w-max">
                                        <thead>
                                            <tr className="text-left">
                                                <th>Brigade</th>
                                                <th>Order amount</th>
                                                <th>Total amount</th>
                                                <th>Rating</th>
                                                <th>KRI</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData.map((row, index) => {
                                                const ratingValue = parseFloat(row.rating.split(" / ")[0]);
                                                const color = ratingValue >= 4.5 ? "green" : "orange";
                                                const barWidth = `${(ratingValue / 5) * 100}%`;

                                                return (
                                                    <tr key={index}>
                                                        <td className="pb-1.5">{row.brigade}</td>
                                                        <td className="py-1.5">{row.orderAmount}</td>
                                                        <td className="py-1.5">{row.totalAmount}</td>
                                                        <td className="py-1.5">{row.rating}</td>
                                                        <td className="py-1.5">
                                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                                <div
                                                                    className={`h-full rounded-full ${color === "green" ? "bg-green-500" : "bg-orange-500"}`}
                                                                    style={{ width: barWidth }}
                                                                ></div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="col-span-4 md:col-span-3 h-full flex items-center justify-center shadow-2xl">
                        <h1 className="text-3xl md:text-6xl font-bold">Nothing to Show :(</h1>
                    </div>
                );
        }
    };

    const handleTabSelect = (id: string | number) => {
        setSelectedTab(String(id));
    };

    return (
        <div className="flex md:items-center justify-center w-full md:w-2/3 mx-auto min-h-screen">
            <div className="flex flex-col w-full h-full md:h-2/3">
                <Navbar onTabSelect={handleTabSelect} selectedTab={selectedTab} />
                <div className="grid grid-cols-4 h-full md:h-[700px]">
                    <div className="hidden md:block col-span-1 bg-gray-800 text-white p-4 h-full">
                        <Sidebar selectedTab={selectedTab} onTabSelect={handleTabSelect} />
                    </div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}