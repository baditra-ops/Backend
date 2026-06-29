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
  const [playlists, setPlaylists] = useState([])
  const [showPlaylistModal, setShowPlaylistModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [editingComment, setEditingComment] = useState(null)
  const [editedContent, setEditedContent] = useState("")
  
  useEffect(() => {
  fetchCurrentUser()
  fetchVideo()
  fetchComments()
}, [id])

const fetchCurrentUser = async () => {
  try {

    const res =
      await api.get("/users/current-user")

    setCurrentUser(res.data.data)

  } catch (error) {
    console.log(error)
  }
}

const fetchVideo = async () => {
  try {

    const res = await api.get(`/videos/${id}`)

    setVideo(res.data.data)

    const channelRes = await api.get(
      `/users/c/${res.data.data.owner.username}`
    )

    setSubscribed(channelRes.data.data.isSubscribed)

    const likedRes = await api.get("/likes/videos")

    const isLiked = likedRes.data.data.some(
      (item) => item.video._id === id
    )

    setLiked(isLiked)

  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}
  const handleLike = async () => {
  try {
    await api.post(`/likes/toggle/v/${id}`)

    const likedRes = await api.get("/likes/videos")

    const isLiked = likedRes.data.data.some(
    (item) => item.video._id === id
)
    setLiked(isLiked)
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
const deleteComment = async (commentId) => {

  try {

    await api.delete(
      `/comments/c/${commentId}`
    )

    fetchComments()

  } catch (error) {
    console.log(error)
  }

}
const updateComment = async (
  commentId
) => {

  try {

    await api.patch(
      `/comments/c/${commentId}`,
      {
        content: editedContent
      }
    )

    setEditingComment(null)

    fetchComments()

  } catch (error) {
    console.log(error)
  }

}
const fetchUserPlaylists = async () => {
  try {

    const userRes =
      await api.get("/users/current-user")

    const userId =
      userRes.data.data._id

    const res =
      await api.get(
        `/playlist/user/${userId}`
      )

    setPlaylists(res.data.data)

  } catch (error) {
    console.log(error)
  }
}
const addToPlaylist = async (
  playlistId
) => {
  try {

    await api.patch(
      `/playlist/add/${id}/${playlistId}`
    )

    alert("Added to playlist")

    setShowPlaylistModal(false)

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
  <button
  className="playlist-btn"
  onClick={() => {
    fetchUserPlaylists()
    setShowPlaylistModal(true)
  }}
>
  ➕ Save
</button>

</div>

      <div className="video-infos">

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

    <div className="comment-top">

      <div className="comment-user">

        <img
          src={comment.owner?.avatar}
          alt=""
          className="comment-avatar"
        />

        <div>

          <h4>
            {comment.owner?.username}
          </h4>

          {editingComment === comment._id ? (

            <textarea
              value={editedContent}
              onChange={(e) =>
                setEditedContent(e.target.value)
              }
              className="edit-comment-input"
            />

          ) : (

            <p>{comment.content}</p>

          )}

        </div>

      </div>

      {currentUser?._id === comment.owner?._id && (

        <div className="comment-actions">

          {editingComment === comment._id ? (

            <>
              <button
                className="save-comment-btn"
                onClick={() =>
                  updateComment(comment._id)
                }
              >
                Save
              </button>

              <button
                className="cancel-comment-btn"
                onClick={() =>
                  setEditingComment(null)
                }
              >
                Cancel
              </button>
            </>

          ) : (

            <>
              <button
                className="edit-comment-btn"
                onClick={() => {

                  setEditingComment(comment._id)

                  setEditedContent(
                    comment.content
                  )

                }}
              >
                Edit✏️
              </button>

              <button
                className="delete-comment-btn"
                onClick={() =>
                  deleteComment(comment._id)
                }
              >
               Delete🗑️
              </button>
            </>

          )}

        </div>

      )}

    </div>

  </div>

))}

  </div>

</div>

    </div>
   {showPlaylistModal && (
  <div className="playlist-modal">

    <div className="playlist-modal-card">

      <h2>Save To Playlist</h2>

      {playlists.length === 0 ? (
        <p>No playlists found</p>
      ) : (
        playlists.map((playlist) => (
          <button
            key={playlist._id}
            className="playlist-option"
            onClick={() =>
              addToPlaylist(playlist._id)
            }
          >
            {playlist.name}
          </button>
        ))
      )}

      <button
        className="close-modal-btn"
        onClick={() =>
          setShowPlaylistModal(false)
        }
      >
        Close
      </button>

    </div>

  </div>
)}
  </div>
)
}

export default VideoPlayer