import { createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import logo from "../../img/logo.png";

export default function Header(props) {
  const [showProfile, setShowProfile] = createSignal(false);
  
  const navigate = useNavigate();

  const user = {
    name: "Mahasiswa Teladan",
    email: "mahasiswa@student.telkomuniversity.ac.id"
  };

  return (
    <header class="bg-[#071755] text-white p-4 shadow-md sticky top-0 z-50 w-full">
      <div class="w-full flex justify-between items-center px-4">
        
        <div class="flex items-center gap-3">
          <button 
            class="hover:bg-white/10 p-1 rounded-full transition"
            onClick={() => navigate(-1)} 
            title="Kembali"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>

          <div class="flex items-center gap-2">
            <img src={logo} alt="Logo" class="w-10 h-10 object-contain" />
            <h1 class="font-bold text-xl tracking-wider uppercase">TUBESKU</h1>
          </div>
        </div>

        <div class="flex items-center gap-4">
            <button class="hover:bg-white/10 p-1 rounded-full transition" title="Logout">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
            </button>
            
            <div class="relative">
                <div 
                    class="bg-gray-200 text-gray-800 rounded-full p-1 cursor-pointer hover:bg-white transition select-none"
                    onClick={() => setShowProfile(!showProfile())} 
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                      <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                    </svg>
                </div>

                <Show when={showProfile()}>
                    <div class="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl py-4 px-5 text-gray-800 z-50 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                        <p class="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">
                            Signed in as
                        </p>
                        <p class="text-base font-bold text-gray-900 truncate">
                            {user.name}
                        </p>
                        <p class="text-sm text-gray-500 truncate">
                            {user.email}
                        </p>
                    </div>
                </Show>
            </div>
        </div>
      </div>
    </header>
  );
}