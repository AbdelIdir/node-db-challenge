exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();

      tbl
        .string("name", 255)
        .notNullable()
        .unique();
      tbl.string("description", 255);
      tbl
        .boolean("completed_project")
        .notNullable()
        .defaultTo(false);
    })
    .createTable("tasks", tbl => {
      tbl.increments();
      tbl.string("description", 255).notNullable();
      tbl.string("notes");
      tbl
        .boolean("completed_task")
        .notNullable()
        .defaultTo(false);

      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("projects_resources", tbl => {
      tbl.increments();
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");

      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("resources", tbl => {
      tbl.increments();
      tbl
        .string("name", 255)
        .notNullable()
        .unique();

      tbl.string("description", 255);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("resources")
    .dropTableIfExists("projects_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("projects");
};
