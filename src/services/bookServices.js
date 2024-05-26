import { db } from "./firebase";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { getCurrentYear } from "../utils";

const booksCollectionRef = collection(db, "Books");

// Get book from firebase with default option = year
async function getBooks(option = "year") {
  try {
    const data = await getDocs(booksCollectionRef);
    const filterData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // group the data retrive from database and group into year || rating || author
    switch (option) {
      case "year":
        return groupByYear(filterData);
      case "rating":
        return groupByRating(filterData);
      case "author":
        return groupByAuthor(filterData);
    }
  } catch (error) {
    console.log(error);
  }
}

// Get a random best book from firebase
async function getRecomendedBooks() {
  try {
    const data = await getDocs(booksCollectionRef);
    const filterData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    // filter by rating to get highest rating array of Books
    const bookByRating = groupByRating(filterData);
    const highestScore = Math.max(...Object.keys(bookByRating));
    const highestScoreBooks = bookByRating[highestScore];
    const currentYear = getCurrentYear();
    // filter public year is not null and not lower than 3 year of publication
    const result = highestScoreBooks.filter((book) => {
      return currentYear - book.publicYear >= 3;
    });
    // if there is more than 1 book get random value or return the book
    if (result.length > 1) {
      const random = Math.floor(Math.random() * result.length);
      return result[random];
    }
    return result[0];
  } catch (error) {
    console.log(error);
  }
}
// add new book
const addBook = async (data) => {
  await addDoc(booksCollectionRef, { ...data });
};
// delete a book with id
const deleteBook = async (id) => {
  const bookDoc = doc(db, "Books", id);
  await deleteDoc(bookDoc);
};
// edit book with id and data
const editBook = async (id, data) => {
  const bookDoc = doc(db, "Books", id);
  await updateDoc(bookDoc, { ...data });
};
// group by public year
function groupByYear(booksList) {
  const result = Object.groupBy(booksList, ({ publicYear }) => publicYear);
  // sorted alphabetically
  Object.keys(result).forEach(function (key) {
    result[key].sort(function (a, b) {
      return a.name > b.name ? 1 : a === b ? 0 : -1;
    });
  });
  return result;
}
// group by public rating
function groupByRating(booksList) {
  const result = Object.groupBy(booksList, ({ rating }) => rating);
  // sorted alphabetically
  Object.keys(result).forEach(function (key) {
    result[key].sort(function (a, b) {
      return a.name > b.name ? 1 : a === b ? 0 : -1;
    });
  });
  return result;
}
// group by public Author Name
function groupByAuthor(booksList) {
  const result = {};
  booksList.map((book) => {
    book.author.map((author) => {
      if (author in result) {
        result[author].push(book);
      } else {
        result[author] = [...[book]];
      }
    });
  });
  // sorted alphabetically
  Object.keys(result).forEach(function (key) {
    result[key].sort(function (a, b) {
      return a.name > b.name ? 1 : a === b ? 0 : -1;
    });
  });
  return result;
}
export { editBook, addBook, deleteBook, getBooks, getRecomendedBooks };
