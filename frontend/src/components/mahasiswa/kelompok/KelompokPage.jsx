import { useState } from "react";
import KelompokService from "../../services/KelompokService";
import RadioGroup from "./RadioGroup";
import KelompokList from "./KelompokList";

export default function KelompokPage() {
    const [anggota, setAnggota] = useState([]);

    return (
        <div className="container">
            <h1>Pembagian Kelompok</h1>

            <RadioGroup onSelect={(kode) => 
                setAnggota(KelompokService.getKelompok(kode))
            }/>

            <div className="content2">
                <h1>Kelompok Saya</h1>
                <KelompokList anggota={anggota} />
            </div>
        </div>
    );
}
