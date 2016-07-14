exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE genre RESTART IDENTITY CASCADE')
    .then(function () {
      return Promise.all([
        knex('genre').insert({name: 'Python'}),
        knex('genre').insert({name: 'JavaScript'}),
        knex('genre').insert({name: 'Ruby'}),
        knex('genre').insert({name: 'Java'}),
        knex('genre').insert({name: 'C#'}),
        knex('genre').insert({name: 'Ember'}),
        knex('genre').insert({name: 'HTML & CSS'}),
        knex('genre').insert({name: 'Angular'})
      ]);
    });
};
