import { useEffect, useState } from "react";
import { Domain } from "../services/urls.jsx";

export default function useFetch(url, method, { body } = {}) {
  const [Data, setData] = useState();
  const [Error, setError] = useState();

  useEffect(() => {
    try {
      fetch(Domain + url, {
        method: `${method}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${sessionStorage.getItem("token")}`,
        },
        body: body,
      })
        .then((response) => {
          return response.json();
        })
        .then((d) => {
          setData(d);
        })
        .catch((error) => {
          setError(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { Data, Error };
}
