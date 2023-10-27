import {
   FileProgressSuccess,
   FileProgressPending,
   FileProgressWorking,
} from "../FileProgressType";
import { useEffect, useState } from "react";
import { sendFile } from "../../helpers/SendFile";
import { serverUrl } from "../../helpers/constant";
function Sender(props) {
   const { files } = props;
   const [current, setCurrent] = useState([]);
   const [pending, setPending] = useState([]);
   const [success, setSuccess] = useState([]);
   const [progress, setProgress] = useState(0);
   useEffect(() => {
      setTimeout(() => {
         fetch(serverUrl + "/status")
            .then((res) => res.json())
            .then((data) => {
               if (data["status"] === "success")
                  sendFile(
                     files,
                     setCurrent,
                     setPending,
                     setSuccess,
                     setProgress
                  );
            })
            .catch((err) => console.error("Server is not working."));
      }, 10);
   }, []);
   return (
      <>
         <div id="sender" className="w-full  max-w-md mt-9 mb-20 mx-auto">
            {success.map((elem) => {
               return (
                  <FileProgressSuccess
                     name={elem.name}
                     size={elem.size}
                     key={elem.name + "success"}
                  />
               );
            })}
            {current.map((elem) => {
               return (
                  <FileProgressWorking
                     name={elem.name}
                     size={elem.size}
                     key={elem.name + "current"}
                     progress={progress}
                  />
               );
            })}
            {pending.map((elem) => {
               return (
                  <FileProgressPending
                     name={elem.name}
                     size={elem.size}
                     key={elem.name + "pending"}
                  />
               );
            })}
         </div>
      </>
   );
}
export default Sender;
