export const NavDataUser = [
    {
        item: "Dashboard",
        nav: "/dashboard",
        type: 4,
        svg: (<svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 17.1235V7.12354M7 17.1235V1.12354M1 17.1235V11.1235" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        )
    },
    {
        item: "Transaction",
        nav: "/dashboard/transaction",
        svg: (
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 4.12354H3C1.89543 4.12354 1 5.01897 1 6.12354V18.1235C1 19.2281 1.89543 20.1235 3 20.1235H21C22.1046 20.1235 23 19.2281 23 18.1235V6.12354C23 5.01897 22.1046 4.12354 21 4.12354Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 10.1235H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        type: 3
    },
    {
        item: "Account",
        nav: "/dashboard/account",
        type: 4,
        svg: (
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1z" />
            </svg>
        )
    },
    {
        item: "Registation",
        nav: "/dashboard/register",
        type: 4,
        svg: (
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            </svg>
        ),
        subNav: [
            { name: "Downline", link: "/dashboard/register/downline" },
            { name: "Customer", link: "/dashboard/register/customer" },
        ]
    },
    {
        item: "Settings",
        nav: "/dashboard/settings",
        type: 4,
        svg: (
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
            </svg>
        )
    }
]