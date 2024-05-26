import { useDispatch } from "react-redux";

import { getgroupBy } from "../store/book/bookSlice";

import Form from "./Form";

function Header() {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between p-2 gap-10 border-b-2 sticky top-0 bg-[#f15a24]">
      <p className="text-white flex justify-center items-center text-3xl font-bold">
        Saritasa's Take Home Test
      </p>
      <div className="flex">
        <Form />
        <form className="grid grid-flow-col">
          <label
            htmlFor="groupBy"
            className="flex items-center mx-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Group By
          </label>
          <select
            name="Group By"
            id="groupBy"
            onChange={(e) => {
              // dispatch action to change the value of groupBy
              dispatch(getgroupBy(e.target.value));
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="year">Year</option>
            <option value="rating">Rating</option>
            <option value="author">Author</option>
          </select>
        </form>
      </div>
    </div>
  );
}

export default Header;
