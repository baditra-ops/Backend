import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body

    if (!name?.trim() || !description?.trim()) {
        throw new ApiError(
            400,
            "Name and description are required"
        )
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id
    })

    return res.status(201).json(
        new ApiResponse(
            201,
            playlist,
            "Playlist created successfully"
        )
    )
})


const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user id")
    }

    const playlists = await Playlist.find({
        owner: userId
    }).populate(
        "videos",
        "title thumbnail duration views"
    )

    return res.status(200).json(
        new ApiResponse(
            200,
            playlists,
            "Playlists fetched successfully"
        )
    )
})


const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist id")
    }

    const playlist = await Playlist.findById(
        playlistId
    )
        .populate(
            "videos",
            "title thumbnail duration views"
        )
        .populate(
            "owner",
            "username fullName avatar"
        )

    if (!playlist) {
        throw new ApiError(404, "Playlist not found")
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            playlist,
            "Playlist fetched successfully"
        )
    )
})


const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params

    if (
        !isValidObjectId(playlistId) ||
        !isValidObjectId(videoId)
    ) {
        throw new ApiError(400, "Invalid ids")
    }

    const playlist = await Playlist.findById(
        playlistId
    )

    if (!playlist) {
        throw new ApiError(404, "Playlist not found")
    }

    if (
        playlist.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You can modify only your playlists"
        )
    }

    await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $addToSet: {
                videos: videoId
            }
        },
        {
            new: true
        }
    )

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Video added to playlist successfully"
        )
    )
})


const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params

    if (
        !isValidObjectId(playlistId) ||
        !isValidObjectId(videoId)
    ) {
        throw new ApiError(400, "Invalid ids")
    }

    const playlist = await Playlist.findById(
        playlistId
    )

    if (!playlist) {
        throw new ApiError(404, "Playlist not found")
    }

    if (
        playlist.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You can modify only your playlists"
        )
    }

    await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull: {
                videos: videoId
            }
        }
    )

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Video removed from playlist successfully"
        )
    )
})


const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist id")
    }

    const playlist = await Playlist.findById(
        playlistId
    )

    if (!playlist) {
        throw new ApiError(404, "Playlist not found")
    }

    if (
        playlist.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You can delete only your playlists"
        )
    }

    await Playlist.findByIdAndDelete(
        playlistId
    )

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Playlist deleted successfully"
        )
    )
})


const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    const { name, description } = req.body

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlist id")
    }

    const playlist = await Playlist.findById(
        playlistId
    )

    if (!playlist) {
        throw new ApiError(404, "Playlist not found")
    }

    if (
        playlist.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You can update only your playlists"
        )
    }

    const updatedPlaylist =
        await Playlist.findByIdAndUpdate(
            playlistId,
            {
                $set: {
                    name: name || playlist.name,
                    description:
                        description ||
                        playlist.description
                }
            },
            {
                new: true
            }
        )

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedPlaylist,
            "Playlist updated successfully"
        )
    )
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}