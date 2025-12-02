import { createResource, createSignal, Show } from "solid-js";
import toast, { Toaster } from "solid-toast"; // 1. Import solid-toast

import { getAllKomponen, createKomponen, updateKomponen, deleteKomponen } from "../../services/KomponenService";
import KomponenList from "../../components/komponen/KomponenList";
import KomponenModal from "../../components/komponen/KomponenModal";
import Header from "../../components/layout/Header";

export default function KomponenPage() {
  const [data, { refetch }] = createResource(getAllKomponen);
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
      if (selected()) {
        await updateKomponen(selected().id_komponen, payload);
        toast.success("Data berhasil diperbarui!", {
             style: { background: '#465EBE', color: 'white' } 
        });
      } else {
        await createKomponen(payload);
        toast.success("Komponen berhasil ditambahkan!", {
            style: { background: '#465EBE', color: 'white' }
        });
      }
      
      setOpen(false);      
      setSelected(null);   
      refetch();           

    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data. Cek koneksi atau input Anda.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus komponen ini?")) return;

    try {
      await deleteKomponen(id);
      toast.success("Komponen berhasil dihapus!", {
        icon: '🗑️', 
        style: { color: 'red' }
      });
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus data.");
    }
  };

  return (
    <div class="min-h-screen bg-gray-50 font-sans">
        
        <Toaster position="top-center" gutter={8} />

        <Header />

        <main class="max-w-5xl mx-auto px-4 pt-6 pb-20">
            <div class="flex flex-col gap-4 mb-6">
                <div>
                   <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Mata Kuliah</h2>
                   <h1 class="text-2xl font-bold text-[#465EBE]">Komponen Penilaian</h1>
                </div>

                <button 
                    onClick={handleAdd}
                    class="bg-[#465EBE] hover:bg-[#3b4fa8] text-white px-4 py-3 rounded-xl shadow-lg shadow-indigo-200 flex justify-center items-center gap-2 transition-all transform active:scale-95 font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                    </svg>
                    Tambah Komponen
                </button>
            </div>

            <KomponenList
                data={data()}
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