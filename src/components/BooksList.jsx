import BookCard from "./BookCard";

function BooksList({ booksList }) {
  // console.log("booksList", booksList);
  return (
    <div>
      {Object.keys(booksList).map((key) => (
        <div key={key} className="m-10 border-2 bg-[#f6fbff]">
          {key}
          {booksList[key].map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      ))}
    </div>
    // <div>
    //   {booksList.map((book) => (
    //     <BookCard key={book.id} book={book} />
    //   ))}
    // </div>
  );
}

export default BooksList;
