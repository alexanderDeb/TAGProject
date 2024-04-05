import React, { useEffect, useState } from "react";
import { orders_URL, products_URL, register_URL } from "../services/urls";
import { Toast } from "./alerts";
import useFetch from "../hooks/useFetch";

export default function CreateOrders() {
  const [mesa, setMesa] = useState("");
  const [nota, setNota] = useState("");
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState("");
  const [user, setUser] = useState("");

  const { Data, Error } = useFetch("/users", "GET", { "": "" });

  const [Products, setProducts] = useState();

  useEffect(() => {
    try {
      fetch(products_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${sessionStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((d) => {
          setProducts(d);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlerSubmmit = () => {
    try {
      fetch(orders_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${sessionStorage.getItem("token")}`,
        },
        credentials: "same-origin",
        body: JSON.stringify({
          mesa: mesa,
          nota: nota,
          productosid: productos,
          total: total,
          user: user,
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
      <h1 className="text-xl font-bold">Crear Orden</h1>
      <form
        className="flex flex-row w-full card-body"
        onSubmit={handlerSubmmit}
      >
        <div className="form-control w-1/6">
          <label className="label">
            <span className="label-text">Mesa</span>
          </label>
          <input
            type="text"
            placeholder="Mesa"
            className="input input-bordered"
            onChange={(e) => setMesa(e.target.value)}
            required
          />
        </div>
        <div className="form-control w-1/6">
          <label className="label">
            <span className="label-text">Nota</span>
          </label>
          <textarea
            className="textarea textarea-bordered textarea-xs"
            placeholder="Nota"
            onChange={(e) => setNota(e.target.value)}
          ></textarea>
        </div>
        <div className="form-control w-1/6">
          <label className="label">
            <span className="label-text">Productos</span>
          </label>
          {Products ? (
            <select
              id="selector"
              className="select select-bordered w-full"
              onChange={(e) => setProductos(e.target.value)}
              required
            >
              <option selected disabled>
                Selecciona un producto
              </option>
              {Products.map((x) => {
                return <option value={x._id}>{x.producto}</option>;
              })}
            </select>
          ) : (
            <select></select>
          )}
        </div>
        <div className="form-control w-1/6">
          <label className="label">
            <span className="label-text">Total</span>
          </label>
          <input
            type="text"
            placeholder="Total"
            className="input input-bordered"
            onChange={(e) => setTotal(e.target.value)}
            required
          />
        </div>
        <div className="form-control w-1/6">
          <label className="label">
            <span className="label-text">Usuario</span>
          </label>
          {Data ? (
            <select
              id="selector"
              className="select select-bordered w-full"
              onChange={(e) => setUser(e.target.value)}
              required
            >
              <option selected disabled>
                Selecciona un Usuario
              </option>
              {Data.map((x) => {
                return <option value={x._id}>{x.name}</option>;
              })}
            </select>
          ) : (
            <select>
              <option value="">No hay datos</option>
            </select>
          )}
        </div>
        <div className="flex w-1/6 items-end align-bottom">
          <button className="btn bg-neutral-700 text-base-100 hover:text-neutral-700 w-full">Crear</button>
        </div>
      </form>
    </div>
  );
}
