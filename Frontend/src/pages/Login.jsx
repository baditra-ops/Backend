import { useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

const handleLogin = async () => {
  try {
    const res = await api.post("/users/login", {
      email,
      password
    })

    console.log(res.data)

    alert("Login Successful")

    navigate("/")
  } catch (error) {
    console.log(error)
  }
}

return (
  <div className="login-page">

    <div className="login-card">

      <h1 className="login-logo">
        ▶ VideoTube
      </h1>

      <h2 className="login-title">
        Welcome Back
      </h2>

      <p className="login-subtitle">
        Sign in to continue watching and uploading videos
      </p>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        className="login-btn"
        onClick={handleLogin}
      >
        Sign In
      </button>

      <p className="login-footer">
        Don't have an account?
        <span
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>

    </div>

  </div>
)
}

export default Login