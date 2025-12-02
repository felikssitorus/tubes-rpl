export default function ClassCard({ label, onClick }) {
    return (
        <div className="class-card" onClick={() => onClick(label)}>
            <div className="card-image"></div>
            <div className="card-label">{label}</div>
        </div>
    );
}
