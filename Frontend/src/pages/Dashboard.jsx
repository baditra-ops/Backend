import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import "../styles/Dashboard.css"

function Dashboard() {

  const [stats, setStats] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {

    try {

      const [statsRes, videosRes] =
        await Promise.all([
          api.get("/dashboard/stats"),
          api.get("/dashboard/videos")
        ])

      setStats(statsRes.data.data)

      setVideos(videosRes.data.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  const deleteVideo = async (videoId) => {

    const confirmDelete =
      window.confirm(
        "Delete this video?"
      )

    if (!confirmDelete) return

    try {

      await api.delete(
        `/videos/${videoId}`
      )

      fetchDashboard()

    } catch (error) {

      console.log(error)

    }

  }

  const formatDate = (date) => {

    const seconds =
      Math.floor(
        (new Date() - new Date(date))
        / 1000
      )

    const intervals = [
      ["year",31536000],
      ["month",2592000],
      ["week",604800],
      ["day",86400],
      ["hour",3600],
      ["minute",60]
    ]

    for (let [label,value] of intervals){

      const amount =
        Math.floor(seconds/value)

      if(amount>=1){

        return `${amount} ${label}${amount>1?"s":""} ago`

      }

    }

    return "Just now"

  }

  if(loading){

    return (
      <>
        <Navbar/>
        <Sidebar/>

        <div className="dashboard-loading">

          Loading Dashboard...

        </div>
      </>
    )

  }

  return (

<>
<Navbar/>
<Sidebar/>

<div className="dashboard-page">

<h1 className="dashboard-title">

Creator Dashboard

</h1>


<div className="stats-grid">

<div className="stat-card">

<div className="stat-icon">
🎥
</div>

<h2>

{stats.totalVideos}

</h2>

<p>

Videos

</p>

</div>



<div className="stat-card">

<div className="stat-icon">
👁
</div>

<h2>

{stats.totalViews}

</h2>

<p>

Views

</p>

</div>



<div className="stat-card">

<div className="stat-icon">
👥
</div>

<h2>

{stats.totalSubscribers}

</h2>

<p>

Subscribers

</p>

</div>



<div className="stat-card">

<div className="stat-icon">
❤️
</div>

<h2>

{stats.totalLikes}

</h2>

<p>

Likes

</p>

</div>

</div>


<div className="videos-section">

<h2>

Uploaded Videos

</h2>

{videos.length===0 ?

(

<div className="empty-dashboard">

<h2>

📹

</h2>

<p>

You haven't uploaded any videos yet.

</p>

<Link
to="/upload"
className="upload-first-video"
>

Upload Video

</Link>

</div>

)

:

(

videos.map(video=>(

<div
key={video._id}
className="dashboard-video-card"
>

<Link
to={`/video/${video._id}`}
className="dashboard-video-link"
>

<img
src={video.thumbnail}
alt=""
className="dashboard-thumb"
/>

</Link>


<div className="dashboard-video-details">

<Link
to={`/video/${video._id}`}
className="dashboard-video-title"
>

{video.title}

</Link>

<p>

👁 {video.views} views

</p>

<p>

Uploaded {formatDate(video.createdAt)}

</p>

</div>


<div className="dashboard-actions">

<Link
to={`/video/${video._id}`}
className="view-btn"
>

View

</Link>

<Link
to={`/edit-video/${video._id}`}
className="edit-btn"
>

Edit

</Link>

<button
className="delete-btn"
onClick={()=>
deleteVideo(video._id)
}
>

Delete

</button>

</div>

</div>

))

)

}

</div>

</div>

</>

  )

}

export default Dashboard