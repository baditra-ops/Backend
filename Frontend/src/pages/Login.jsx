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

      <h1>VideoTube</h1>

      <input
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

      <button onClick={handleLogin}>
        Login
      </button>

    </div>

  </div>
)
}

export default Login