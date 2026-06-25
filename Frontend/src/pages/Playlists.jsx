import { useEffect, useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"

function Playlists() {

  const [playlists, setPlaylists] = useState([])
  const [showModal, setShowModal] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    fetchPlaylists()
  }, [])

  const fetchPlaylists = async () => {
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

  const createPlaylist = async () => {
    try {

      await api.post("/playlist", {
        name,
        description
      })

      setName("")
      setDescription("")

      setShowModal(false)

      fetchPlaylists()

    } catch (error) {
      console.log(error)
    }
  }

  const deletePlaylist = async (
    playlistId
  ) => {
    try {

      await api.delete(
        `/playlist/${playlistId}`
      )

      fetchPlaylists()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="playlists-page">

      <div className="playlist-header">

        <h1>Your Playlists</h1>

        <button
          className="create-playlist-btn"
          onClick={() =>
            setShowModal(true)
          }
        >
          + New Playlist
        </button>

      </div>

      <div className="playlist-grid">

     {playlists.map((playlist) => (

  <Link
    key={playlist._id}
    to={`/playlist/${playlist._id}`}
    className="playlist-card-link"
  >

    <div className="playlist-card">

      <div className="playlist-thumbnail">

        <img
          src={
            playlist.videos?.[0]?.thumbnail ||
            "https://placehold.co/600x400"
          }
          alt=""
        />

        <div className="playlist-overlay">
          {playlist.videos?.length || 0} Videos
        </div>

      </div>

      <div className="playlist-info">

        <h3>{playlist.name}</h3>

        <p>{playlist.description}</p>

        <button
          className="delete-playlist-btn"
          onClick={(e) => {
            e.preventDefault() // prevents opening playlist when deleting
            deletePlaylist(playlist._id)
          }}
        >
          Delete
        </button>

      </div>

    </div>

  </Link>

))}
      </div>

      {showModal && (

        <div className="playlist-modal">

          <div className="playlist-modal-card">

            <h2>
              Create Playlist
            </h2>

            <input
              placeholder="Playlist Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
            />

            <div className="modal-actions">

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancel
              </button>

              <button
                onClick={
                  createPlaylist
                }
              >
                Create
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default Playlists