import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {

    const channelId = req.user._id

    const totalVideos = await Video.countDocuments({
        owner: channelId
    })

    const totalSubscribers =
        await Subscription.countDocuments({
            channel: channelId
        })

    const channelVideos = await Video.find(
        {
            owner: channelId
        }
    ).select("_id views")

    const totalViews = channelVideos.reduce(
        (acc, video) => acc + video.views,
        0
    )

    const videoIds = channelVideos.map(
        (video) => video._id
    )

    const totalLikes =
        await Like.countDocuments({
            video: {
                $in: videoIds
            }
        })

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalVideos,
                totalSubscribers,
                totalViews,
                totalLikes
            },
            "Channel stats fetched successfully"
        )
    )
})


const getChannelVideos = asyncHandler(async (req, res) => {

    const videos = await Video.find({
        owner: req.user._id
    })
        .sort({
            createdAt: -1
        })
        .populate(
            "owner",
            "username fullName avatar"
        )

    return res.status(200).json(
        new ApiResponse(
            200,
            videos,
            "Channel videos fetched successfully"
        )
    )
})

export {
    getChannelStats, 
    getChannelVideos
    }