import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"

function History() {

  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {

    try {

      const res = await api.get(
        "/users/history"
      )

      setHistory(res.data.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  if (loading) {
    return (
      <div className="history-loading">
        Loading...
      </div>
    )
  }

  return (

    <div className="history-page">

      <h1 className="history-title">
        Watch History
      </h1>

      {history.length === 0 ? (

        <div className="empty-history">

          <h2>
            No watch history
          </h2>

          <p>
            Videos you watch will appear here.
          </p>

        </div>

      ) : (

        <div className="history-list">

          {history.map((video) => (

            <Link
              key={video._id}
              to={`/video/${video._id}`}
              className="history-link"
            >

              <div className="history-card">

                <img
                  src={video.thumbnail}
                  alt=""
                  className="history-thumbnail"
                />

                <div className="history-details">

                  <h2>
                    {video.title}
                  </h2>

                  <div className="history-channel">

                    <img
                      src={video.owner.avatar}
                      alt=""
                      className="history-avatar"
                    />

                    <span>
                      {video.owner.username}
                    </span>

                  </div>

                  <p>
                    {video.views} views
                  </p>

                  <p className="history-description">
                    {video.description}
                  </p>

                </div>

              </div>

            </Link>

          ))}

        </div>

      )}

    </div>

  )

}

export default History