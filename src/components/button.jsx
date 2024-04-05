import React from "react";
import { useNavigate } from "react-router-dom";

export default function Button(prop) {
  let navigate = useNavigate();
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        navigate(prop.url, { replace: true });
      }}
    >
      {prop.text}
    </button>
  );
}
