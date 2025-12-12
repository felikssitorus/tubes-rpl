import { createResource, Show } from "solid-js";
import { useParams } from "@solidjs/router";
import Header from "../../components/layout/Header";
import Menu from "../../components/menu/menu";
import { getCourseInfo } from "../../services/menuService";

const MenuPage = () => {
  const { courseCode } = useParams();
  const [courseInfo] = createResource(() => courseCode, getCourseInfo);

  return (
    <div class="min-h-screen bg-gray-100">
      <Header />

      <Show when={courseInfo.loading}>
        <p class="text-center mt-6 text-gray-500">Loading...</p>
      </Show>

      <Show when={courseInfo.error}>
        <p class="text-red-500 text-center mt-4">{courseInfo.error.message}</p>
      </Show>

      <Show when={courseInfo()}>
        <Menu courseInfo={courseInfo()} />
      </Show>
    </div>
  );
};

export default MenuPage;
