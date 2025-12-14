import { createResource, createSignal, Show, For } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import toast, { Toaster } from "solid-toast";

import { getAllTubes, createTubes, updateTubes, deleteTubes } from "../../services/TubesService";
import { getMatkul } from "../../services/MatkulService";
import TubesCard from "../../components/tubes/TubesCard";
import TubesModal from "../../components/tubes/TubesModal";
import Header from "../../components/layout/Header";

export default function TubesListPage() {
  const params = useParams();
  const navigate = useNavigate();
  
  const [matkul] = createResource(() => getMatkul(params.id_mk_dibuka));
  const [data, { refetch }] = createResource(() => getAllTubes(params.id_mk_dibuka));
  
  const [open, setOpen] = createSignal(false);
  const [selected, setSelected] = createSignal(null);

  const handleCardClick = (item) => {
    navigate(`/dosen/tubes/${item.id_tubes}/menu`);
  };

  const handleAdd = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (item, e) => {
    e.stopPropagation();
    setSelected(item);
    setOpen(true);
  };

  const handleSave = async (payload) => {
    try {
      const dataToSave = { 
        ...payload, 
        id_mk_dibuka: Number(params.id_mk_dibuka) 
      };
      
      if (selected()) {
        await updateTubes(selected().id_tubes, dataToSave);
        toast.success("Tubes berhasil diperbarui!", {
          style: { background: '#465EBE', color: 'white' }
        });
      } else {
        await createTubes(dataToSave);
        toast.success("Tubes berhasil ditambahkan!", {
          style: { background: '#465EBE', color: 'white' }
        });
      }
      
      setOpen(false);
      setSelected(null);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data.");
    }
  };

  const handleDelete = async (item, e) => {
    e.stopPropagation();
    if (!confirm(`Hapus tubes "${item.topik_tubes}"?`)) return;

    try {
      await deleteTubes(item.id_tubes);
      toast.success("Tubes berhasil dihapus!", {
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

      <main class="max-w-6xl mx-auto px-4 pt-6 pb-20">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
              MATA KULIAH 
            </h2>
            <Show when={matkul()} fallback={<p class="text-lg font-bold text-gray-700">Loading...</p>}>
              <h1 class="text-2xl font-bold text-gray-800">
                {matkul().nama_mata_kuliah}
              </h1>
            </Show>
          </div>

          <button
            onClick={handleAdd}
            class="bg-[#465EBE] hover:bg-[#3b4fa8] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all"
          >
            Tambah Tubes
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <For each={data()} fallback={
            <div class="col-span-3 text-center py-12 text-gray-400">
              <p>Belum ada tugas besar.</p>
            </div>
          }>
            {(item) => (
              <div class="relative group">
                <TubesCard item={item} onClick={handleCardClick} />
                
                <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button
                    onClick={(e) => handleEdit(item, e)}
                    class="bg-white hover:bg-blue-50 text-blue-600 p-2 rounded-lg shadow-md transition-colors"
                  >edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(item, e)}
                    class="bg-white hover:bg-red-50 text-red-600 p-2 rounded-lg shadow-md transition-colors"
                  >delete
                  </button>
                </div>
              </div>
            )}
          </For>
        </div>
      </main>

      <Show when={open()}>
        <TubesModal
          open={open()}
          data={selected()}
          onSave={handleSave}
          onClose={() => setOpen(false)}
        />
      </Show>
    </div>
  );
}