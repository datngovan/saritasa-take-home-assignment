import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";

const booksCollectionRef = collection(db, "Books");
export default async function getBookList(option = "year") {
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
