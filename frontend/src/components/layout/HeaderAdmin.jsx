// src/components/layout/HeaderAdmin.jsx
import { createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import logo from "../../img/logo.png";

export default function HeaderAdmin() {
    const [showProfile, setShowProfile] = createSignal(false);

    const navigate = useNavigate();

    const user = {
        name: "Admin TUBESKU",
        email: "admin@student.telkomuniversity.ac.id"
    };

    const handleLogout = () => {
        console.log("Admin logout");
        navigate("/login");
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

                    <div class="flex items-center cursor-pointer" onClick={() => navigate("/admin")}>
                        <img src={logo} alt="Logo" class="w-10 h-10 object-contain" />
                        <h1 class="font-bold text-xl tracking-wider uppercase ml-3">TUBESKU</h1>
                        <span class="ml-3 px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                            Admin Dashboard
                        </span>
                    </div>
                </div>

                <div class="flex items-center gap-4">
                    {/* Notifications */}
                    <button class="relative hover:bg-white/10 p-2 rounded-full transition" title="Notifikasi">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                        </svg>
                        <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Settings */}
                    <button
                        class="hover:bg-white/10 p-2 rounded-full transition"
                        title="Pengaturan"
                        onClick={() => navigate("/admin/settings")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>

                    {/* Logout */}
                    <button
                        class="hover:bg-white/10 p-1 rounded-full transition"
                        title="Logout"
                        onClick={handleLogout}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                    </button>

                    {/* Profile */}
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
                                <div class="flex items-center mb-4">
                                    <div class="bg-blue-100 rounded-full p-2 mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-blue-600">
                                            <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">
                                            Admin Account
                                        </p>
                                        <p class="text-base font-bold text-gray-900 truncate">
                                            {user.name}
                                        </p>
                                        <p class="text-sm text-gray-500 truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <div class="border-t border-gray-200 pt-3">
                                    <button
                                        class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-lg transition flex items-center"
                                        onClick={() => navigate("/admin/profile")}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Profil Admin
                                    </button>

                                    <button
                                        class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-lg transition flex items-center mt-1"
                                        onClick={() => navigate("/admin/manage-users")}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9A2.5 2.5 0 0121.5 7v11a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 011.5 18V7A2.5 2.5 0 014 4.5h15z" />
                                        </svg>
                                        Kelola User
                                    </button>

                                    <div class="border-t border-gray-200 mt-2 pt-2">
                                        <button
                                            class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition flex items-center"
                                            onClick={handleLogout}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Show>
                    </div>
                </div>
            </div>
        </header>
    );
}