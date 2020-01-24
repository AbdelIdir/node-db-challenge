exports.seed = async knex => {
  await knex("projects_resources").insert([
    {
      project_id: 1,
      resource_id: 2
    },
    {
      project_id: 2,
      resource_id: 3
    },
    {
      project_id: 1,
      resource_id: 2
    },
    {
      project_id: 3,
      resource_id: 4
    }
  ]);
};
