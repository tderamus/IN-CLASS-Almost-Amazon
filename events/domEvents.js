import {
  deleteBook, getBooks, getSingleBook
} from '../api/bookData';
import { getAuthorDetails, getBookDetails, deleteAuthorBooksRelationship } from '../api/mergedData';
import { showBooks } from '../pages/books';
import addBookForm from '../components/forms/addBookForm';
import viewBook from '../pages/viewBook';
import { getAuthors, getSingleAuthor } from '../api/authorData';
import { showAuthors } from '../pages/authors';
import addAuthorForm from '../components/forms/addAuthorForm';
import viewAuthor from '../pages/viewAuthor';

const domEvents = (user) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE BOOK', e.target.id);
        const [, firebaseKey] = e.target.id.split('--');

        deleteBook(firebaseKey).then(() => {
          getBooks().then(showBooks);
        });
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm();
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj, user));
      // getSingleBook(firebaseKey).then(addBookForm); // using the callback method
    }

    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getBookDetails(firebaseKey).then(viewBook);
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');

        deleteAuthorBooksRelationship(firebaseKey).then(() => {
          getAuthors().then(showAuthors);
        });
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }

    // FIXME: ADD CLICK EVENT FOR EDITING/UPDATING AN AUTHOR
    if (e.target.id.includes('update-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      console.warn('VIEW AUTHOR', e.target.id);
      getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj));
    }

    // TODO: CLICK EVENT FOR VIEW AUTHOR DETAILS
    if (e.target.id.includes('view-author-btn')) {
      console.warn('VIEW AUTHOR DETAIL', e.target.id);
      const [, firebaseKey] = e.target.id.split('--');
      console.warn(e.target.id);
      getAuthorDetails(firebaseKey).then(viewAuthor);
    }
  });
};

export default domEvents;
