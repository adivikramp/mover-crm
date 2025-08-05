export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'dispatcher' | 'driver';
    phone?: string;
}

export interface Client {
    _id: string;
    name: string;
    address: string;
    phone: string;
    assignedDriver?: User | string | null;
}

export interface Driver extends User {
    role: 'driver';
}

export interface SidebarProps {
    selectedTab: string;
    onTabSelect: (tab: string) => void;
}

export interface NavbarProps {
    onTabSelect: (id: string) => void;
    selectedTab: string;
}

export interface DashboardProps {
    user: User;
    clients?: Client[];
    drivers?: Driver[];
}

export interface DriverDashboardProps {
    userId: string;
    clients: Client[];
}

export interface HomepageProps {
    user: User;
    clients: Client[];
    drivers: Driver[];
}

export interface ClientAssignmentProps {
    clients: Client[];
    drivers: Driver[];
}