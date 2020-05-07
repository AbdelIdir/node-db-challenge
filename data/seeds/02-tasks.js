exports.seed = async knex => {
  await knex("tasks").insert([
    {
      description: "make sure the dependencies are installed",
      completed_task: false,
      notes: "this will be quick work",
      project_id: 2
    },
    {
      description: "make sure the tables are created",
      completed_task: true,
      notes: "this should not take too long",
      project_id: 1
    },
    {
      description: "make the seeds",
      completed_task: true,
      notes: "should be quick too",
      project_id: 3
    }
  ]);
};
