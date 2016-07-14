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
  		});
    },
    getGenres: function(){
      return knex('genre').select()
    },
    getBookById: function(bookId){
      return knex('book').select('book.id', 'book.*', 'genre.name')
      .join('genre', 'genre.id', 'genre_id')
      .where({'book.id':bookId}).first()
    },
    deleteBook: function(bookId){
      return knex('book').where({id: bookId}).del()
    },
    editBook: function(bookUpdate, bookId){
      return knex('book').where({id:bookId})
      .update({
        title: bookUpdate.title,
        genre_id:bookUpdate.genre_id,
        description: bookUpdate.description,
        cover_url: bookUpdate.cover_url
      });
    },
    addAuthorToBook:function(bookId, authorId){
      knex('author_book').insert({
        book_id: bookId,
        author_id: authorId
      })
    }
  },

  Authors:{
    listAuthors: function(){
      return knex('author')
    },
    getBooksByAuthorId: function(authorId){
      return knex('book')
        .select('book.title', 'book.id as book_id')
        .innerJoin('author_book', 'book.id', 'author_book.book_id')
        .where({'author_book.author_id': authorId});
    },
    listAuthorsWithBooks: function() {
    	return this.listAuthors()
  			.then((returnedAuthors) => {
  				return returnedAuthors.map((author) => {
  					return this.getBooksByAuthorId(author.id)
  						.then(function(books) {
                author.books = books;
                return author;
  						});
  				});
  			});
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
      return knex('author').select()
      .where({id:authorId}).first()
    },
    deleteAuthor: function(authorId){
      return knex('author')
      .where({id: authorId}).del()
    },
    editAuthor: function(authorUpdate, authorId){
      return knex('author').where({id:authorId})
      .update({
        first_name: authorUpdate.first_name,
        last_name: authorUpdate.last_name,
        portrait_url: authorUpdate.portrait_url,
        bio: authorUpdate.bio
      });
    }
  },

  addBook: function(newBook){
    return knex('book').returning('id')
    .insert({
      title: newBook.title,
      genre_id: newBook.genre_id,
      description: newBook.description,
      cover_url: newBook.cover_url
    });
  },
  addAuthorFromBook: function(newAuthor){
    return knex('author').returning('id')
    .insert({
      first_name: newAuthor.first_name,
      last_name: newAuthor.last_name,
      bio: newAuthor.bio,
      portrait_url: newAuthor.portrait_url
    });
  },
    addToAuthorBook: function(newBookAuthor){
      return Promise.all([
        this.addBook(newBookAuthor),
        this.addAuthorFromBook(newBookAuthor)
      ]).then(function(ids){
        return knex('author_book').insert({
          author_id: ids[1][0],
          book_id: ids[0][0]
        })
      })
    }
};
