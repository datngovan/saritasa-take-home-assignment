import { useEffect, useState } from "react";
import { getBooks, getRecomendedBooks } from "./services/bookServices";
import BookLists from "./components/BooksList";
import Form from "./components/Form";
import {
  getBook,
  getRecommendedBook,
  getgroupBy,
} from "./store/book/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./ui/Spinner";
import RecommendBook from "./components/RecommendBook";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const BookData = useSelector((state) => state.book.book);
  const groupByData = useSelector((state) => state.book.group);
  const RecommendBookBookData = useSelector(
    (state) => state.book.RecommendBook
  );

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
      <div className="flex justify-end mx-10 border-b-2">
        {/* Add Book Form */}
        <Form />
        <div>
          <label htmlFor="groupBy">Group By:</label>

          <select
            name="Group By"
            id="groupBy"
            onChange={(e) => {
              dispatch(getgroupBy(e.target.value));
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
