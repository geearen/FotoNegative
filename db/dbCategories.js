const { Categories } = require("../models");

const seed = async () => {
  try {
    const deletedCategories = await Categories.deleteMany();
    const createdCategories = await Categories.insertMany([
      {
        category:  "DSLR",
          index: 0,
      },
      {
        category: "SLR",
          index: 1,
      },
      {
        category:"ZLR",
          index: 2,
      },
      {
        category:  "Twinlens Reflex",
          index: 3,
      },
      {
        category:  "Mirrorless",
          index: 4,
      },
      {
        category: "Medium Format",
          index: 5,
      },
      {
        category: "Point and Shoot",
          index: 6,
      },
      {
        category: "Full Frame",
          index: 7,
      },
      {
        category: "Disposable",
          index: 8,
      },
      {
        category: "Smartphone",
          index: 9,
      },
      {
        category: "Polaroid and Instant",
          index: 10,
      },
      {
        category: "Rangefinder",
          index: 11,
      },
      {
        category: "Large Format",
          index: 12,
      },
      {
        category: "Other",
          index: 13,
      },
    ]);
    console.log(createdCategories);
    console.log("===== Seed Complete =====");
  } catch (error) {
    console.log(error);
  }
};

seed();
