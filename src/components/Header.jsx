import getBooks from "../services/bookServices";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Form from "./Form";

function Header(openModal) {
  return (
    <div className="flex justify-between mx-10 border-b-2">
      {openModal && (
        <Modal
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <Form
            onCloseModal={() => {
              getBooks();
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
  );
}

export default Header;
