import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function Register() {

  const navigate = useNavigate()

  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [avatar, setAvatar] = useState(null)
  const [coverImage, setCoverImage] = useState(null)

  const handleRegister = async () => {
    try {

      const formData = new FormData()

      formData.append("fullName", fullName)
      formData.append("username", username)
      formData.append("email", email)
      formData.append("password", password)

      if (avatar) {
        formData.append("avatar", avatar)
      }

      if (coverImage) {
        formData.append("coverImage", coverImage)
      }

      await api.post(
        "/users/register",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      )

      alert("Registration Successful")

      navigate("/login")

    } catch (error) {
      console.log(error)
      alert("Registration Failed")
    }
  }

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <label>
          Avatar
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setAvatar(e.target.files[0])
          }
        />

        <label>
          Cover Image (Optional)
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setCoverImage(e.target.files[0])
          }
        />

        <button
          onClick={handleRegister}
        >
          Register
        </button>

      </div>

    </div>
  )
}

export default Register