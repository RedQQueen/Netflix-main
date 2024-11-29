const User = require("../models/UserModels");

module.exports.addToLikedMedia = async (req, res) => {
  try {
    const { email, mediaId, mediaType } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const mediaAlreadyLiked = user.likedMedia.find(
        (item) => item.mediaId === mediaId
      );
      if (!mediaAlreadyLiked) {
        user.likedMedia.push({ mediaId, mediaType });
        await user.save();
        return res.json({ msg: "Movie added successfully!" });
      } else {
        return res.json({ msg: "Movie is already in the liked list!" });
      }
    } else {
      await User.create({ email, likedMedia: [{ mediaId, mediaType }] });
      return res.json({ msg: "Movie added and user created successfully!" });
    }
  } catch (error) {
    console.error("Error adding movie:", error); // Log full error
    return res
      .status(500)
      .json({ msg: "Error adding movie", error: error.message });
  }
};

module.exports.getUserLikedMedia = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        msg: "Liked media fetched successfully",
        media: user.likedMedia.map((item) => [item.mediaId, item.mediaType]),
      });
    } else {
      return res.status(404).json({ msg: "User with given email not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error fetching liked media", error: error.message });
  }
};

module.exports.removeFromLikedMedia = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ msg: "User not found" });

    const mediaIndex = user.likedMedia.findIndex(
      (media) => media.movieId === movieId // Adjust to check for movieId
    );

    if (mediaIndex === -1) {
      return res.status(400).json({ msg: "Media not found in liked list" });
    }

    user.likedMedia.splice(mediaIndex, 1);
    await user.save();

    return res.json({
      msg: "Media removed successfully",
      media: user.likedMedia,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error removing media", error: error.message });
  }
};

// Family Shared Media That User Wants To Watch
module.exports.addToFamilyWantToWatch = async (req, res) => {
  try {
    const { email, mediaId, mediaType } = req.body;
    const user = await User.findOne({ email });
    const username = user.username;

    if (user) {
      const mediaAlreadyShared = user.wantToWatch.find(
        (item) => item.mediaId === mediaId
      );
      if (!mediaAlreadyShared) {
        user.wantToWatch.push({ mediaId, mediaType, markedBy: username });
        await user.save();
        return res.json({ msg: "Media added successfully!" });
      } else {
        return res.json({ msg: "Media is already in the shared list!" });
      }
    } else {
      await User.create({
        email,
        wantToWatch: [{ mediaId, mediaType, username }],
      });
      return res.json({ msg: "Media added and user created successfully!" });
    }
  } catch (error) {
    console.error("Error adding media for family shared list", error); // Log full error
    return res.status(500).json({
      msg: "Error adding media for family shared list",
      error: error.message,
    });
  }
};

module.exports.getUserSharedMedia = async (req, res) => {
  try {
    const users = await User.find({}, "username wantToWatch");

    const response = users.map((user) => ({
      username: user.username,
      media: user.wantToWatch.map((item) => ({
        mediaId: item.mediaId,
        mediaType: item.mediaType,
        markedBy: item.markedBy,
      })),
    }));

    return res.json({
      msg: "Want-to-watch media fetched successfully",
      media: response,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error fetching media", error: error.message });
  }
};

// module.exports.removeFromWantToWatch = async (req, res) => {
//   try {
//     console.log("Request body:", req.body);
//     const { email, mediaId } = req.body;
//     console.log("Received email:", email, "and mediaId:", mediaId); // Log email and mediaId

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     // Log wantToWatch array for debugging
//     console.log("User's wantToWatch list:", user.wantToWatch);

//     // Find the item in the wantToWatch array
//     const mediaIndex = user.wantToWatch.findIndex(
//       (media) => media.mediaId === mediaId
//     );

//     if (mediaIndex === -1) {
//       console.log("Media not found in wantToWatch list with mediaId:", mediaId);
//       return res
//         .status(400)
//         .json({ msg: "Media not found in wantToWatch list" });
//     }

//     // Remove the media item at the found index
//     user.wantToWatch.splice(mediaIndex, 1);
//     await user.save();

//     console.log("Updated wantToWatch list:", user.wantToWatch);
//     return res.json({
//       msg: "Media removed successfully from wantToWatch list",
//       media: user.wantToWatch,
//     });
//   } catch (error) {
//     console.error("Error removing media from wantToWatch list:", error);
//     return res
//       .status(500)
//       .json({ msg: "Error removing media", error: error.message });
//   }
// };

module.exports.removeFromWantToWatch = async (req, res) => {
  try {
    const { email, mediaId } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Filter out the media item by ID
    user.wantToWatch = user.wantToWatch.filter(
      (media) => media.mediaId !== mediaId
    );
    await user.save();

    // Return only basic media data and username without mediaDetails
    return res.json({
      msg: "Media removed successfully from wantToWatch list",
      wantToWatch: {
        username: user.username,
        media: user.wantToWatch, // Array of media without details
      },
    });
  } catch (error) {
    console.error("Error in removeFromWantToWatch:", error);
    return res
      .status(500)
      .json({ msg: "Error removing media", error: error.message });
  }
};

//create a username
module.exports.createUser = async (req, res) => {
  console.log(req.body);
  let { email, username } = req.body;

  // Check if email and username are provided
  if (!email || !username) {
    return res.status(400).json({ msg: "Email and username are required" });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ msg: "User already exists with this email" });
    }

    // Create a new user instance
    const newUser = new User({ email, username });

    // Save the user to the database
    await newUser.save();

    // Send a response back
    res.status(201).json({ msg: "User created successfully", user: newUser });
  } catch (error) {
    // Error handling
    res.status(500).json({ msg: "Error creating user", error: error.message });
  }
};
