import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../store/book/bookSlice";
import { getBooks, deleteBook } from "../services/bookServices";

import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Form from "./Form";

function BookCard({ book }) {
  const { name, rating, author, ISBN, publicYear, id } = book;
  const [openConfirm, setOpenConfirm] = useState(false);
  const group = useSelector((state) => state.book.group);
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex flex-col w-96 m-10 h-[500px] border-2 rounded-md shadow-md bg-white">
        <div className="h-44 bg-[#f15a24] flex justify-center items-center">
          <p className="text-white text-lg font-bold">Book Cover Holder</p>
        </div>
        <div className="flex flex-col m-6 gap-4">
          <h2 className="text-3xl">{name}</h2>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-300 ms-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="rgb(253 224 71)"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              {rating}/10
            </p>
          </div>
          <div className="flex gap-2">
            Author(s):
            {author?.map((each) => (
              <h3 key={each + id}>{each}</h3>
            ))}
          </div>
          {publicYear && <h2>Publication Year: {publicYear}</h2>}
          <hr />
          {ISBN && <h2>ISBN: {ISBN}</h2>}
          <div className="grid grid-cols-2 gap-10">
            {/* pass the book to the Form */}
            <Form bookToEdit={book} />
            <Button
              content={"Delete"}
              variation="danger"
              size="small"
              onClick={() => {
                setOpenConfirm(true);
              }}
            />
            {/* confirmation modal for delete */}
            {openConfirm && (
              <Modal
                onClose={() => {
                  setOpenConfirm(false);
                }}
              >
                Do you want to delete this book
                <div className="flex justify-end py-2 gap-2">
                  <Button
                    content={"no"}
                    size="small"
                    variation="danger"
                    onClick={() => setOpenConfirm(false)}
                  />
                  <Button
                    content={"yes"}
                    size="small"
                    onClick={() => {
                      deleteBook(id);
                      setOpenConfirm(false);
                      getBooks(group).then((data) => {
                        dispatch(getBook(data));
                      });
                    }}
                  />
                </div>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BookCard;
