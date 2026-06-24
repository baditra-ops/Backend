import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../services/api"
import { Link } from "react-router-dom"

function VideoPlayer() {
  const { id } = useParams()

  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    fetchVideo()
    fetchComments()
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
  const handleLike = async () => {
  try {
    await api.post(`/likes/toggle/v/${id}`)

    setLiked(!liked)
  } catch (error) {
    console.log(error)
  }
}

const handleSubscribe = async () => {
  try {
    await api.post(
      `/subscriptions/c/${video.owner._id}`
    )

    setSubscribed(!subscribed)
  } catch (error) {
    console.log(error)
  }
}

const fetchComments = async () => {
  try {
    const res = await api.get(`/comments/${id}`)

    setComments(res.data.data.docs || res.data.data)
  } catch (error) {
    console.log(error)
  }
}
const handleComment = async () => {
  try {

    await api.post(`/comments/${id}`, {
      content: newComment
    })

    setNewComment("")

    fetchComments()

  } catch (error) {
    console.log(error)
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

    <div className="player-main">

      <video
        className="video-player"
        controls
        src={video.videoFile}
      />

      <h1 className="video-title">
        {video.title}
      </h1>
      <div className="action-buttons">

  <button
    className="like-btn"
    onClick={handleLike}
  >
    {liked ? "❤️ Liked" : "👍 Like"}
  </button>

</div>

      <div className="video-info">

        <div className="channel-info">

          <img
            src={video.owner?.avatar}
            alt=""
            className="channel-avatar"
          />

          <div>
            <Link
  to={`/channel/${video.owner?.username}`}
  className="channel-link"
>
  {video.owner?.username}
</Link>
            <p>
  {video.owner?.fullName}
  • {video.views} views
</p>
          </div>

        </div>

        <button
  className="subscribe-btn"
  onClick={handleSubscribe}
>
  {subscribed
    ? "Subscribed"
    : "Subscribe"}
</button>

      </div>

      <div className="description-box">
        {video.description}
      </div>
      <div className="comments-section">

  <h2>Comments</h2>

  <div className="comment-form">

    <input
      type="text"
      placeholder="Write a comment..."
      value={newComment}
      onChange={(e) =>
        setNewComment(e.target.value)
      }
    />

    <button onClick={handleComment}>
      Comment
    </button>

  </div>

  <div className="comments-list">

    {comments.map((comment) => (

      <div
        key={comment._id}
        className="comment-card"
      >

        <h4>
          {comment.owner?.username || "User"}
        </h4>

        <p>
          {comment.content}
        </p>

      </div>

    ))}

  </div>

</div>

    </div>

  </div>
)
}

export default VideoPlayer