import { For } from "solid-js";
import { useNavigate } from "@solidjs/router";

const Menu = ({ courseInfo }) => {
  const navigate = useNavigate();

  const handleClick = (menu) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const npm = user?.npm?.trim(); // <-- TRIM
    const idMk = courseInfo?.idMkDibuka;

    if (!npm || !idMk) {
      console.error("npm atau idMk tidak valid");
      return;
    }

    switch (menu.page) {
      case "pembagian-kelompok":
        navigate(`/kelompok/${idMk}`);
        break;
      case "nilai":
        navigate(`/nilai/${encodeURIComponent(npm)}/${idMk}`);
        break;
      default:
        console.warn(`Halaman "${menu.page}" belum di-handle`);
        break;
    }
  };


  return (
    <div class="container p-6 w-full text-left">
      <div class="course-title text-lg font-bold mb-4">
        MATA KULIAH: {courseInfo.courseCode}
        <div class="course-info max-w-md mt-2 p-3 rounded shadow bg-white">
          <p class="font-semibold">Dosen Pengajar :</p>
          <For each={courseInfo.dosen}>
            {(d) => <p class="pl-2">{d}</p>}
          </For>
        </div>
      </div>

      <div class="menu-list w-full flex flex-col gap-4 mt-6">
        <For each={courseInfo.menus}>
          {(menu) => (
            <button
              class="
                menu-item w-8/9 max-w-5xl text-white py-6 px-4 rounded shadow
                text-lg font-bold uppercase tracking-wide text-left mt-5
                transform transition-all duration-300
                bg-gradient-to-b from-[#465EBE] to-[#212C58]
                hover:brightness-110 hover:shadow-xl
              "
              onClick={() => handleClick(menu)}
            >
              {menu.label}
            </button>
          )}
        </For>
      </div>
    </div>
  );
};

export default Menu;
