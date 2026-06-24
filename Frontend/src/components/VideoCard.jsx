import { Link } from "react-router-dom"

function VideoCard({ video }) {
  return (
    <Link to={`/video/${video._id}`}>

      <div className="video-card">

        <img
          src={video.thumbnail}
          alt={video.title}
          width="300"
        />

        <h3>{video.title}</h3>

        <p>{video.views} views</p>

      </div>

    </Link>
  )
}

export default VideoCard