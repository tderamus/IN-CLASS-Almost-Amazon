import { getAuthorBooks, getSingleAuthor, deleteAuthor } from './authorData';
import { getSingleBook, deleteBook } from './bookData';
// for merged promises

// TODO: Get data for viewBook
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE BOOK
  getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
    getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
  // GET AUTHOR
  // Create an object that has book data and an object named authorObject
});

// TODO: Get data for viewAuthor
// const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
//   // GET SINGLE BOOK
//   getSingleAuthor(firebaseKey).then((authorObject) => { // returns single author object
//     getAuthorBooks(authorObject.first_name) // we nest this promise so that we can use the author object
//       .then((bookObject) => resolve({ ...authorObject, bookObject }));
//   }).catch(reject);
// });

// TODO Get Data For ViewAuthor

const getAuthorDetails = async (firebaseKey) => { // the async keyword let's JS know this is asynchronous function (promise)
  const authorObject = await getSingleAuthor(firebaseKey); // await stops the code in this function and waits for the response. This is like using .then
  const bookObject = await getAuthorBooks(firebaseKey); // this function uses the data response from the bookObject

  return { ...authorObject, books: bookObject };
};

// TODO Delete Author Books

const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export { getBookDetails, getAuthorDetails, deleteAuthorBooksRelationship };
