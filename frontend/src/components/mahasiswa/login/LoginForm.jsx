import { useState } from "react";
import AuthService from "../../services/AuthService";
import ValidationService from "../../services/ValidationService";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (ValidationService.isEmpty(email)) return alert("Email kosong!");
        if (ValidationService.isEmpty(pass)) return alert("Password kosong!");

        const result = AuthService.login(email, pass);

        if (result.success) {
            alert("Login Berhasil!");
            window.location.href = "/dashboard";
        } else {
            alert(result.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="content">
            <div className="innerContent">
                <input 
                    type="text" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="innerContent">
                <input 
                    type="password"
                    placeholder="Enter your password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
            </div>

            <button id="submit">LOGIN</button>
        </form>
    );
}
