// this is  file component renders at home when the user select the file

import { bytesToSize } from "../helpers/ByteToSize";

export default function File({ name, size }) {
   return (
      <div
         className="w-full p-5 rounded-xl text-left mt-3  bg-gray-50"
         key={name + "view"}
      >
         <div className="font-medium w-full text-gray-700 text-base truncate ">
            {name}
         </div>
         <div className="text-sm font-normal text-gray-500">
            {bytesToSize(size)}
         </div>
      </div>
   );
}
