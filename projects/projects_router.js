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

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Projects.findById(id)
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get projects" });
    });
});

router.get("/:id/tasks", (req, res) => {
  const { id } = req.params;

  Projects.findTasks(id)
    .then(Tasks => {
      if (Tasks.length) {
        const tas = Tasks.map(element => {
          if (element.completed_task === 1) {
            return { ...element, completed_task: "true" };
          } else {
            return { ...element, completed_task: "false" };
          }
        });
        res.json(tas);
      } else {
        res
          .status(404)
          .json({ message: "Could not find tasks for given project" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get tasks" });
    });
});

router.post("/:id/tasks", (req, res) => {
  const newTask = req.body;
  const { id } = req.params;

  if (
    !newTask.description ||
    !newTask.notes ||
    !newTask.project_id ||
    !req.body
  ) {
    res.status(400).json({
      message: "Please provide instructions ,notes and project id for this Task"
    });
    return;
  }

  Projects.find()
    .then(project => {
      if (project) {
        Projects.addTask(newTask, "id").then(Task => {
          res.status(201).json(Task);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new Task" });
    });
});

router.post("/", (req, res) => {
  const newProject = req.body;

  if (!newProject.name) {
    res.status(400).json({
      message: "Please provide a name for this project"
    });
    return;
  }

  Projects.addProject(newProject)
    .then(proj => {
      res.status(201).json(proj);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new scheme" });
    });
});

router.post("/:id/resources", (req, res) => {
  const newResource = req.body;

  if (!newResource.name) {
    res.status(400).json({
      message: "Please provide a name for this resource"
    });
    return;
  }

  Projects.addResource(newResource)
    .then(resou => {
      res.status(201).json(resou);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new resource" });
      console.log(err);
    });
});

router.get("/:id/resources", (req, res) => {
  const { id } = req.params;

  Projects.findResources(id)
    .then(resou => {
      if (resou.length) {
        res.status(200).json(resou);
      } else {
        res
          .status(404)
          .json({ message: "Could not find resources for given project" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get resources" });
    });
});

module.exports = router;
