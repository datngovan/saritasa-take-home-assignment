import BookCard from "./BookCard";

function BooksList({ booksList }) {
  return (
    <div>
      {booksList.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BooksList;
