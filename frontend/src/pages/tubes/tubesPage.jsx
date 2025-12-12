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
    navigate(`/tubes/${item.id_tubes}/menu`);
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
          </div>

          <button
            onClick={handleAdd}
            class="bg-[#465EBE] hover:bg-[#3b4fa8] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
            </svg>
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
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                      <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => handleDelete(item, e)}
                    class="bg-white hover:bg-red-50 text-red-600 p-2 rounded-lg shadow-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                      <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
                    </svg>
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