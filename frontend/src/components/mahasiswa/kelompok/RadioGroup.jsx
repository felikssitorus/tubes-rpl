export default function RadioGroup({ onSelect }) {
    const groups = ["A", "B", "C", "D"];

    return (
        <div className="radio-box">
            {groups.map((g) => (
                <label key={g}>
                    <input 
                        type="radio" 
                        name="kelompok"
                        value={g}
                        onChange={() => onSelect(g)}
                    />
                    Kelompok {g}
                </label>
            ))}
        </div>
    );
}
