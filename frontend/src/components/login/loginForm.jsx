import { createSignal } from "solid-js";
import toast, { Toaster } from "solid-toast";
import { useNavigate } from "@solidjs/router";
import { loginUser } from "../../services/userService";

export default function LoginForm() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(email(), password());
      toast.success(`Selamat datang, ${response.user.name}`);
      navigate("/dashboard"); // redirect ke dashboard
    } catch (err) {
      toast.error(err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#081B4A] to-[#0757ED]">
      <Toaster position="top-center" />
      <div class="bg-white rounded-3xl w-96 p-10 box-border shadow-lg">
        {/* HEADER */}
        <div class="flex items-center gap-4 mb-8">
          <img src="/src/img/logo.png" alt="logo" class="w-20 h-20" />
          <p class="text-4xl font-paytone text-[#081B4A]">TubesKu</p>
        </div>

        {/* FORM */}
        <form class="flex flex-col gap-5" onSubmit={handleLogin}>
          {/* EMAIL */}
          <div class="flex items-center bg-gray-300 rounded-md px-4 py-2">
            <img src="/src/img/email-icon.png" alt="email" class="w-7 h-7 mr-3" />
            <input
              type="text"
              placeholder="Enter your email"
              class="flex-1 bg-transparent outline-none border-b border-black text-lg"
              value={email()}
              onInput={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div class="flex items-center bg-gray-300 rounded-md px-4 py-2">
            <img src="/src/img/password-icon.png" alt="password" class="w-7 h-7 mr-3" />
            <input
              type="password"
              placeholder="Enter your password"
              class="flex-1 bg-transparent outline-none border-b border-black text-lg"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            class="bg-[#0A2B7E] text-white font-koulen text-2xl rounded-full py-3 w-full mt-5 hover:bg-blue-900 transition"
            disabled={loading()}
          >
            {loading() ? "Loading..." : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}
