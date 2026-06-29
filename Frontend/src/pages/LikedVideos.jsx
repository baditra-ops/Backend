import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"

function LikedVideos() {

  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLikedVideos()
  }, [])

  const fetchLikedVideos = async () => {

    try {

      const res = await api.get("/likes/videos")

      setVideos(res.data.data)

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="liked-loading">
        Loading...
      </div>
    )
  }

  return (

    <div className="liked-page">

      <h1 className="liked-title">
        ❤️ Liked Videos
      </h1>

      <div className="liked-grid">

        {videos.map((item) => (

          <Link
            key={item.video._id}
            to={`/video/${item.video._id}`}
            className="video-link"
          >

            <div className="liked-card">

              <img
                src={item.video.thumbnail}
                alt=""
              />

              <div className="liked-info">

                <h3>
                  {item.video.title}
                </h3>

                <p>
                  {item.video.owner.username}
                </p>

                <span>
                  {item.video.views} views
                </span>

              </div>

            </div>

          </Link>

        ))}

      </div>

      {videos.length === 0 && (

        <div className="empty-liked">

          <h2>No liked videos yet.</h2>

          <p>
            Videos you like will appear here.
          </p>

        </div>

      )}

    </div>

  )
}

export default LikedVideos