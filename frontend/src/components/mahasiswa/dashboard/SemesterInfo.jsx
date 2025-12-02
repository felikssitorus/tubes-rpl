export default function SemesterInfo({ year, semester }) {
    return (
        <div className="semester-info">
            <p>{year}</p>
            <p>{semester}</p>
        </div>
    );
}
