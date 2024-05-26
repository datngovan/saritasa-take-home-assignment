import BookCard from "./BookCard";

function BooksList({ booksList }) {
  return (
    <div>
      {Object.keys(booksList).map((key) => (
        <div key={key} className="grid lg:flex m-10 border-2 bg-[#f6fbff]">
          {key}
          {booksList[key].map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default BooksList;
