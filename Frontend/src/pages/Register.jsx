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

    <div className="register-logo">
      <h1>▶ VideoTube</h1>
    </div>

    <h2>Create Account</h2>

    <p className="register-subtitle">
      Join VideoTube and start uploading videos
    </p>

    <input
      type="text"
      placeholder="Full Name"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
    />

    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <div className="file-group">
      <label>Profile Picture</label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setAvatar(e.target.files[0])
        }
      />
    </div>

    <div className="file-group">
      <label>Cover Image (Optional)</label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setCoverImage(e.target.files[0])
        }
      />
    </div>

    <button onClick={handleRegister}>
      Create Account
    </button>

    <p className="register-footer">
      Already have an account?
      <span
        onClick={() => navigate("/login")}
      >
        {" "}Sign In
      </span>
    </p>

  </div>

</div>
  )
}

export default Register