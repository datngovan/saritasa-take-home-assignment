import BookCard from "./BookCard";

function RecommendBook({ book }) {
  return (
    <div>
      <p className="font-bold">Recommend Book</p>
      {book ? <BookCard book={book} /> : "Not Found"}
    </div>
  );
}

export default RecommendBook;
