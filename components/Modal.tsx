import { set } from "mongoose";
import { useEffect, useState } from "react";
interface propsType {
  content: string;
  modal: boolean;
}
export default function Modal({ content, modal }: propsType) {
  const [state, setState] = useState(modal);
  useEffect(() => {
    setState(modal);
  }, [content]);
  return (
    <div
      id="toast-interactive"
      className={
        state
          ? " w-full max-w-xs p-4 absolute top-28 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
          : "hidden"
      }
      role="alert">
      <div className="flex">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"
            />
          </svg>
          <span className="sr-only">Refresh icon</span>
        </div>
        <div className="ml-3 text-sm font-normal">
          <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
            Update available
          </span>
          <div className="mb-2 text-sm font-normal">{content}</div>
        </div>
        <button
          type="button"
          onClick={() => setState(false)}
          className="ml-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-interactive"
          aria-label="Close">
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
