import {
    LayoutGrid,
    Users,
    DollarSign,
    Briefcase,
    Headphones,
    Settings,
    Home
} from "lucide-react";

export const NavDataUser = [
    {
        item: "Home",
        nav: "/",
        icon: Home
    },
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
        nav: "/dashboard/transaction",
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
    }
];