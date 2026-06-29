import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../services/api"

function EditVideo() {

    const { id } = useParams()

    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [thumbnail, setThumbnail] = useState(null)

    const [currentThumbnail, setCurrentThumbnail] =
        useState("")

    useEffect(() => {

        fetchVideo()

    }, [])

    const fetchVideo = async () => {

        try {

            const res =
                await api.get(`/videos/${id}`)

            setTitle(res.data.data.title)

            setDescription(
                res.data.data.description
            )

            setCurrentThumbnail(
                res.data.data.thumbnail
            )

        }

        catch (err) {

            console.log(err)

        }

    }

    const handleUpdate = async () => {

        try {

            const formData = new FormData()

            formData.append("title", title)

            formData.append(
                "description",
                description
            )

            if (thumbnail) {

                formData.append(
                    "thumbnail",
                    thumbnail
                )

            }

            await api.patch(

                `/videos/${id}`,

                formData,

                {

                    headers: {

                        "Content-Type":
                            "multipart/form-data"

                    }

                }

            )

            alert("Video updated successfully!")

            navigate("/dashboard")

        }

        catch (err) {

            console.log(err)

        }

    }

    return (

        <div className="edit-video-page">

            <div className="edit-video-card">

                <h1>

                    Edit Video

                </h1>

                <img

                    src={currentThumbnail}

                    alt=""

                    className="edit-thumbnail"

                />

                <input

                    value={title}

                    onChange={(e) =>
                        setTitle(e.target.value)
                    }

                    placeholder="Video Title"

                />

                <textarea

                    value={description}

                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }

                    placeholder="Description"

                />

                <label>

                    Replace Thumbnail

                </label>

                <input

                    type="file"

                    accept="image/*"

                    onChange={(e) =>
                        setThumbnail(
                            e.target.files[0]
                        )
                    }

                />

                <button

                    onClick={handleUpdate}

                >

                    Save Changes

                </button>

            </div>

        </div>

    )

}

export default EditVideo