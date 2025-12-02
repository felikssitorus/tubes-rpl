import ClassCard from "./ClassCard";

export default function DashboardGrid({ classes, onSelect }) {
    return (
        <div className="class-grid">
            {classes.map((kelas, i) => (
                <ClassCard key={i} label={kelas} onClick={onSelect} />
            ))}
        </div>
    );
}
