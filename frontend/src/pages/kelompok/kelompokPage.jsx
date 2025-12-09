import { useParams } from "@solidjs/router";
import Header from "../../components/layout/Header";
import Kelompok from "../../components/kelompok/kelompok";

export default function KelompokPage() {
  const params = useParams();
  const idMkDibuka = params.courseId;

  // AMBIL DATA LOGIN DARI LOCAL STORAGE
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Header />
      <Kelompok 
        idMkDibuka={idMkDibuka}
        npm={user.npm}
        namaMahasiswa={user.name}
      />
    </>
  );
}
