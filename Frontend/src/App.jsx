import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UploadVideo from "./pages/UploadVideo"
import VideoPlayer from "./pages/VideoPlayer"
import Channel from "./pages/Channel"

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

      </Routes>
    </BrowserRouter>
  )
}

export default App