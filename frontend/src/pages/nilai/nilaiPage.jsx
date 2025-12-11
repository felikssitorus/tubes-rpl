import Header from "../../components/layout/Header";
import Nilai from "../../components/nilai/nilai";
import { useParams } from "@solidjs/router";

export default function NilaiPage() {
  const { npm } = useParams();

  console.log("NILAI PAGE PARAM NPM:", npm);

  return (
    <div class="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div class="flex-1 flex flex-col items-center justify-center p-4">
        {/* Judul diperbesar dan bold */}
        <h1 class="text-3xl font-bold mb-6 text-[#071755]">Detail Nilai</h1>

        {/* Kotak nilai */}
        <Nilai npm={npm} />
      </div>
    </div>
  );
}
