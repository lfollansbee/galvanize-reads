var knex = require('./knex');

module.exports = {
  Books:{
    listBooks: function(){
      return knex('book')
        .select('book.*', 'genre.name as name')
        .join('genre', 'genre.id', 'genre_id')
    },
    getAuthorsByBookId: function(bookId){
      return knex('author')
        .select('author.first_name', 'author.last_name', 'author.id as author_id')
        .innerJoin('author_book', 'author.id', 'author_book.author_id')
        .where({'author_book.book_id': bookId});
    },

  listBooksWithAuthors: function() {
  		return this.listBooks()
  			.then((returnedBooks) => {
  				return returnedBooks.map((book) => {
  					return this.getAuthorsByBookId(book.id)
  						.then(function(authors) {
                book.authors = authors;
                return book;
  						});
  				});
  			}
      );
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
      return knex('book').select('book.id', 'book.*', 'genre.name').join('genre', 'genre.id', 'genre_id').where({'book.id':bookId}).first()
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
    }
  },

  Authors:{
    listAuthors: function(){
      return knex('author')
    },
    addAuthor: function(newAuthor){
      return knex('author').insert({
        first_name: newAuthor.first_name,
        last_name: newAuthor.last_name,
        bio: newAuthor.bio,
        portrait_url: newAuthor.portrait_url
      });
    },
    getAuthorById: function(authorId){
      return knex('author').select().where({id:authorId})
    },
    deleteAuthor: function(authorId){
      return knex('author').where({id: authorId}).del()
    },
    editAuthor: function(authorUpdate, authorId){
      return knex('author').where({id:authorId}).update({
        first_name: authorUpdate.first_name,
        last_name: authorUpdate.last_name,
        portrait_url: authorUpdate.portrait_url,
        bio: authorUpdate.bio
      });
    }
  }
};
