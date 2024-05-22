import { useEffect, useState } from "react";
import { db } from "./services/firebase";

import { getDocs, collection } from "firebase/firestore";
import BookLists from "./components/BooksList";
import Modal from "./ui/Modal";
import Form from "./components/Form";
import Button from "./ui/Button";
function App() {
  const [BookList, setBookList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [groupBy, setGroupBy] = useState("year");

  const booksCollectionRef = collection(db, "Books");
  const getBookList = async (option = groupBy) => {
    try {
      const data = await getDocs(booksCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //   console.log(filterData[0].author);
      switch (option) {
        case "year":
          groupByYear(filterData)
            .then((data) => {
              console.log("data", data);
              setBookList(data);
            })
            .catch((error) => console.log("error", error));
          break;
        case "rating":
          groupByRating(filterData)
            .then((data) => {
              console.log("data", data);
              setBookList(data);
            })
            .catch((error) => console.log("error", error));
          break;
        case "author":
          groupByAuthor(filterData)
            .then((data) => {
              console.log("data", data);
              setBookList(data);
            })
            .catch((error) => console.log("error", error));
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
  async function groupByYear(booksList) {
    const result = Object.groupBy(booksList, ({ publicYear }) => publicYear);
    return result;
  }
  async function groupByRating(booksList) {
    const result = Object.groupBy(booksList, ({ rating }) => rating);
    return result;
  }
  async function groupByAuthor(booksList) {
    const temp = {};
    const data = booksList.map((book) => {
      book.author.map((author) => {
        console.log("book", book);
        console.log("author", author);
        if (author in temp) {
          // console.log("true");
          // temp[author] = { ...temp, ...[book] };
          temp[author].push(book);
        } else {
          temp[author] = [...[book]];
          console.log("::", temp[author]);
        }
      });
    });
    return temp;
  }
  // function groupByFunction(option){
  //   switch(option){
  //     case 'year':
  //       setBookList(groupByYear);
  //   }
  // }
  useEffect(() => {
    getBookList();
  }, []);
  return (
    <div>
      {openModal && (
        <Modal
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <Form />
        </Modal>
      )}
      <div className="flex justify-end">
        <Button
          content={"Add Book"}
          size="small"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          open modal
        </Button>
      </div>
      <label htmlFor="groupBy">Group By:</label>

      <select
        name="Group By"
        id="groupBy"
        onChange={(e) => {
          getBookList(e.target.value);
        }}
      >
        <option value="year">Year</option>
        <option value="rating">Rating</option>
        <option value="author">Author</option>
      </select>
      <BookLists booksList={BookList} />
    </div>
  );
}

export default App;
