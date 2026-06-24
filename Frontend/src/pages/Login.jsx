import { useState } from "react"
import api from "../services/api"

function Login() {

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
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div>

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
  )
}

export default Login