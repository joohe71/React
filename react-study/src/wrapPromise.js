import axios from "axios";

const wrapPromise = (promise) => {
  let status = "pending";
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  };

  return { read };
};

const fetchData = () => {
  const promise = axios
    .get("https://jsonplaceholder.typicode.com/photos")
    .then((res) => res.data.slice(0, 10));

  return wrapPromise(promise);
};

export { fetchData };
