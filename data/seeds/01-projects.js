exports.seed = async knex => {
  await knex("projects").insert([
    {
      name: "Angular Project",
      description: "FE",
      completed_project: true
    },
    { name: "BackE", description: "make a DB", completed_project: true },

    { name: "SCSS", description: "make a design", completed_project: false }
  ]);
};
