import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../services/api"

function VideoPlayer() {
  const { id } = useParams()

  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVideo()
  }, [id])

  const fetchVideo = async () => {
    try {
      const res = await api.get(`/videos/${id}`)

      setVideo(res.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="player-loading">
        Loading...
      </div>
    )
  }

  if (!video) {
    return (
      <div className="player-loading">
        Video not found
      </div>
    )
  }

  return (
    <div className="player-page">

      <div className="player-container">

        <video
          className="video-player"
          controls
          src={video.videoFile}
        />

        <h1 className="video-title">
          {video.title}
        </h1>

        <div className="video-meta">
          <span>{video.views} views</span>
        </div>

        <p className="video-description">
          {video.description}
        </p>

      </div>

    </div>
  )
}

export default VideoPlayer