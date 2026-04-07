exports.up = function (knex) {
  return knex.schema.createTable('hobiler', (table) => {
    table.increments('id');
    table.string('isim').notNullable();
    table.string('kategori').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('hobiler');
};
