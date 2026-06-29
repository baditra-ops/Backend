import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UploadVideo from "./pages/UploadVideo"
import VideoPlayer from "./pages/VideoPlayer"
import Channel from "./pages/Channel"
import Playlists from "./pages/Playlists"
import PlaylistDetails from "./pages/PlaylistDetails"
import ProfileSettings from "./pages/ProfileSettings"
import LikedVideos from "./pages/LikedVideos"
import History from "./pages/History"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/upload" element={<UploadVideo />} />

        <Route path="/video/:id" element={<VideoPlayer />} />

        <Route path="/channel/:id" element={<Channel />} />

        <Route path="playlist" element={<Playlists />} />
        <Route
         path="/playlist/:id"
          element={<PlaylistDetails />}
        />

        <Route
        path="/settings"
        element={<ProfileSettings />}
       />

       <Route
      path="/liked"
      element={<LikedVideos />}
      />

      <Route
     path="/history"
     element={<History />}
     />
     <Route
     path="/dashboard"
     element={<Dashboard/>}
     />

      </Routes>
    </BrowserRouter>
  )
}

export default App