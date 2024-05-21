import { useEffect, useMemo, useState } from "react";
import { db } from "./services/firebase";
import { collection, getDocs } from "firebase/firestore";
import BookCard from "./components/BookCard";
import BooksList from "./components/BooksList";
import { groupByYear } from "./services/bookServices";

function App() {
  const authors = [
    {
      id: "1",
      name: "Dat",
      writtenBooks: [
        "iQl3cRnbQjwjpgVELxJH",
        "kfB2fHgNU68ArvoJxSyl",
        "82qZ5M4T92Vrw3K6HmOt",
        "iZSgd6MblmJQskTfdFzS",
      ],
    },
    {
      id: "2",
      name: "Vy",
      writtenBooks: [
        "kfB2fHgNU68ArvoJxSyl",
        "82qZ5M4T92Vrw3K6HmOt",
        "iZSgd6MblmJQskTfdFzS",
      ],
    },
  ];
  const booksListData = [
    {
      PublicationYear: "1900",

      Name: "12321dat",

      rating: 0,

      Author: ["1"],

      id: "iQl3cRnbQjwjpgVELxJH",
    },

    {
      Name: "3213123213dasd",

      Author: ["1", "2"],

      rating: 0,

      PublicationYear: "1900",

      id: "kfB2fHgNU68ArvoJxSyl",
    },

    {
      Author: ["1", "2"],

      Name: "321321dasd",

      rating: 0,

      PublicationYear: "1900",

      id: "82qZ5M4T92Vrw3K6HmOt",
    },
    {
      Author: ["1", "2"],

      rating: 0,

      PublicationYear: "2001",

      ISBN: "12",

      Name: "Press Reset: Ruin and Recovery in the Video Game Industry 12312312312",

      id: "iZSgd6MblmJQskTfdFzS",
    },
    // {
    //   rating: 0,

    //   PublicationYear: "1900",

    //   Name: "321321dasd21321",

    //   Author: [{ name: "Martin" }, { name: "Robert" }, { name: "Dat Ngo Van" }],

    //   id: "Fdj3oHU9wbXRA6VBmvbC",
    // },

    // {
    //   PublicationYear: "1900",

    //   Name: "321321dasd21321",

    //   rating: 0,

    //   Author: [{ name: "Martin" }, { name: "Robert" }, { name: "Dat Ngo Van" }],

    //   id: "UJCJYq7ugRMlr5KGWYPG",
    // },

    // {
    //   Author: [{ name: "Martin" }, { name: "Robert" }, { name: "Dat Ngo Van" }],

    //   PublicationYear: "1900",

    //   rating: 0,

    //   Name: "321321dasd21321",

    //   id: "hlvAHl8M2wECrIFyEnNI",
    // },

    // {
    //   Name: "new book",

    //   PublicationYear: "2001",

    //   rating: 0,

    //   Author: [{ name: "Martin" }, { name: "Robert" }, { name: "Dat Ngo Van" }],

    //   id: "DJu0gfbgT5QSF5MsAq7C",
    // },

    // {
    //   PublicationYear: "2001",

    //   rating: 0,

    //   Author: [{ name: "Martin" }, { name: "Robert" }, { name: "Dat Ngo Van" }],

    //   Name: "new book",

    //   id: "HwiYNXPTS4ogKIWOvqbe",
    // },

    // {
    //   PublicationYear: "2001",

    //   Author: [{ name: "Martin" }, { name: "Robert" }, { name: "Dat Ngo Van" }],

    //   Name: "new book",

    //   rating: 0,

    //   id: "QWqWBd4uZefRRuyTQg9s",
    // },
  ];
  const [BookList, setBookList] = useState([]);
  const booksCollectionRef = collection(db, "Books");
  const getBookList = async () => {
    try {
      const data = await getDocs(booksCollectionRef);
      console.log("data", data); //
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // const sortedData = filterData.sort((a, b) =>
      //   a.Name.localeCompare(b.Name)
      // );
      setBookList(filterData);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(
    "groupByYear(booksListData)",
    groupByYear(booksListData).then((data) => console.log("data", data))
  );
  useEffect(() => {
    getBookList();
  }, []);
  console.log("BookList", BookList);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <BooksList booksList={BookList} />
    </>
  );
}

export default App;
