import { useEffect, useState } from "react";
import { getRecomendedBooks } from "../services/bookServices";
import BooksList from "./BooksList";
import BookCard from "./BookCard";

function RecommendBook({book}) {
  
  return (
    <div>
      RecommendBook
      <BookCard book={book} />
    </div>
  );
}

export default RecommendBook;
