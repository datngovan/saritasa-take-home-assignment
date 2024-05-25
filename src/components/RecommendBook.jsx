import { useEffect, useState } from "react";
import { getRecomendedBooks } from "../services/bookServices";
import BooksList from "./BooksList";
import BookCard from "./BookCard";

function RecommendBook({ book }) {
  return (
    <div>
      RecommendBook
      {book ? <BookCard book={book} /> : "Not Found"}
    </div>
  );
}

export default RecommendBook;
