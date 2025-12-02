import { useState } from "react";
import DashboardGrid from "./DashboardGrid";
import SemesterInfo from "./SemesterInfo";

export default function Dashboard() {
    const [classes] = useState([
        "PBW",
        "RPL",
        "Manajemen Proyek",
        "Design Antarmuka Grafis",
        "AI",
        "Big Data",
    ]);

    const handleClick = (label) => {
        alert("Masuk ke kelas: " + label);
    };

    return (
        <div className="container">
            <h1>Daftar Kelas</h1>

            <DashboardGrid classes={classes} onSelect={handleClick} />

            <SemesterInfo 
                year="Tahun Akademik 2025/2026"
                semester="Semester Ganjil"
            />
        </div>
    );
}
