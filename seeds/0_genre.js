exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE genre RESTART IDENTITY CASCADE')
    .then(function () {
      return Promise.all([
        knex('genre').insert({name: 'Python'}),
        knex('genre').insert({name: 'Javascript'})
      ]);
    });
};
