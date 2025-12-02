export default function KelompokList({ anggota }) {
    return (
        <ul>
            {anggota.map((a, i) => (
                <li key={i}>{a}</li>
            ))}
        </ul>
    );
}
