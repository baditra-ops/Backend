import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <aside className="sidebar">

      <Link to="/" className="sidebar-item">
        <span>🏠</span>
        <span>Home</span>
      </Link>

      <Link to="/upload" className="sidebar-item">
        <span>⬆️</span>
        <span>Upload</span>
      </Link>

      <div className="sidebar-divider"></div>

      <div className="sidebar-section">
        <h4>You</h4>
      </div>

      <Link to="/history" className="sidebar-item">
        <span>🕒</span>
        <span>History</span>
      </Link>

      <Link to="/playlist" className="sidebar-item">
        <span>📁</span>
        <span>Playlists</span>
      </Link>

      <Link to="/liked" className="sidebar-item">
        <span>👍</span>
        <span>Liked Videos</span>
      </Link>

      <Link to="/dashboard" className="sidebar-item">
      <span>📊</span>
      <span>Dashboard</span>
      </Link>

      <Link to="/settings" className="sidebar-item">
        <span>⚙️</span>
        <span>Settings</span>
      </Link>

    </aside>
  )
}

export default Sidebar