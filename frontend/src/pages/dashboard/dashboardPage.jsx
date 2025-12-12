import { createResource, Show } from "solid-js";
import Dashboard from "../../components/dashboard/dashboard";
import Header from "../../components/layout/Header";
import { getMkDiambilByEmail } from "../../services/dashboardService";

const DashboardPage = () => {
  const [mkData] = createResource(() =>
    getMkDiambilByEmail("mhs001@unpar.ac.id") // nanti bisa diganti dinamis dari login
  );

  return (
    <div class="min-h-screen bg-gray-100">
      <Header />
      <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6 text-black">Daftar Kelas</h1>

        <Show when={!mkData.loading} fallback={<p>Loading...</p>}>
          <Dashboard mataKuliah={mkData()?.mata_kuliah} />
        </Show>

        <Show when={mkData.error}>
          <p class="text-red-500 mt-4">Error: {mkData.error.message}</p>
        </Show>
      </div>
    </div>
  );
};

export default DashboardPage;
