const {Camera} = require("../models");


Camera.deleteMany({}, (error, deletedCameras) =>{
  if(error){
    return console.log(error);
  }
  Camera.insertMany(
    [
      {
        cameraName: "Mamiya RZ67",
        brandName: "Mamiya",
        cameraImage: "https://fotocarerentals.com/images/thumbs/0002027_mamiya-rz67-pro-iid-camera-kit_550.jpeg",
        yearReleased: 1982,
        interchangeableLens: true,
        imageFormat: "Medium Format",
        categories:["Medium Format", "Modular", "120 Film", "6x7" ,"220 Film"],
        photographyType: "Film",
      },
    ],
    function(error, createdCamera){
      if(error){
        return console.log(error);
      }
      console.log("----- Camera Seed Complete------");
      console.log(createdCamera);

      process.exit();
    }
  )
})



// const seed = async() => {
//   try{
//     const deletedCamera = await Camera.deleteMany();
//     const createdCamera = await Camera.insertMany(
//       [
//         {
//           cameraName: "Mamiya RZ67",
//           brandName: "Mamiya",
//           cameraImage: "https://fotocarerentals.com/images/thumbs/0002027_mamiya-rz67-pro-iid-camera-kit_550.jpeg",
//           yearReleased: 1982,
//           interchangeableLens: true,
//           imageFormat: "Medium Format",
//           categories:["Medium Format", "Modular", "120 Film", "6x7" ,"220 Film"],
//           photographyType: "Film",
//         },
//       ]);
//       console.log(createdCamera);
//   } catch(error){
//     console.log(error);
//   }
// }

// seed();