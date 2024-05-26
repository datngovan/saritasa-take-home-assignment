import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Modal({ children, onClose }) {
  return createPortal(
    <div className="fixed top-0 left-0 w-full h-lvh z-[1000] backdrop-blur-sm">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-md px-[3.2rem] py-[4rem]">
        <button
          className="p-[0.4rem] rounded-sm absolute top-1 right-2"
          onClick={onClose}
        >
          <XMarkIcon className="size-6 text-blue-500" />
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}
