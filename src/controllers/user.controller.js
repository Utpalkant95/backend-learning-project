import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { UserSchema } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import ApiResponse from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, fullName, password } = req.body;
  console.log(email);

  if (
    [userName, email, fullName, password].some((field) => {
      return field.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields are required");
  }

  UserSchema.findOne({ $or: [{ email }, { userName }] }).then((user) => {
    if (user) {
      throw new ApiError(409, "User already exists");
    }
  });

  const avatarLocalPath = req.body?.files?.avatar[0]?.path;
  const coverImageLocalPath = req.body?.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  console.log("avatar", avatar);
  if (!avatar) {
    throw new ApiError(400, "Failed to upload image");
  }

  console.log(avatarLocalPath, "avatarLocalPath");

  const user = await UserSchema.create({
    userName,
    email,
    fullName,
    password,
    avatar : "hello"
  });

  const createdUser  = await user.findById(user._id).select("-password -refreshToken -avatar -coverImage")

  if(!createdUser) {
    throw new ApiError(500, "Failed to create user")
  }


  return res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"));

});

export default registerUser;
