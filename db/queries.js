var knex = require('./knex');

module.exports = {
  listBooksWithGenres: function(){
    return knex('book').select('book.id as book_id', 'book.*', 'genre.*').join('genre', 'genre.id', 'genre_id').returning('genre.name')
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
    });
  },
  getBookById: function(bookId){
    return knex('book').select('book.id as book_id', 'book.*', 'genre.*').join('genre', 'genre.id', 'genre_id').where({'book.id':bookId})
  },
  deleteBook: function(bookId){
    return knex('book').where({id: bookId}).del()
  },
  editBook: function(bookUpdate, bookId){
    return knex('book').where({id:bookId}).update({
      title: bookUpdate.title,
      description: bookUpdate.description,
      cover_url: bookUpdate.cover_url
    });
  },
  editBookAddGenre: function(newBook, bookId){
    console.log(newBook);
    knex('genre').select().where({'name': newBook.genre}).first()
        .then(function(genre){
          // console.log(genre);
          if(genre){
            return [genre]
          }else{
            return knex('genre').insert({name: newBook.genre}).returning('*')
          }
        })
        .then(function(newGenre){
          console.log(newGenre);
          var book = {
            title: newBook.title,
            genre_id: newGenre[0].id,
            description: newBook.description,
            cover_url: newBook.cover_url
          }
          return knex('book').where({id:bookId}).update(book)
        })//not working yet, adds new genre, but doesn't update book
  },

  listAuthors: function(){
    return knex('author')
  }
}
