import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  let navigate = useNavigate();
  const handlerLogoutButton = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex navbar justify-between bg-base-100 absolute p-4 shadow-lg">
      <a className="btn btn-ghost text-xl">TAG</a>
      {sessionStorage.getItem("token") ? (
        <div className="flex-none space-x-4 dropdown dropdown-end">
          <button>
            <div className="avatar placeholder online">
              <div className="bg-neutral text-neutral-content rounded-full w-14">
                <span className="text-2xl">
                  {sessionStorage.getItem("name")[0]}
                </span>
              </div>
            </div>
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Configuraciones</a>
            </li>
            <li>
              <a onClick={handlerLogoutButton}>Logout</a>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex space-x-4 p-2">
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/login", { replace: true });
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}
