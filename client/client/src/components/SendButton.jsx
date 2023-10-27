import { BsSendFill } from "react-icons/bs";
export default function SendButton({ setPage }) {
   const handleClick = () => {
      setPage("sender");
   };
   return (
      <div
         id="sendButton"
         className=" w-full p-3 bottom-0 left-0 h-20  fixed z-20 hidden items-center justify-center"
      >
         <button
            onClick={handleClick}
            type="submit"
            className="max-w-md w-full bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-full text-base text-white gap-2 flex items-center justify-center p-3"
         >
            <span>
               <BsSendFill />
               <span className="sr-only">send icon</span>
            </span>
            <span className="capitalize font-semibold">send</span>
         </button>
      </div>
   );
}
