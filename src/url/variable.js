export const CompayDetails =
    [
        {
            title: "In today’s fast-paced world, every moment counts, especially in business. Navigating to the right location, ensuring swift service delivery, and maintaining security are key to operational success. Our verified digital address solution is designed to empower your business by providing accurate, reliable location data that enhances navigation, boosts efficiency, and bolsters security globally.",
            why: "A verified digital address is a precise, authenticated digital representation of physical addresses. Our solution maps your business’s critical locations with unparalleled accuracy, allowing seamless integration into your operations, delivery workflows, and customer-facing services.",
            what: "A verified digital address is a precise, authenticated digital representation of physical addresses. Our solution maps your business’s critical locations with unparalleled accuracy, allowing seamless integration into your operations, delivery workflows, and customer-facing services.",
            benefit: ["Retail & E-commerce: Streamline delivery processes, reduce delivery failures, and provide customers with real-time tracking and estimated arrival times.",
                "Logistics & Supply Chain: Optimize route planning, reduce fuel costs, and boost on-time delivery rates.",
                "Real Estate & Property Management: Offer clients an accurate view of property locations, improving experiences for property tours and site visits.",
                "Healthcare Services: Enable rapid emergency response and ensure healthcare providers reach patients in record time."]
        },
        {
            title: "Efficient public service delivery relies on precise location data. Verified digital addresses enable government agencies, emergency services, and community programs to navigate accurately, deliver services swiftly, and enhance public safety. Our solution equips the public sector with accurate, verified digital addresses to streamline operations, improve accessibility, and foster security in communities across the globe.",
            why: "Verified digital addresses ensure that government personnel, from healthcare providers to inspection officers, reach their destinations with ease. Accurate navigation improves response times, enhances inter-departmental efficiency, and ensures that public services are accessible and reliable.",
            what: "A verified digital address is an authenticated, accurate digital representation of physical locations, from homes and public facilities to remote locations. This data empowers government bodies to map communities and assets more effectively, improving reach and reliability in serving the public.",
            benefit: ["Emergency Services: Accurate, verified addresses allow fire, police, and medical response teams to reach locations faster, improving response times and potentially saving lives.",
                "Public Health & Social Services: Community outreach programs can better target locations, delivering critical services to those in need and reducing logistical challenges.",
                "Urban Planning & Development: Planners can use verified addresses to accurately map out infrastructure, public facilities, and utilities, leading to better development strategies.",
                "Education and Community Programs: Accurate addresses support initiatives for school busing, community outreach, and ensuring safe, accessible transportation routes for students."]
        },
        {
            title: "Effective governance hinges on accurate location data. Verified digital addresses empower government agencies with the tools needed to enhance service delivery, streamline logistics, and increase public safety. Our verified digital address solution provides government bodies with precise, reliable location data to support efficient navigation, optimized service provision, and improved security across all levels of government.",
            why: "Verified addresses ensure government employees and officials—whether conducting inspections, managing assets, or responding to emergencies—reach their destinations accurately. Enhanced navigation reduces travel time, facilitates seamless inter-agency collaboration, and ensures efficient use of government resources.",
            what: "A verified digital address is an authenticated digital representation of physical locations, from residences and government facilities to remote sites. This allows government agencies to access dependable address data, critical for decision-making, resource allocation, and service accessibility.",
            benefit: ["Emergency Response and Disaster Management: Reliable address data helps emergency response units quickly locate affected areas, improving response times and coordination for saving lives and protecting property.",
                "Public Health and Social Services: Government health and social service programs can better identify and reach communities in need, supporting targeted healthcare outreach, vaccination programs, and social support initiatives.",
                "Urban Planning and Infrastructure Development: Accurate digital addresses support infrastructure planning and development, allowing agencies to manage utilities, public facilities, and zoning projects effectively.",
                "Transportation and Education Services: Verified addresses enhance public transport planning, ensure precise routes for school transportation, and support efficient distribution of resources to educational facilities."]
        }
    ]

export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function deleteCookies() {
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
}