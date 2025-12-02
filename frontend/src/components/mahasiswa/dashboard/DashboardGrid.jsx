export default function DashboardGrid(props) {
  return (
    <div class="grid grid-cols-3 gap-4">
      {props.classes.map((kelas) => (
        <ClassCard label={kelas} onClick={() => props.onSelect(kelas)} />
      ))}
    </div>
  );
}
