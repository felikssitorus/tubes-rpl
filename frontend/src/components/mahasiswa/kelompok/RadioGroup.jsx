export default function RadioGroup(props) {
  const groups = ["A", "B", "C", "D"];
  return (
    <div class="radio-box">
      {groups.map((g) => (
        <label key={g}>
          <input
            type="radio"
            name="kelompok"
            value={g}
            onChange={() => props.onSelect(g)}
          />
          Kelompok {g}
        </label>
      ))}
    </div>
  );
}
