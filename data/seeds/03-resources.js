exports.seed = async knex => {
  await knex("resources").insert([
    {
      name: "vs code",
      description: "coding editor"
    },
    {
      name: "node",
      description: "for our backend"
    },
    {
      name: "React",
      description: "for the frontend"
    }
  ]);
};
