import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login_URL } from "../services/urls";
import useFetch from "../hooks/useFetch";
import { Toast } from "../components/alerts";
import Cookies from "js-cookie";

export default function LoginPage() {
  let navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Response, setResponse] = useState("");

  const handlerSubmit = (e) => {
    e.preventDefault();
    fetch(login_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ email: Email, password: Password }),
    })
      .then((response) => {
        if (response.status == 200) {
          Toast.fire({
            icon: "success",
            title: "Inicio de sesion exitoso",
          });
          return response.json();
        }
        response.json().then((error) => {
          error.error.map((error) => {
            console.log(error);
            Toast.fire({
              icon: "error",
              title: `${error}`,
            });
          });
        });
      })
      .then((data) => {
        if (data) {
          setResponse(data);
          console.log(data);
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("name", data.name);
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("status", data.status);
          navigate("/dashboard", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="flex md:flex-row h-screen w-full">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="flex flex-col text-center card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-2xl font-extrabold pt-6 text-purple">Inicio de sesion</h1>
            <form className="card-body space-y-2 text-start" onSubmit={handlerSubmit}>
              <div className="form-control">
                <h1>Email</h1>
                <label className="input input-bordered flex items-center gap-2 mt-1 w-full px-3 py-2 bg-none border border-neutral-500 rounded-md text-sm shadow-sm placeholder-slate-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="form-control">
                <h1>Password</h1>
                <label className="input input-bordered flex items-center gap-2 mt-1 w-full px-3 py-2 bg-none border border-neutral-500 rounded-md text-sm shadow-sm placeholder-slate-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-purple hover:bg-purpleActive text-base-100">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
