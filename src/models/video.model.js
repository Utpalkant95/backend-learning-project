import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videSchema = new Schema({
    videoFile : {
        typeof: String,
        required: [true, "Video file is required"]
    },
    thumbnail : {
        typeof: String,
        required: [true, "Thumbnail is required"]
    },
    title : {
        type : String,
        required: [true, "Title is required"]
    },
    description : {
        type : String,
        required: [true, "Description is required"]
    },
    duration : {
        type : Number,
        required: [true, "Duration is required"]
    },
    views : {
        type : Number,
        default : 0,
    },
    isPublisted : {
        type : Boolean,
        default : true
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "UserSchema",
    }
}, {timeseries: true});

videSchema.plugin(mongooseAggregatePaginate)

export const VideoSchema = mongoose.model("VideoSchema", videSchema)