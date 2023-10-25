// export const serverUrl = "http://localhost:8080"; // development
// export const serverUrl = window.location.href.endsWith("/")
//    ? window.location.href.slice(0, -1)
//    : window.location.href; // production

export const serverUrl =
   process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : window.location.href.endsWith("/")
      ? window.location.href.slice(0, -1)
      : window.location.href;
