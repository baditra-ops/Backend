import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/">
        <h2>VideoTube</h2>
      </Link>

      <div className="nav-links">
        <Link to="/upload">Upload</Link>
        <Link to="/login">Login</Link>
      </div>

    </nav>
  )
}

export default Navbar