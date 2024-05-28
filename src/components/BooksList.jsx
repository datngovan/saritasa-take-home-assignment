import { useSelector } from "react-redux";

import BookCard from "./BookCard";
import RecommendBook from "./RecommendBook";
import { useEffect } from "react";

function BooksList() {
  const books = useSelector((state) => state.book);
  function switchNull(array) {
    if (array[0] === `null`) {
      const nullVal = array.shift();
      array.push(nullVal);
      return array;
    }
    return array;
  }
  // Group By Year is Decending order
  const decendingYear = switchNull(Object?.keys(books.book).reverse());
  // Group By Rating is Decending order
  const decendingRating = Object?.keys(books.book).reverse();
  // Group By Author is Acending (A-Z) order
  const acendingAuthors = Object?.keys(books.book).sort((a, b) =>
    a.toString().toLowerCase().localeCompare(b.toString().toLowerCase())
  );
  return (
    <>
      <div className="border-2 bg-[#f6fbff]">
        <RecommendBook book={books.RecommendBook} />
        {books.group === `year` &&
          decendingYear?.map((key) => (
            <div
              key={key}
              className="grid font-bold border-t-2 border-[#f15a24]"
            >
              {/* Conditional rendering for each type of group */}
              {key === `null` && "Not have Public Year"}
              {key !== `null` && `Public In ${key}`}
              <div className="flex flex-wrap items-center font-light">
                {books.book[key]?.map((book) => (
                  <BookCard book={book} key={book.id} />
                ))}
              </div>
            </div>
          ))}
        {books.group === `author` &&
          acendingAuthors?.map((key) => (
            <div
              key={key}
              className="grid font-bold border-t-2 border-[#f15a24]"
            >
              {/* Conditional rendering for each type of group */}
              {`Written By ${key}`}
              <div className="flex flex-wrap items-center font-light">
                {books.book[key]?.map((book) => (
                  <BookCard book={book} key={book.id} />
                ))}
              </div>
            </div>
          ))}
        {books.group === `rating` &&
          decendingRating?.map((key) => (
            <div
              key={key}
              className="grid font-bold border-t-2 border-[#f15a24]"
            >
              {/* Conditional rendering for each type of group */}
              {`Rating ${key}`}
              <div className="flex flex-wrap items-center font-light">
                {books.book[key]?.map((book) => (
                  <BookCard book={book} key={book.id} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default BooksList;
