import { useEffect, useState } from "react"
import api from "../services/api"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import VideoCard from "../components/VideoCard"

function Home() {

  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {

    const res = await api.get("/videos")

    setVideos(res.data.data.docs)
  }

  return (
    <>
      <Navbar />

      <Sidebar />

    <div className="video-grid">
      {videos.map((video) => (
      <VideoCard
      key={video._id}
      video={video}
       />
       ))}
     </div>
    </>
  )
}

export default Home