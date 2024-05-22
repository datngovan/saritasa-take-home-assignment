import { useEffect, useState } from "react";
import { db } from "./services/firebase";

import { getDocs, collection } from "firebase/firestore";
const booksCollectionRef = collection(db, "Books");
export default async function getBookList(option = "year") {
  try {
    const data = await getDocs(booksCollectionRef);
    const filterData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    switch (option) {
      case "year":
        groupByYear(filterData)
          .then((data) => {
            setBookList(data);
          })
          .catch((error) => console.log("error", error));
        break;
      case "rating":
        groupByRating(filterData)
          .then((data) => {
            setBookList(data);
          })
          .catch((error) => console.log("error", error));
        break;
      case "author":
        groupByAuthor(filterData)
          .then((data) => {
            setBookList(data);
          })
          .catch((error) => console.log("error", error));
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
