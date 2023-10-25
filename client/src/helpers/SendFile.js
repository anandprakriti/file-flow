// Import server URL from constants
import { serverUrl } from "./constant";

// Function to send a file
export const sendFile = (
 fileList, // List of files to be sent
 setCurrent, // Function to set the current file being sent
 setPending, // Function to set the pending files
 setSuccess, // Function to set the successful files
 setProgress // Function to update the progress
) => {
 // Get the current file from the list and update the list
 const [currentFile] = fileList.splice(0, 1);

 // Create a new FormData instance
 const formData = new FormData();
 // Append the current file to the form data
 formData.append("file", currentFile);
 // Define the request URL for upload
 const requestURL = serverUrl + "/upload";

 // Create a new XMLHttpRequest instance
 var xhr = new XMLHttpRequest();

 // Event listener for when the upload starts
 xhr.upload.onloadstart = function (e) {
  console.log("Upload started"); // Log upload start
  setCurrent([currentFile]); // Set the current file
  setPending(fileList); // Update the pending files list
 };

 // Event listener for upload progress updates
 xhr.upload.onprogress = function (e) {
  if (e.lengthComputable) {
   setProgress(e.loaded); // Update progress if it's computable
  }
 };

 // Event listener for when the upload ends
 xhr.upload.onloadend = function (e) {
  setProgress(e.total); // Update progress when upload ends
 };

 // Event listener for when the file is uploaded successfully
 xhr.onload = function () {
  if (xhr.status == 200) {
   // If upload is successful (status 200)
   setSuccess((c) => [...c, currentFile]); // Add current file to successful files list
   setCurrent([]); // Clear current file

   if (fileList.length < 1) return; // If no more files are left, return

   sendFile(fileList, setCurrent, setPending, setSuccess, setProgress); // Else, send next file in list
  } else {
   console.log("Upload failed with status: " + xhr.status); // Log failure status if upload fails
  }
 };

 xhr.open("POST", requestURL, true); // Open a POST request with the request URL

 xhr.send(formData); // Send the form data with the file
};
