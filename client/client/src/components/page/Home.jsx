import File from "../File";
import SendButton from "../SendButton";
function Home(props) {
   const { files, setFiles, setPage } = props;
   const handleChange = (event) => {
      // set file to useState hook
      setFiles(Array.from(event.target.files));

      // if no file selected
      if (event.target.files.length < 1) {
         // make the button hidden
         document.querySelector("#sendButton").classList.add("hidden");
      } else {
         // make button visible
         document.querySelector("#sendButton").classList.remove("hidden");
         document.querySelector("#sendButton").classList.add("flex");
      }
   };
   return (
      <>
         <div className="max-w-md mx-auto mt-10 h-40 rounded-lg border-2 border-dashed flex items-center justify-center">
            <label
               htmlFor="file"
               className="cursor-pointer text-center p-4 md:p-8"
            >
               <svg
                  className="w-10 h-10 mx-auto"
                  viewBox="0 0 41 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667"
                     stroke="#4F46E5"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
               </svg>
               <p className="mt-3 text-gray-700 max-w-xs mx-auto">
                  Click to{" "}
                  <span className="font-medium text-indigo-600">
                     Upload your file
                  </span>{" "}
                  or drag and drop your file here
               </p>
            </label>

            <input
               id="file"
               type="file"
               name="file"
               multiple
               className="hidden"
               onChange={handleChange} // calls when user select files
            />
         </div>

         <SendButton setPage={setPage} />

         {/* list all files after selecting */}
         <div className="w-full max-w-md mt-9 mb-20 mx-auto">
            {files.map((elem) => {
               return (
                  <File
                     name={elem.name}
                     size={elem.size}
                     key={elem.name + "list"}
                  />
               );
            })}
         </div>
      </>
   );
}

export default Home;
