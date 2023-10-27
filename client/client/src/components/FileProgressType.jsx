import { bytesToSize } from "../helpers/ByteToSize";
import { BsCheck2, BsWatch } from "react-icons/bs";
export function FileProgressSuccess({ name, size }) {
   return (
      <div
         className="w-full p-5 rounded-xl text-left mt-3  bg-emerald-50"
         key={name}
      >
         <div className="font-medium w-full text-gray-700 text-base truncate ">
            {name}
         </div>

         <div className="text-sm font-normal text-gray-500 flex items-center gap-2">
            {bytesToSize(size)}
            <BsCheck2 className="text-emerald-500 text-xl" />
         </div>
      </div>
   );
}
export function FileProgressPending({ name, size }) {
   return (
      <div
         className="w-full p-5 rounded-xl text-left mt-3  bg-gray-50"
         key={name}
      >
         <div className="font-medium w-full text-gray-700 text-base truncate ">
            {name}
         </div>

         <div className="text-sm font-normal text-gray-500 flex items-center gap-2">
            {bytesToSize(size)} <BsWatch className="text-gray-500 text-base" />
         </div>
      </div>
   );
}
export function FileProgressWorking({ name, size, progress }) {
   let pro = ((progress / size) * 100).toFixed(0);
   return (
      <div className="w-full p-5 rounded-xl text-left mt-3  bg-indigo-50">
         <div className="font-medium w-full text-gray-700 text-base truncate ">
            {name}
         </div>
         <div className="w-full h-1 rounded-full overflow-hidden bg-indigo-100 mt-2">
            <div
               style={{ width: pro + "%" }}
               className=" bg-indigo-600 h-full rounded-full transition-[width]"
            ></div>
         </div>
         <div className="flex justify-between text-sm text-gray-500 mt-1">
            <div>
               {bytesToSize(progress)} of {bytesToSize(size)}
            </div>
            <div>{pro + "%"}</div>
         </div>
      </div>
   );
}
