import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useForm, useFieldArray } from "react-hook-form";
import { db } from "../services/firebase";
import FormRow from "../ui/FormRow";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { getBooks, addBook } from "../services/bookServices";
import { getBook } from "../store/book/bookSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Form({ bookToEdit = {}, onClose }) {
  const isEdit = Boolean(bookToEdit.id);
  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isEdit
      ? {
          name: bookToEdit.name,
          author: bookToEdit.author.map((name) => ({ name })),
          publicYear: bookToEdit.publicYear,
          rating: bookToEdit.rating,
          ISBN: bookToEdit.ISBN,
        }
      : {
          author: [{ name: " " }],
        },
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "author", // unique name for your Field Array
  });
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    onSubmitBook(data);
    setOpenModal(false);
    onClose();
    reset();
  };
  const onSubmitBook = async (data) => {
    const authorsData = data.author.map((author) => {
      return author["name"];
    });
    if (isEdit) {
      const bookDoc = doc(db, "Books", bookToEdit.id);
      await updateDoc(bookDoc, { ...data, author: authorsData });
      getBooks().then((data) => {
        dispatch(getBook(data));
      });
    } else {
      addBook({ ...data, author: authorsData });
      getBooks().then((data) => {
        dispatch(getBook(data));
      });
    }
  };
  return (
    <>
      {isEdit ? (
        <Button
          content={"Edit Book"}
          size="small"
          onClick={() => {
            setOpenModal(true);
          }}
        />
      ) : (
        <Button
          content={"Add Book"}
          size="small"
          onClick={() => {
            setOpenModal(true);
          }}
        />
      )}
      {openModal && (
        <Modal
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[40rem] lg:w-[60rem] h-[35rem] overflow-auto text-[14px]"
          >
            <FormRow label={"Book Name"} error={errors?.Name?.message}>
              <input
                className="bg-white border-[1px] border-gray-300 rounded-sm px-[12px] py-[8px] shadow-sm"
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: "This field is required",
                  max: 100,
                })}
              />
            </FormRow>
            {fields.map((item, index) => (
              <FormRow label={`Author ${index + 1}`} key={item.id}>
                <input
                  className="bg-white border-[1px] border-gray-300 rounded-sm px-[12px] py-[8px] shadow-sm"
                  {...register(`author.${index}.name`)}
                />
                <div className="flex justify-end">
                  {index > 0 && (
                    <button onClick={() => remove(index)}>
                      <TrashIcon className="size-6 text-blue-500" />
                    </button>
                  )}
                  {index == fields.length - 1 && (
                    <button onClick={() => append({ name: "John" })}>
                      <PlusIcon className="size-6 text-blue-500" />
                    </button>
                  )}
                </div>
              </FormRow>
            ))}
            <FormRow label={"Public Year"}>
              <input
                className="bg-white border-[1px] border-gray-300 rounded-sm px-[12px] py-[8px] shadow-sm"
                type="number"
                placeholder="Public Year"
                {...register("publicYear", { required: true, min: 1800 })}
              />
            </FormRow>
            <FormRow label={"Rating"}>
              <input
                className="bg-white border-[1px] border-gray-300 rounded-sm px-[12px] py-[8px] shadow-sm"
                type="number"
                placeholder="Rating"
                {...register("rating", { required: true, max: 10, min: 0 })}
              />
            </FormRow>
            <FormRow label={"ISBN"}>
              <input
                className="bg-white border-[1px] border-gray-300 rounded-sm px-[12px] py-[8px] shadow-sm"
                type="text"
                placeholder="ISBN"
                {...register("ISBN", { required: true, max: 100 })}
              />
            </FormRow>
            <FormRow>
              <div className="col-span-3 flex justify-end">
                <Button
                  variation="secondary"
                  type="reset"
                  content="Cancel"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  content={`${isEdit ? "Edit Book" : "Add Book"}`}
                ></Button>
              </div>
            </FormRow>
          </form>
        </Modal>
      )}
    </>
  );
}
