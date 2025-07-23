// Technician Database
const TECHNICIANS_DATA = [
    {
        id: "tech-001",
        name: "David Martinez",
        specialty: "Hardware Repair Specialist",
        experience: 8,
        rating: 4.9,
        status: "online",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        skills: ["Laptop Repair", "Desktop PCs", "Hardware Upgrades", "Component Replacement"],
        completedJobs: 450,
        avgResponseTime: "2h",
        location: "Panama City",
        certifications: ["CompTIA A+", "Dell Certified", "HP Certified"],
        languages: ["English", "Spanish"],
        availability: "Mon-Fri 9AM-6PM",
        hourlyRate: 35,
        description: "Expert in laptop and desktop repair with 8 years of experience. Specializes in hardware diagnostics and component replacement."
    },
    {
        id: "tech-002",
        name: "Ana Rodriguez",
        specialty: "Software & System Optimization",
        experience: 6,
        rating: 4.8,
        status: "online",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        skills: ["System Optimization", "Virus Removal", "OS Installation", "Data Recovery"],
        completedJobs: 320,
        avgResponseTime: "1h",
        location: "Panama City",
        certifications: ["Microsoft Certified", "Apple Certified", "Data Recovery Specialist"],
        languages: ["English", "Spanish"],
        availability: "Mon-Sat 8AM-8PM",
        hourlyRate: 30,
        description: "Software expert specializing in system optimization, virus removal, and data recovery. Quick response times and excellent customer satisfaction."
    },
    {
        id: "tech-003",
        name: "John Perez",
        specialty: "Data Recovery & Backup",
        experience: 10,
        rating: 5.0,
        status: "busy",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg",
        skills: ["Data Recovery", "Backup Solutions", "Storage Systems", "Cloud Services"],
        completedJobs: 280,
        avgResponseTime: "4h",
        location: "Panama City",
        certifications: ["Data Recovery Specialist", "Cloud Security", "Storage Management"],
        languages: ["English", "Spanish"],
        availability: "Mon-Fri 10AM-7PM",
        hourlyRate: 45,
        description: "Data recovery specialist with 10 years of experience. Expert in recovering lost data and implementing backup solutions."
    },
    {
        id: "tech-004",
        name: "Maria Gonzalez",
        specialty: "Network & Security",
        experience: 7,
        rating: 4.7,
        status: "online",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        skills: ["Network Setup", "WiFi Configuration", "Security Audits", "VPN Setup"],
        completedJobs: 380,
        avgResponseTime: "3h",
        location: "Panama City",
        certifications: ["Cisco Certified", "Network Security", "Cybersecurity"],
        languages: ["English", "Spanish"],
        availability: "Mon-Sun 9AM-9PM",
        hourlyRate: 40,
        description: "Network and security expert. Specializes in WiFi setup, security audits, and VPN configuration for businesses and homes."
    },
    {
        id: "tech-005",
        name: "Carlos Fernandez",
        specialty: "Mobile Device Repair",
        experience: 5,
        rating: 4.6,
        status: "offline",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        skills: ["iPhone Repair", "Android Repair", "Screen Replacement", "Battery Replacement"],
        completedJobs: 520,
        avgResponseTime: "1.5h",
        location: "Panama City",
        certifications: ["Apple Certified", "Samsung Certified", "Mobile Repair"],
        languages: ["English", "Spanish"],
        availability: "Mon-Sat 10AM-8PM",
        hourlyRate: 25,
        description: "Mobile device repair specialist. Expert in iPhone and Android repairs, screen replacements, and battery services."
    },
    {
        id: "tech-006",
        name: "Laura Torres",
        specialty: "Gaming PC Specialist",
        experience: 4,
        rating: 4.9,
        status: "online",
        avatar: "https://randomuser.me/api/portraits/women/67.jpg",
        skills: ["Gaming PCs", "Performance Optimization", "Overclocking", "Gaming Setup"],
        completedJobs: 220,
        avgResponseTime: "2.5h",
        location: "Panama City",
        certifications: ["Gaming PC Specialist", "Performance Optimization"],
        languages: ["English", "Spanish"],
        availability: "Mon-Fri 11AM-9PM",
        hourlyRate: 35,
        description: "Gaming PC specialist with expertise in building, optimizing, and maintaining high-performance gaming systems."
    },
    {
        id: "tech-007",
        name: "Roberto Silva",
        specialty: "Server & Enterprise",
        experience: 12,
        rating: 4.8,
        status: "busy",
        avatar: "https://randomuser.me/api/portraits/men/89.jpg",
        skills: ["Server Management", "Enterprise Solutions", "Cloud Migration", "IT Consulting"],
        completedJobs: 150,
        avgResponseTime: "6h",
        location: "Panama City",
        certifications: ["Microsoft Server", "AWS Certified", "Enterprise IT"],
        languages: ["English", "Spanish"],
        availability: "Mon-Fri 8AM-6PM",
        hourlyRate: 60,
        description: "Enterprise IT specialist with 12 years of experience in server management, cloud migration, and business IT solutions."
    },
    {
        id: "tech-008",
        name: "Sofia Morales",
        specialty: "Mac & Apple Specialist",
        experience: 6,
        rating: 4.7,
        status: "online",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        skills: ["Mac Repair", "Apple Devices", "macOS Support", "iCloud Services"],
        completedJobs: 290,
        avgResponseTime: "2h",
        location: "Panama City",
        certifications: ["Apple Certified", "macOS Specialist", "Apple Support"],
        languages: ["English", "Spanish"],
        availability: "Mon-Sat 9AM-7PM",
        hourlyRate: 40,
        description: "Apple specialist with expertise in Mac repairs, macOS support, and Apple ecosystem services."
    }
];

// Helper functions
function getTechnicianById(id) {
    return TECHNICIANS_DATA.find(tech => tech.id === id);
}

function getTechniciansBySpecialty(specialty) {
    return TECHNICIANS_DATA.filter(tech => 
        tech.specialty.toLowerCase().includes(specialty.toLowerCase()) ||
        tech.skills.some(skill => skill.toLowerCase().includes(specialty.toLowerCase()))
    );
}

function getOnlineTechnicians() {
    return TECHNICIANS_DATA.filter(tech => tech.status === 'online');
}

function getTechniciansByRating(minRating) {
    return TECHNICIANS_DATA.filter(tech => tech.rating >= minRating);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TECHNICIANS_DATA,
        getTechnicianById,
        getTechniciansBySpecialty,
        getOnlineTechnicians,
        getTechniciansByRating
    };
} 