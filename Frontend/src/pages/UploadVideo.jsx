import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

function UploadVideo() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [videoFile, setVideoFile] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const formData = new FormData()

      formData.append("title", title)
      formData.append("description", description)
      formData.append("videoFile", videoFile)
      formData.append("thumbnail", thumbnail)

      await api.post("/videos", formData)

      alert("Video uploaded successfully")

      navigate("/")
    } catch (error) {
      console.log(error)
      alert("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="upload-page">

      <div className="upload-container">

        <h1>Upload Video</h1>

        <form onSubmit={handleUpload}>

          <input
            type="text"
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Video Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>
            Thumbnail
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setThumbnail(e.target.files[0])
            }
            required
          />

          <label>
            Video File
          </label>

          <input
            type="file"
            accept="video/*"
            onChange={(e) =>
              setVideoFile(e.target.files[0])
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

        </form>

      </div>

    </div>
  )
}

export default UploadVideo