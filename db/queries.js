var knex = require('./knex');

module.exports = {
  listBooksWithGenres: function(){
    return knex('book').select().join('genre', 'genre.id', 'genre_id').returning('genre.name')
  },
  getGenres: function(){
    return knex('genre').select()
  },
  addBook: function(newBook){
  return knex('book').insert({
    title: newBook.title,
    genre_id: newBook.genre_id,
    description: newBook.description,
    cover_url: newBook.cover_url
  })
},
}
