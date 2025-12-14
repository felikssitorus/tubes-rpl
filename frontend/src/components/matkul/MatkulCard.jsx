export default function MatkulCard(props) {
  const { item, onClick } = props;

  return (
    <div 
      onClick={() => onClick(item)}
      class="rounded-2xl shadow-lg cursor-pointer overflow-hidden transition-all duration-300"
    >
      <div class="h-32 flex items-center justify-center bg-gradient-to-br from-[#465EBE] to-[#3a4fa0] hover:from-[#5a72d4] hover:to-[#4a5fb0] transition-colors duration-300">
        <div class="text-white text-6xl font-bold">
        </div>
      </div> 
      
      <div class="bg-white p-4">
        <h3 class="text-base font-bold text-gray-800 text-center">
          {item.nama_mata_kuliah || "Mata Kuliah"}
        </h3>
        <p class="text-sm text-gray-600 text-center mt-1">
          Kelas {item.kelas}
        </p>
      </div>
    </div>
  );
}