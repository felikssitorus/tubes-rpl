export default function ClassCard(props) {
  const handleClick = () => props.onClick(props.label);

  return (
    <div
      class="p-4 border rounded shadow cursor-pointer hover:bg-gray-100"
      onClick={handleClick}
    >
      {props.label}
    </div>
  );
}
