import { useEffect, useState } from "react";
import { db } from "./services/firebase";
import { getDocs, collection } from "firebase/firestore";
import getBookList from "./services/bookServices";

import BookLists from "./components/BooksList";
import Modal from "./ui/Modal";
import Form from "./components/Form";
import Button from "./ui/Button";
import { increment, getBook } from "./store/book/bookSlice";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const [BookList, setBookList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [groupBy, setGroupBy] = useState("year");
  const count = useSelector((state) => state.book.book);
  const dispatch = useDispatch();
  useEffect(() => {
    getBookList(groupBy).then((data) => {
      console.log("data", data);
      setBookList(data);
      dispatch(getBook(BookList));
    });
  }, [groupBy]);
  console.log("count", count);
  return (
    <>
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <div className="flex justify-between mx-10 border-b-2">
        {openModal && (
          <Modal
            onClose={() => {
              setOpenModal(false);
            }}
          >
            <Form
              onCloseModal={() => {
                getBookList();
                setOpenModal(false);
              }}
            />
          </Modal>
        )}
        <Button
          content={"Add Book"}
          size="small"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          open modal
        </Button>
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
      <BookLists booksList={BookList} />
    </>
  );
}

export default App;
