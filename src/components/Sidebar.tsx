import { SidebarProps } from "@/types/types";
import { sidebarData } from "@/data/sidebarData";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Sidebar = ({ selectedTab, onTabSelect }: SidebarProps) => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut({ redirect: false });
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="h-full w-full flex items-center justify-center">
            <ul className="w-full h-full flex flex-col justify-center items-start">
                <div className="flex flex-col gap-y-3 items-start w-full">
                    {sidebarData
                        .filter((item) => !item.isExit)
                        .map((item) => (
                            <li key={item.id} className="w-full">
                                <a
                                    href="#"
                                    onClick={() => onTabSelect(item.id)}
                                    className={`text-gray-300 hover:text-white text-left pl-3 pr-2 py-1 block ${selectedTab === item.id ? "bg-blue-500 text-white" : ""
                                        }`}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                </div>
                <div className="flex justify-center w-full mt-auto">
                    {sidebarData
                        .filter((item) => item.isExit)
                        .map((item) => (
                            <li key={item.id} className="w-full">
                                <a
                                    href="#"
                                    onClick={item.id === "Exit" ? handleLogout : () => onTabSelect(item.id)}
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
    );
};

export default Sidebar;