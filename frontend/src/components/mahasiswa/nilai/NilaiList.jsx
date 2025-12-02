export default function NilaiList({ nilai }) {
  return (
    <ul>
      {Object.entries(nilai).map(([kategori, value]) => (
        <li key={kategori}>
          <span class="nama">{kategori}</span>
          <span class="nilai">{value}</span>
        </li>
      ))}
    </ul>
  );
}
