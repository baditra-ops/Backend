import { useEffect, useState } from "react"
import api from "../services/api"

function ProfileSettings() {

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")

  const [avatar, setAvatar] = useState(null)
  const [coverImage, setCoverImage] = useState(null)

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {

      const res =
        await api.get(
          "/users/current-user"
        )

      setUser(res.data.data)

      setFullName(
        res.data.data.fullName
      )

      setEmail(
        res.data.data.email
      )

    } catch (error) {
      console.log(error)
    }
  }

  const updateAccount = async () => {
    try {

      await api.patch(
        "/users/update-account",
        {
          fullName,
          email
        }
      )

      alert("Profile Updated")

    } catch (error) {
      console.log(error)
    }
  }

  const updateAvatar = async () => {

    if (!avatar) return

    try {

      const formData =
        new FormData()

      formData.append(
        "avatar",
        avatar
      )

      await api.patch(
        "/users/avatar",
        formData
      )

      alert(
        "Avatar Updated"
      )

      fetchUser()

    } catch (error) {
      console.log(error)
    }
  }

  const updateCoverImage = async () => {

    if (!coverImage) return

    try {

      const formData =
        new FormData()

      formData.append(
        "coverImage",
        coverImage
      )

      await api.patch(
        "/users/cover-image",
        formData
      )

      alert(
        "Cover Updated"
      )

      fetchUser()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="settings-page">

      <div className="settings-card">

        <h1>
          Profile Settings
        </h1>

        <div className="profile-preview">

          <img
            src={user?.avatar}
            alt=""
            className="settings-avatar"
          />

          {user?.coverImage && (

            <img
              src={user.coverImage}
              alt=""
              className="settings-cover"
            />

          )}

        </div>

        <input
          value={fullName}
          onChange={(e) =>
            setFullName(
              e.target.value
            )
          }
          placeholder="Full Name"
        />

        <input
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          placeholder="Email"
        />

        <button
          onClick={updateAccount}
        >
          Save Changes
        </button>

        <div className="upload-section">

          <label>
            Change Avatar
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setAvatar(
                e.target.files[0]
              )
            }
          />

          <button
            onClick={updateAvatar}
          >
            Upload Avatar
          </button>

        </div>

        <div className="upload-section">

          <label>
            Change Cover Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setCoverImage(
                e.target.files[0]
              )
            }
          />

          <button
            onClick={
              updateCoverImage
            }
          >
            Upload Cover
          </button>

        </div>

      </div>

    </div>
  )
}

export default ProfileSettings