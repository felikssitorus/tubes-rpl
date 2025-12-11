export default function MatkulCard(props) {
  const { item, onClick } = props;

  return (
    <div 
      onClick={() => onClick(item)}
      class="bg-gradient-to-b from-[#465EBE] to-[#5a72d4] rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 overflow-hidden"
    ><div class="h-32 flex items-center justify-center bg-gradient-to-br from-[#465EBE] to-[#3a4fa0]">
    <div class="text-white text-6xl font-bold">
    </div>
    </div> 
      
      {/* Info Section */}
      <div class="bg-white p-4">
        <h3 class="text-base font-bold text-gray-800 text-center">
          {item.nama_mata_kuliah || "Mata Kuliah"}
        </h3>
        <p class="text-sm text-gray-600 text-center mt-1">
          {item.id_mata_kuliah} - Kelas {item.kelas}
        </p>
        <p class="text-xs text-gray-500 text-center mt-1">
          Tahun {item.tahun} • Semester {item.semester}
        </p>
      </div>
    </div>
  );
}