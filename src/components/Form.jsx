import { doc, updateDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useForm, useFieldArray } from "react-hook-form";
import { db } from "../services/firebase";
import FormRow from "../ui/FormRow";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { getBooks, addBook } from "../services/bookServices";
import { getBook } from "../store/book/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { audit } from "isbn3";
export default function Form({ bookToEdit = {}, onClose }) {
  // Yup validation schema
  const AuthorParse = bookToEdit?.author?.map((author) => {
    return {
      author: author,
    };
  });

  const validateISBN = async (value) => {
    const data = await audit(value).validIsbn;
    return data;
  };
  const schema = yup.object({
    name: yup
      .string()
      .required()
      .max(100, "Name must be lest thann 100 characters"),
    publicYear: yup
      .number()
      .min(1800, "Public Year must be higher than 1800")
      .nullable(true)
      .transform((_, val) => (val === Number(val) ? val : null)),
    author: yup.array().of(
      yup.object().shape({
        author: yup.string().required("Author name is required"),
      })
    ),
    rating: yup
      .number()
      .min(0, "Rating must higher than 0")
      .max(10, "Rating must lower than 10"),
    ISBN: yup.string().test("verified", "ISBN is invalid", async (value) => {
      const verified = await audit(value).validIsbn;
      return verified;
    }),
  });
  // check if it's the edit session or create session
  const isEdit = Boolean(bookToEdit.id);
  const [openModal, setOpenModal] = useState(false);
  const BookData = useSelector((state) => state.book.group);
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
          author: AuthorParse,
          publicYear: bookToEdit.publicYear,
          rating: bookToEdit.rating,
          ISBN: bookToEdit.ISBN,
        }
      : {
          author: [{ author: " " }],
          rating: 0,
        },
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: "author", // unique name for your Field Array
  });
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    onSubmitBook(data);
    setOpenModal(false);
    getBooks(BookData).then((data) => {
      dispatch(getBook(data));
    });
  };
  const onSubmitBook = async (data) => {
    const authorsData = data.author.map((author) => {
      return author["author"];
    });
    if (isEdit) {
      const bookDoc = doc(db, "Books", bookToEdit.id);
      if (isNaN(data.publicYear)) {
        data = { ...data, publicYear: NaN };
      }
      if (isNaN(data.rating)) {
        data = { ...data, rating: 0 };
      }
      await updateDoc(bookDoc, { ...data, author: authorsData });
    } else {
      await addBook({ ...data, author: authorsData });
    }
  };
  const resetAsyncForm = useCallback(async () => {
    reset(
      isEdit
        ? {
            name: bookToEdit.name,
            author: AuthorParse,
            publicYear: bookToEdit.publicYear,
            rating: bookToEdit.rating,
            ISBN: bookToEdit.ISBN,
          }
        : {
            author: [{ author: " " }],
            rating: 0,
          }
    ); // asynchronously reset your form values
  }, [reset]);

  useEffect(() => {
    resetAsyncForm();
  }, [resetAsyncForm]);
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
            key={bookToEdit.id}
            className="w-[15rem] h-[20rem] lg:w-[60rem] lg:h-[35rem] overflow-auto text-[14px]"
          >
            <FormRow label={"Book Name"} error={errors?.name?.message}>
              <input
                className="bg-white border-[1px] border-gray-300 rounded-sm px-[12px] py-[8px] shadow-sm"
                type="text"
                placeholder="Name"
                {...register("name")}
              />
            </FormRow>
            {fields.map((item, index) => (
              <FormRow
                label={`Author ${index + 1}`}
                key={item.id.concat(index)}
                error={errors?.author?.[index]?.author?.message}
              >
                <input
                  className="bg-white border-[1px] border-gray-300 rounded-sm px-[12px] py-[8px] shadow-sm"
                  {...register(`author.${index}.author`)}
                />
                <div className="flex justify-end">
                  {index > 0 && (
                    <button onClick={() => remove(index)}>
                      <TrashIcon className="size-6 text-blue-500" />
                    </button>
                  )}
                  {index == fields.length - 1 && (
                    <button onClick={() => append({ author: "" })}>
                      <PlusIcon className="size-6 text-blue-500" />
                    </button>
                  )}
                </div>
              </FormRow>
            ))}
            <FormRow label={"Public Year"} error={errors?.publicYear?.message}>
              <input
                className="bg-white border-[1px] border-gray-300 rounded-sm px-[12px] py-[8px] shadow-sm"
                type="number"
                placeholder="Public Year"
                {...register("publicYear")}
              />
            </FormRow>
            <FormRow label={"Rating"} error={errors?.rating?.message}>
              <input
                className="bg-white border-[1px] border-gray-300 rounded-sm px-[12px] py-[8px] shadow-sm"
                type="number"
                placeholder="Rating"
                {...register("rating")}
              />
            </FormRow>
            <FormRow label={"ISBN"} error={errors?.ISBN?.message}>
              <input
                className="bg-white border-[1px] border-gray-300 rounded-sm px-[12px] py-[8px] shadow-sm"
                type="text"
                placeholder="ISBN"
                {...register("ISBN", {
                  validate: validateISBN,
                })}
              />
            </FormRow>
            <FormRow>
              <div className="col-span-3 flex justify-end">
                <Button
                  variation="secondary"
                  type="reset"
                  content="Cancel"
                  onClick={() => {
                    setOpenModal(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  content={`${isEdit ? "Edit Book" : "Add Book"}`}
                  onClick={() => {
                    getBooks().then((data) => {
                      dispatch(getBook(data));
                    });
                  }}
                ></Button>
              </div>
            </FormRow>
          </form>
        </Modal>
      )}
    </>
  );
}
