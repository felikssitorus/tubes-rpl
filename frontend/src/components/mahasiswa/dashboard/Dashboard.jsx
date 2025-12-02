import { createSignal } from "solid-js";
import DashboardGrid from "./DashboardGrid";
import SemesterInfo from "./SemesterInfo";

export default function Dashboard() {
  const classes = [
    "PBW",
    "RPL",
    "Manajemen Proyek",
    "Design Antarmuka Grafis",
    "AI",
    "Big Data",
  ];

  const handleClick = (label) => {
    alert("Masuk ke kelas: " + label); // harusnya ini muncul
  };

  return (
    <div class="container p-4">
      <h1 class="text-2xl font-bold mb-4">Daftar Kelas</h1>
      <DashboardGrid classes={classes} onSelect={handleClick} />
      <SemesterInfo year="Tahun Akademik 2025/2026" semester="Semester Ganjil" />
    </div>
  );
}
