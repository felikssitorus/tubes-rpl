import NilaiService from "../../services/NilaiService";
import NilaiList from "./NilaiList";

export default function NilaiPage() {
    const nilai = NilaiService.getNilai();

    return (
        <div className="container">
            <h1>Detail Nilai</h1>

            <div className="innercont2">
                <NilaiList nilai={nilai} />
            </div>
        </div>
    );
}
