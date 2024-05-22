const sizes = {
  small: `font-sm px-[0.8rem] py-[0.4rem] uppercase font-semibold text-center`,
  medium: `font-md px-[1.6rem] py-[1.2rem] font-medium text-center`,
  large: `font-lg px-[2.4rem] py-[1.2rem] font-medium text-center`,
};
const variations = {
  primary: `text-indigo-50 bg-indigo-600 hover:bg-indigo-700`,
  secondary: `text-gray-600 bg-gray-0 border-[1px] border-solid border-gray-200 hover:bg-gray-50`,
  danger: `text-red-100 bg-red-700 hover:bg-red-800`,
};
function Button({ size = "medium", variation = "primary", content, onClick }) {
  return (
    <button
      className={`border-none rounded-sm shadow-sm ${sizes[size]} ${variations[variation]}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export default Button;
