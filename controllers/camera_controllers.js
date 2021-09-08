const express = require('express');
const router = express.Router();



/* Index Route */
router.get("/", function(req, res){
  res.send("Index Page");
});

/* New Route */
router.post("/new", function(req, res){
  res.send("New Page");
});

/* Show Page */
router.get("/:id", function(req, res){
  res.send("Create Camera page")
});

/* Edit Page */
router.get("/:id/edit", function(req, res){
  res.send("Edit Camera page");
})

/* Update Page */
router.put("/:id", function(req, res){
  res.send("Updated Camera")
})

/* Delete Page */
router.delete("/:id", function(req, res){
  res.send("Deleted Camera");
});

module.exports = router;