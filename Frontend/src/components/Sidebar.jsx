import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className="sidebar">

      <Link to="/">🏠 Home</Link>

      <Link to="/upload">
        ⬆ Upload
      </Link>

    </div>
  )
}

export default Sidebar