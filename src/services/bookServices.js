import { useSelector } from "react-redux";
import { db } from "./firebase";

import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
const booksCollectionRef = collection(db, "Books");
export async function getBooks(option = "year") {
  try {
    const data = await getDocs(booksCollectionRef);
    const filterData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
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
export async function getRecomendedBooks() {
  try {
    const data = await getDocs(booksCollectionRef);
    const filterData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const bookByRating = groupByRating(filterData);
    const highestScore = Math.max(...Object.keys(bookByRating));
    const result = bookByRating[highestScore];
    if (result.length > 1) {
      const random = Math.floor(Math.random() * result.length);
      return result[random];
    }
    return result[0];
  } catch (error) {
    console.log(error);
  }
}
const addBook = async (data) => {
  await addDoc(booksCollectionRef, { ...data });
};
const deleteBook = async (id) => {
  const bookDoc = doc(db, "Books", id);
  await deleteDoc(bookDoc);
};
const editBook = async (id, data) => {
  const bookDoc = doc(db, "Books", id);
  await updateDoc(bookDoc, { ...data });
};
function groupByYear(booksList) {
  const result = Object.groupBy(booksList, ({ publicYear }) => publicYear);

  return result;
}
function groupByRating(booksList) {
  const result = Object.groupBy(booksList, ({ rating }) => rating);
  return result;
}
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
  return result;
}

export { editBook, addBook, deleteBook };
