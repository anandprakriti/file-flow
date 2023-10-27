export function bytesToSize(bytes) {
 // Define an array of size units
 const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

 // If the input is zero, return 'n/a'
 if (bytes === 0) return "n/a";

 // Calculate the index of the size unit to use
 const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);

 // If the size is in bytes, return it directly
 if (i === 0) return `${bytes} ${sizes[i]}`;

 // Otherwise, calculate the size in the appropriate unit and return it
 return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}
