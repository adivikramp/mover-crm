"use client";

import { useState } from "react";

import { sidebarData } from "@/data/sidebarData";
import { useMediaQuery } from "@/hooks/use-media-query";
import { NavbarProps } from "@/types/types";

const Navbar = ({ onTabSelect, selectedTab }: NavbarProps) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="w-full bg-gradient-to-r from-[#73a4d1] to-[#4c8cc8] p-4 rounded-t-lg flex items-center">
            <h1 className="text-white text-xl font-bold w-max pl-3">Mover CRM</h1>
            <div className="flex flex-1 items-center justify-end md:justify-center">
                {isMobile ? (
                    <div className="flex gap-x-4">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 text-white bg-transparent"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                        <button
                            className="p-2 text-white bg-transparent"
                        >
                            <svg className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                            </svg>
                        </button>
                    </div>
                ) : (
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 pl-6 rounded-full bg-blue-300 w-full md:w-96 placeholder:text-white placeholder:text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4c8cc8]"
                    />
                )}
            </div>
            {isMobile && isSidebarOpen && (
                <div className="fixed inset-0 bg-transparent backdrop-blur-md z-40" onClick={toggleSidebar}></div>
            )}
            {isMobile && isSidebarOpen && (
                <nav className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-4 z-50 transform transition-transform duration-300 ease-in-out">
                    <button
                        onClick={toggleSidebar}
                        className="absolute top-4 right-4 p-2 text-white hover:bg-gray-700 rounded"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <ul className="flex flex-col gap-y-3 mt-12">
                        {sidebarData
                            .filter((item) => !item.isExit)
                            .map((item) => (
                                <li key={item.id} className="w-full">
                                    <a
                                        href="#"
                                        onClick={() => {
                                            onTabSelect(item.id);
                                            setIsSidebarOpen(false);
                                        }}
                                        className={`text-gray-300 hover:text-white text-left pl-3 pr-2 py-1 block ${selectedTab === item.id ? "bg-blue-500 text-white" : ""
                                            }`}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        <div className="mt-auto">
                            {sidebarData
                                .filter((item) => item.isExit)
                                .map((item) => (
                                    <li key={item.id} className="w-full">
                                        <a
                                            href="#"
                                            onClick={() => {
                                                onTabSelect(item.id);
                                                setIsSidebarOpen(false);
                                            }}
                                            className={`text-gray-300 hover:text-white text-left pl-3 pr-2 py-1 block ${selectedTab === item.id ? "bg-blue-500 text-white" : ""
                                                }`}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                        </div>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default Navbar;