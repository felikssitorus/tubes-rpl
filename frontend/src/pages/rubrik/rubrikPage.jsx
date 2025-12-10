import { createResource, createSignal, Show } from "solid-js";
import toast, { Toaster } from "solid-toast";

import { getAllRubrik, createRubrik } from "../../services/rubrikService";
import RubrikList from "../../components/rubrik/RubrikPenilaianList";
import RubrikModal from "../../components/rubrik/RubrikModal";
import Header from "../../components/layout/Header";

export default function RubrikPage() {
  const [data, { refetch }] = createResource(getAllRubrik);
  const [open, setOpen] = createSignal(false);

  const handleAdd = () => {
    setOpen(true);
  };

  const handleSave = async (payload) => {
    try {
      await createRubrik(payload);
      toast.success("Rubrik berhasil ditambahkan!", {
          style: { background: '#465EBE', color: 'white' }
      });
      
      setOpen(false);
      refetch();

    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data. Cek koneksi atau input Anda.");
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
                   <h1 class="text-2xl font-bold text-[#465EBE]">Rubrik</h1>
                </div>

                <button 
                    onClick={handleAdd}
                    class="bg-[#465EBE] hover:bg-[#3b4fa8] text-white px-4 py-3 rounded-xl shadow-lg shadow-indigo-200 flex justify-center items-center gap-2 transition-all transform active:scale-95 font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                    </svg>
                    Tambah Rubrik
                </button>
            </div>

            <RubrikList data={data()} />
        </main>

        <Show when={open()}>
            <RubrikModal
                open={open()}
                onSave={handleSave}
                onClose={() => setOpen(false)}
            />
        </Show>
    </div>
  );
}