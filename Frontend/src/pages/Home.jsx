import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import api from "../services/api"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import VideoCard from "../components/VideoCard"

function Home() {

  const [videos, setVideos] = useState([])
  const [searchParams] = useSearchParams()

const search =
  searchParams.get("search") || ""

  useEffect(() => {
  fetchVideos()
}, [search])

  const fetchVideos = async () => {

    const res = await api.get(
  `/videos?query=${search}`
)

    setVideos(res.data.data.docs)
  }

  return (
    <>
      <Navbar />

      <Sidebar />
      {search && (
  <h2 className="search-title">
    Search Results for "{search}"
  </h2>
)}

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