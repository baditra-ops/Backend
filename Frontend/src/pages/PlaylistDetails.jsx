import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import api from "../services/api"

function PlaylistDetails() {

  const { id } = useParams()

  const [playlist, setPlaylist] =
    useState(null)

  useEffect(() => {
    fetchPlaylist()
  }, [id])

  const fetchPlaylist = async () => {
    try {

      const res =
        await api.get(`/playlist/${id}`)

      setPlaylist(res.data.data)

    } catch (error) {
      console.log(error)
    }
  }

  if (!playlist) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="playlist-details-page">

      <h1>{playlist.name}</h1>

      <p>{playlist.description}</p>

      <div className="playlist-videos">

        {playlist.videos?.map((video) => (

          <Link
            key={video._id}
            to={`/video/${video._id}`}
            className="playlist-video-card"
          >

            <img
              src={video.thumbnail}
              alt={video.title}
            />

            <h3>{video.title}</h3>

            <p>{video.views} views</p>

          </Link>

        ))}

      </div>

    </div>
  )
}

export default PlaylistDetails