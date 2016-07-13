function findAuthorId(authors, url){
  for (var i=0; i< authors.length; i++){
    var author = authors[i];
    if (url === author.portrait_url) {
      return author.id
    };
  };
};

function findBookId(books, title) {
  for (var i=0; i< books.length; i++){
    var book = books[i];
    if (title === book.title) {
      return book.id
    }
  }
}

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE author_book RESTART IDENTITY CASCADE')
    .then(function () {
      return Promise.all([
        knex('author').select(),
        knex('book').select()
      ])
      .then(function(data){
        var authors = data[0]
        var books = data[1]
        return Promise.all([
          knex('author_book').insert({
            author_id: findAuthorId(authors, 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/alex_martelli.jpg'),
            book_id: findBookId(books, 'Python In A Nutshell')
          }),
          knex('author_book').insert({
            author_id: findAuthorId(authors, 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/anna_ravenscroft.jpg'),
            book_id: findBookId(books, 'Python In A Nutshell')
          }),
          knex('author_book').insert({
            author_id:findAuthorId(authors, 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/steve_holden.jpg'),
            book_id: findBookId(books, 'Python In A Nutshell')
          }),
          knex('author_book').insert({
            author_id:findAuthorId(authors, 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/allen_downey.jpg'),
            book_id: findBookId(books, 'Think Python')
          }),
          knex('author_book').insert({
            author_id:findAuthorId(authors, 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/bonnie_eisenman.jpg'),
            book_id: findBookId(books, 'Learning React Native')
          }),
          knex('author_book').insert({
            author_id:findAuthorId(authors, 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/kyle_simpson.jpg'),
            book_id: findBookId(books, 'You Don\'t Know JS: ES6 & Beyond')
          }),
          knex('author_book').insert({
            author_id:findAuthorId(authors, 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/kyle_simpson.jpg'),
            book_id: findBookId(books, 'You Don\'t Know JS: Scope & Closures')
          }),
          knex('author_book').insert({
            author_id:findAuthorId(authors, 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/kyle_simpson.jpg'),
            book_id: findBookId(books, 'You Don\'t Know JS: Async & Performance')
          })

        ]);
      })
    });
};
