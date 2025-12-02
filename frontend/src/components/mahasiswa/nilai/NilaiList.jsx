export default function NilaiList({ nilai }) {
    return (
        <ul>
            {Object.entries(nilai).map(([kategori, value]) => (
                <li key={kategori}>
                    <span className="nama">{kategori}</span>
                    <span className="nilai">{value}</span>
                </li>
            ))}
        </ul>
    );
}
