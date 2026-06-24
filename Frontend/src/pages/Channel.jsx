import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../services/api"
import { Link } from "react-router-dom"

function Channel() {

  const { id } = useParams()
  const [videos, setVideos] = useState([])
  const [channel, setChannel] = useState(null)

  useEffect(() => {
    fetchChannel()
  }, [id])
    const fetchVideos = async (userId) => {
  try {

    const res = await api.get(
      `/videos?userId=${userId}`
    )

    setVideos(
      res.data.data.docs || []
    )

  } catch (error) {
    console.log(error)
  }
}

  const fetchChannel = async () => {
  try {

    const res = await api.get(
      `/users/c/${id}`
    )

    setChannel(res.data.data)

    fetchVideos(res.data.data._id)

  } catch (error) {
    console.log(error)
  }
}

  if (!channel) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="channel-page">

      <div className="channel-header">

        <img
          src={channel.avatar}
          alt=""
          className="channel-avatar-large"
        />

        <div>

          <h1>
            {channel.fullName}
          </h1>

          <h3>
            @{channel.username}
          </h3>

          <p>
            {channel.subscribersCount} Subscribers
          </p>

          <p>
            {channel.channelsSubscribedToCount}
            {" "}
            Subscriptions
          </p>
          <button className="subscribe-btn">
  {channel.isSubscribed
    ? "Subscribed"
    : "Subscribe"}
</button>

        </div>

      </div>
      <h2 className="channel-videos-title">
  Uploaded Videos
</h2>

<div className="channel-videos">

  {videos.map((video) => (

   <Link
  to={`/video/${video._id}`}
  className="video-link"
>
  <div className="channel-video-card">

    <img
      src={video.thumbnail}
      alt={video.title}
    />

    <h3>{video.title}</h3>

    <p>{video.views} views</p>

  </div>
</Link>

  ))}

</div>

    </div>
  )
}

export default Channel