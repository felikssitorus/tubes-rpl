export default function TubesCard(props) {
  const { item, onClick } = props;

  return (
    <div 
      onClick={() => onClick(item)}
      class="bg-gradient-to-b from-[#465EBE] to-[#5a72d4] rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 overflow-hidden"
    >
      <div class="h-32 flex items-center justify-center">
        
      </div>
      
      <div class="bg-gray-100 p-4 rounded-b-2xl">
        <h3 class="text-lg font-bold text-gray-800 text-center">
          {item.nama_tubes || "Tubes"}
        </h3>
        <p class="text-sm text-gray-600 text-center mt-1">
          {item.kode_matkul || item.nama_matkul || ""}
        </p>
      </div>
    </div>
  );
}