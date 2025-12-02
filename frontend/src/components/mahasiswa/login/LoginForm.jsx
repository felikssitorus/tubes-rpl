import { createSignal } from "solid-js";
import MahasiswaService from "../../../services/MahasiswaServices";

export default function LoginForm() {
  const [email, setEmail] = createSignal("");
  const [pass, setPass] = createSignal("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email()) return alert("Email kosong!");
    if (!pass()) return alert("Password kosong!");

    const result = MahasiswaService.login(email(), pass());
    if (result.success) {
      alert("Login Berhasil!");
      window.location.href = "/dashboard";
    } else {
      alert(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="content">
      <div class="innerContent">
        <input
          type="text"
          placeholder="Enter your email"
          value={email()}
          onInput={(e) => setEmail(e.target.value)}
        />
      </div>

      <div class="innerContent">
        <input
          type="password"
          placeholder="Enter your password"
          value={pass()}
          onInput={(e) => setPass(e.target.value)}
        />
      </div>

      <button id="submit">LOGIN</button>
    </form>
  );
}
