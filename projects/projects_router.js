const express = require("express");

const Projects = require("./projects_models");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.find()
    .then(project => {
      // console.log(project);

      const proj = project.map(element => {
        if (element.completed_project === 1) {
          return { ...element, completed_project: "true" };
        } else {
          return { ...element, completed_project: "false" };
        }
      });
      res.json(proj);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get projects" });
    });
});

module.exports = router;
