import { useState } from "react";
import MenuItem from "./MenuItem";
import ModalGroup from "./ModalGroup";

export default function MenuPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="container">

            <div className="menu-list">
                <MenuItem 
                    text="Kelola Kelompok Tugas Besar"
                    onClick={() => setOpen(true)}
                />

                <MenuItem 
                    text="Lihat Kelompok Tugas"
                    onClick={() => window.location.href = "/kelompok"}
                />
            </div>

            <ModalGroup open={open} onClose={() => setOpen(false)} />
        </div>
    );
}
