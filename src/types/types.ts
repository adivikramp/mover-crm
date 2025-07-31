export interface SidebarProps {
    selectedTab: string;
    onTabSelect: (tab: string) => void;
};

export interface NavbarProps {
    onTabSelect: (id: string | number) => void;
    selectedTab: string | number;
}