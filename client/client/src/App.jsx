import { useState } from "react";
import Home from "./components/page/Home";
import Sender from "./components/page/Sender";
function App() {
   const [files, setFiles] = useState([]);
   const [page, setPage] = useState("home"); // by default renders  home page

   const PageManager = (page) => {
      switch (page) {
         case "home":
            return <Home files={files} setFiles={setFiles} setPage={setPage} />;
         case "sender":
            return <Sender files={files} />;
      }
   };

   return <>{page ? PageManager(page) : ""}</>;
}

export default App;
