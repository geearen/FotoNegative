const { Comment } = require("../models");

const seed = async () => {
  try {
    const deletedComment = await Comment.deleteMany();
    const createdComment = await Comment.insertMany([
      {
        content: "Testing Comments",
        commentImages:
          "https://i.pinimg.com/originals/e6/c5/11/e6c511d755e8a798ac1feb9919e802b2.jpg",
        user: "613bcb0fab528f7ec08a63b1",
        camera: "613bb3e8d0f83f1c8eb02a33",
      },
      {
        content: "Testing Comments 2",
        commentImages:
          "https://photographylife.com/wp-content/uploads/2012/11/A-Very-Personal-Mamiya-RZ67-Pro-Review.jpg",
        user: "613bcb0fab528f7ec08a63b1",
        camera: "613bb3e8d0f83f1c8eb02a33",
      },
    ]);
    console.log(createdComment);
    console.log("===== Seed Complete =====")
  } catch (error) {
    console.log(error);
  }
};

seed();
