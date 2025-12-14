export default function TubesCard(props) {
  const { item, onClick } = props;

  return (
    <div 
      onClick={() => onClick(item)}
      class="bg-gradient-to-b from-[#465EBE] to-[#5a72d4] hover:from-[#5a72d4] hover:to-[#6b82e3] rounded-2xl shadow-lg cursor-pointer transition-colors duration-300 overflow-hidden"
    >
      <div class="h-32 flex items-center justify-center">
      </div>
      
      <div class="bg-gray-100 p-4 rounded-b-2xl">
        <h3 class="text-lg font-bold text-gray-800 text-center">
          {item.topik_tubes || "Tubes"}
        </h3>
        <p class="text-sm text-gray-600 text-center mt-1">
          {item.nama_mata_kuliah || ""}
        </p>
        <p class="text-xs text-gray-500 text-center">
          Kelas {item.kelas}
        </p>
      </div>
    </div>
  );
}