import {
    LayoutGrid,
    Users,
    DollarSign,
    Briefcase,
    Headphones,
    Settings
} from "lucide-react";

export const NavData = [
    {
        item: "Dashboard",
        nav: "/dashboard",
        icon: LayoutGrid
    },
    {
        item: "Referrals",
        nav: "/dashboard/referrals",
        icon: Users
    },
    {
        item: "Earnings",
        nav: "/dashboard/earnings",
        icon: DollarSign
    },
    {
        item: "Marketing Kit",
        nav: "/dashboard/marketing",
        icon: Briefcase
    },
    {
        item: "Support",
        nav: "/dashboard/support",
        icon: Headphones
    },
    {
        item: "Settings",
        nav: "/dashboard/settings",
        icon: Settings
    },
];