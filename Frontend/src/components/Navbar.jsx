import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../services/api"

function Navbar() {
  const fetchCurrentUser = async () => {
  try {

    const res = await api.get(
      "/users/current-user"
    )

    setUser(res.data.data)

  } catch (error) {
    console.log(error)
  }
}
const [user, setUser] = useState(null)

useEffect(() => {
  fetchCurrentUser()
}, [])

  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    if (!search.trim()) return

    navigate(`/?search=${search}`)
  }

  const handleLogout = async () => {
  try {

    await api.post("/users/logout")

    setUser(null)

    window.location.href = "/"

  } catch (error) {
    console.log(error)
  }
}

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        <h2 className="logo-text">
           ▶ VideoTube
        </h2>
      </Link>

      <div className="search-container">

        <input
          type="text"
          placeholder="Search videos..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" && handleSearch()
          }
        />

        <button onClick={handleSearch}>
          Search
        </button>

      </div>

  <div className="nav-links">

  <Link to="/upload">
    Upload
  </Link>

  {!user ? (
    <>
      <Link to="/login">
        Login
      </Link>

      <Link to="/register">
        Register
      </Link>
    </>
  ) : (
    <Link
  to={`/channel/${user.username}`}
  className="user-info"
>
  <img
    src={user.avatar}
    alt=""
    className="nav-avatar"
  />

  <span>
    {user.username}
  </span>
  
</Link>

  )}
<button
  className="logout-btn"
  onClick={handleLogout}
>
  Logout
</button>
</div>
    </nav>
  )
}

export default Navbar