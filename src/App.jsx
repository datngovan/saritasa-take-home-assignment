import { useEffect, useState } from "react";
import { getBooks, getRecomendedBooks } from "./services/bookServices";
import BookLists from "./components/BooksList";
import Form from "./components/Form";
import { getBook, getRecommendedBook } from "./store/book/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./ui/Spinner";
import RecommendBook from "./components/RecommendBook";
function App() {
  const [groupBy, setGroupBy] = useState("year");
  const [books, setBooks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const BookData = useSelector((state) => state.book.book);
  const RecommendBookBookData = useSelector(
    (state) => state.book.RecommendBook
  );

  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    getBooks(groupBy).then((data) => {
      dispatch(getBook(data));
      setIsLoading(false);
    });
    getRecomendedBooks().then((data) => {
      dispatch(getRecommendedBook(data));
    });
  }, [groupBy]);
  return (
    <>
      <div className="flex justify-between mx-10 border-b-2">
        {/* Add Book Form */}
        <Form />
        <div>
          <label htmlFor="groupBy">Group By:</label>

          <select
            name="Group By"
            id="groupBy"
            onChange={(e) => {
              setGroupBy(e.target.value);
            }}
          >
            <option value="year">Year</option>
            <option value="rating">Rating</option>
            <option value="author">Author</option>
          </select>
        </div>
      </div>
      {/*  */}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <RecommendBook book={RecommendBookBookData} />
          <BookLists booksList={BookData} />
        </>
      )}
    </>
  );
}

export default App;
