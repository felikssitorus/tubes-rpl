import { createSignal } from "solid-js";
import MahasiswaService from "../../../services/MahasiswaServices";
import RadioGroup from "./RadioGroup";
import KelompokList from "./KelompokList";

export default function KelompokPage() {
  const [anggota, setAnggota] = createSignal([]);

  return (
    <div class="container">
      <h1>Pembagian Kelompok</h1>
      <RadioGroup onSelect={(kode) => setAnggota(MahasiswaService.getKelompok(kode))} />
      <div class="content2">
        <h1>Kelompok Saya</h1>
        <KelompokList anggota={anggota()} />
      </div>
    </div>
  );
}
