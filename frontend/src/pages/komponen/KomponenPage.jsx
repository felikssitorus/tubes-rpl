import { createResource, createSignal, Show } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import toast, { Toaster } from "solid-toast";

import { getAllKomponen, createKomponen, updateKomponen, deleteKomponen } from "../../services/KomponenService";
import { getTubes } from "../../services/TubesService";
import KomponenList from "../../components/komponen/KomponenList";
import KomponenModal from "../../components/komponen/KomponenModal";
import Header from "../../components/layout/Header";

export default function KomponenPage() {
  const params = useParams();
  const navigate = useNavigate();
  
  const [tubes] = createResource(() => getTubes(params.id_tubes));
  const [data, { refetch }] = createResource(() => getAllKomponen(params.id_tubes)); // FIX: Pass id_tubes
  
  const [open, setOpen] = createSignal(false);
  const [selected, setSelected] = createSignal(null);

  const handleAdd = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (item) => {
    setSelected(item);
    setOpen(true);
  };

  const handleSave = async (payload) => {
    try {
      const dataToSave = { 
        ...payload, 
        id_tubes: Number(params.id_tubes) 
      };

      if (selected()) {
        await updateKomponen(selected().id_komponen, dataToSave);
        toast.success("Komponen berhasil diperbarui!", {
          style: { background: '#465EBE', color: 'white' } 
        });
      } else {
        await createKomponen(dataToSave);
        toast.success("Komponen berhasil ditambahkan!", {
          style: { background: '#465EBE', color: 'white' }
        });
      }
      
      setOpen(false);      
      setSelected(null);   
      await refetch(); // FIX: await refetch

    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.error || error.message || "Gagal menyimpan data";
      toast.error(errorMsg); // FIX: Show actual error message
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus komponen ini?")) return;

    try {
      await deleteKomponen(id);
      toast.success("Komponen berhasil dihapus!", {
        style: { background: '#465EBE', color: 'white' }
      });
      await refetch(); // FIX: await refetch
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus komponen.");
    }
  };

  return (
    <div class="min-h-screen bg-gray-50 font-sans">
        
      <Toaster position="top-center" gutter={8} />

      <Header />

      <main class="max-w-5xl mx-auto px-4 pt-6 pb-20">
        <div class="flex flex-col gap-4 mb-6">
          <div>
            <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {tubes()?.nama_mata_kuliah} - {tubes()?.topik_tubes}
            </h2>
            <h1 class="text-2xl font-bold text-[#465EBE]">Komponen Penilaian</h1>
          </div>

          <button 
            onClick={handleAdd}
            class="bg-[#465EBE] hover:bg-[#3b4fa8] text-white px-4 py-3 rounded-xl shadow-lg shadow-indigo-200 flex justify-center items-center gap-2 transition-all transform active:scale-95 font-medium"
          >
            Tambah Komponen
          </button>
        </div>

        <KomponenList
          data={data()} // FIX: Langsung pakai data(), nggak perlu filter lagi
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      <Show when={open()}>
        <KomponenModal
          open={open()}
          data={selected()}
          onSave={handleSave}
          onClose={() => setOpen(false)}
        />
      </Show>
    </div>
  );
}