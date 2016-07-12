exports.seed = function(knex, Promise) {
  return knex('genre').del()
    .then(function () {
      return Promise.all([
        knex('genre').insert({name: 'Python'}),
        knex('genre').insert({name: 'Javascript'}),
      ]);
    });
};
