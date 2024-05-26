import { useEffect, useState } from "react";
import { getBooks, getRecomendedBooks } from "./services/bookServices";
import BookLists from "./components/BooksList";
import { getBook, getRecommendedBook } from "./store/book/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./ui/Spinner";
import Header from "./components/Header";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const BookData = useSelector((state) => state.book.book);
  const groupByData = useSelector((state) => state.book.group);

  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    getBooks(groupByData).then((data) => {
      dispatch(getBook(data));
      setIsLoading(false);
    });
    getRecomendedBooks().then((data) => {
      dispatch(getRecommendedBook(data));
    });
  }, [groupByData]);
  return (
    <>
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <BookLists booksList={BookData} />
        </>
      )}
    </>
  );
}

export default App;
