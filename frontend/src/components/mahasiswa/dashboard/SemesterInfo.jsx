export default function SemesterInfo(props) {
  return (
    <div class="mt-6 p-2 border rounded bg-gray-50">
      <p class="font-medium">{props.year}</p>
      <p class="text-gray-600">{props.semester}</p>
    </div>
  );
}
