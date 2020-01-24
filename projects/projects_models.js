const db = require("../data/db_Config");

async function find(query = {}) {
  const { limit = 10, sortby = "id", sortdir = "asc" } = query;

  let rows = await db("projects")
    .orderBy(sortby, sortdir)
    .limit(limit);

  return rows;
}

function findTasks(projectId) {
  return db("tasks")
    .select(
      "tasks.id",
      "projects.name",
      "tasks.description",
      "tasks.notes",
      "tasks.completed_task"
    )
    .join("projects", "projects.id", "tasks.project_id")
    .where("project_id", projectId);
}

function findById(id) {
  return db
    .select("*")
    .from("projects")
    .where({ id })
    .first();
}

function addTask(task) {
  return db("tasks")
    .insert(task)
    .then(ids => ({ id: ids[0] }));
}

function addProject(project) {
  return db("projects")
    .insert(project)
    .then(ids => ({ id: ids[0] }));
}

function addResource(resource) {
  return db("resources")
    .insert(resource)
    .then(ids => ({ id: ids[0] }));
}

async function findResources(query = {}) {
  const { limit = 10, sortby = "id", sortdir = "asc" } = query;

  let rows = await db("resources")
    .orderBy(sortby, sortdir)
    .limit(limit);

  return rows;
}

module.exports = {
  find,
  findTasks,
  findById,
  addTask,
  addProject,
  addResource,
  findResources
};
