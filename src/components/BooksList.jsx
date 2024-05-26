import { useSelector } from "react-redux";

import BookCard from "./BookCard";
import RecommendBook from "./RecommendBook";

function BooksList() {
  const books = useSelector((state) => state.book);
  return (
    <>
      <div className="border-2 bg-[#f6fbff]">
        <RecommendBook book={books.RecommendBook} />
        {Object?.keys(books.book)?.map((key) => (
          <div key={key} className="grid font-bold border-t-2 border-[#f15a24]">
            {/* Conditional rendering for each type of group by */}
            {key === `null` && books.group === `year` && "Not have Public Year"}
            {key !== `null` && books.group === `year` && `Public In ${key}`}
            {books.group === `author` && `Written By ${key}`}
            {books.group === `rating` && `Rating ${key}`}
            <div className="flex font-light">
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
