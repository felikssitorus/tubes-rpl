import MahasiswaService from "../../../services/MahasiswaServices";
import NilaiList from "./NilaiList";

export default function NilaiPage() {
  const nilai = MahasiswaService.getNilai();
  return (
    <div class="container">
      <h1>Detail Nilai</h1>
      <div class="innercont2">
        <NilaiList nilai={nilai} />
      </div>
    </div>
  );
}
