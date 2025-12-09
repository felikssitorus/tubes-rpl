import { For } from "solid-js";
import { useNavigate } from "@solidjs/router";

const Menu = (props) => {
  const { courseInfo } = props;
  const navigate = useNavigate();

  const handleClick = (menu) => {
    switch (menu.page) {
      case "pembagian-kelompok":
        navigate(`/kelompok/${courseInfo.idMkDibuka}`);
        break;
      case "nilai":
        navigate(`/nilai/${courseInfo.idMkDibuka}`);
        break;
      default:
        console.warn(`Halaman ${menu.page} belum di-handle`);
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

      {/* Buttons smaller width with hover shadow */}
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
