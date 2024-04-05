import React, { useState } from "react";
import { register_URL } from "../services/urls";
import { Toast } from "./alerts";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(true);

  const handlerSubmmit = () => {
    try {
      fetch(register_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: role,
          status: status,
        }),
      })
        .then((response) => {
          if (response.status == 200) {
            Toast.fire({
              icon: "success",
              title: "Registro exitoso",
            });
            return response.json();
          }
          if (response.status == 400) {
            Toast.fire({
              icon: "error",
              title: "Correo ya existente",
            });
          }
          response.json().then((error) => {
            console.log("Status 400" + JSON.stringify(error.message));
          });
        })
        .then((data) => {
          if (data) {
            console.log("Datos" + data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Crear Usuario</h1>
      <form
        className="flex flex-row w-full card-body"
        onSubmit={handlerSubmmit}
      >
        <div className="form-control w-1/5">
          <label className="label">
            <span className="label-text">Nombre</span>
          </label>
          <input
            type="text"
            placeholder="nombre"
            className="input input-bordered"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-control w-1/5">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control w-1/5">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-control w-1/5">
          <label className="label">
            <span className="label-text">Rol de usuario</span>
          </label>
          <select
            id="selector"
            className="select select-bordered w-full"
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option selected disabled>
              Selecciona un rol
            </option>
            <option value="Cocinero">Cocinero</option>
            <option value="Administrador">Administrador</option>
            <option value="Mesero">Mesero</option>
          </select>
        </div>
        <div className="flex w-1/5 items-end align-bottom">
          <button className="btn bg-neutral-700 text-base-100 hover:text-neutral-700 w-full">Crear</button>
        </div>
      </form>
    </div>
  );
}
