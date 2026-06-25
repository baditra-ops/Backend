import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"

function VideoCard({ video }) {
  return (
    <Link
      to={`/video/${video._id}`}
      className="video-card-link"
    >
      <div className="video-card">

        <img
          className="video-thumbnail"
          src={video.thumbnail}
          alt={video.title}
        />

        <div className="video-info">

          <img
            src={video.owner?.avatar}
            alt=""
            className="channel-avatar"
          />

          <div className="video-details">

            <h3 className="video-title">
              {video.title}
            </h3>

            <p className="channel-name">
              {video.owner?.username}
            </p>

            <p className="video-stats">
              {video.views} views •{" "}
             {formatDistanceToNow(
               new Date(video.createdAt),
               { addSuffix: true }
              )}
            </p>

          </div>

        </div>

      </div>
    </Link>
  )
}

export default VideoCard