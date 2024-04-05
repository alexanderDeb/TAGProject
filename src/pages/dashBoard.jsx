import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Users from "../components/users";
import Products from "../components/products";
import Orders from "../components/orders";
import CreateUser from "../components/createUser";
import CreateOrders from "../components/createOrders";
import CreateProduct from "../components/createProduct";
import { Domain } from "../services/urls";

export default function DashBoard() {
  const [activeTab, setActiveTab] = useState("tab1");
  const handlerTab1 = () => {
    setActiveTab("tab1");
  };
  const handlerTab2 = () => {
    setActiveTab("tab2");
  };
  const handlerTab3 = () => {
    setActiveTab("tab3");
  };

  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  useEffect(() => {
    fetch(Domain + "/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${sessionStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (response.status == 200) {
        console.log("Seccion activa");
      } else {
        sessionStorage.clear();
      }
      return response.json();
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col h-screen w-full">
        <div className="flex  w-full bg-base-200 pt-24">
          <ul className="flex flex-row w-screen justify-between space-y-0 transition-all">
            <li
              onClick={handlerTab1}
              className={
                activeTab == "tab1"
                  ? "flex justify-center w-full items-center rounded-lg shadow-sm lg:justify-start bg-neutral-600 text-base-100 lg:rounded-lg lg:shadow-md p-4 "
                  : "flex justify-center w-full items-center lg:justify-start rounded-lg shadow-sm p-4 hover:bg-base-300"
              }
            >
              Usuarios
            </li>
            <li
              onClick={handlerTab2}
              className={
                activeTab == "tab2"
                  ? "flex justify-center w-full items-center rounded-lg shadow-sm lg:justify-start bg-neutral-600 text-base-100 lg:rounded-lg lg:shadow-md p-4"
                  : "flex justify-center w-full items-center lg:justify-start rounded-lg shadow-sm p-4 hover:bg-base-300"
              }
            >
              Productos
            </li>
            <li
              onClick={handlerTab3}
              className={
                activeTab == "tab3"
                  ? "flex justify-center w-full items-center rounded-lg shadow-sm lg:justify-start bg-neutral-600 text-base-100 lg:rounded-lg lg:shadow-md p-4"
                  : "flex justify-center w-full items-center lg:justify-start rounded-lg shadow-sm p-4 hover:bg-base-300"
              }
            >
              Ordenes
            </li>
          </ul>
        </div>
        <div className="flex flex-col w-screen p-8">
          {activeTab == "tab1" ? (
            <CreateUser />
          ) : activeTab == "tab2" ? (
            <CreateProduct />
          ) : activeTab == "tab3" ? (
            <CreateOrders />
          ) : (
            <h1>hola</h1>
          )}
        </div>
        <div className="w-auto">
          {activeTab == "tab1" ? (
            <Users />
          ) : activeTab == "tab2" ? (
            <Products />
          ) : activeTab == "tab3" ? (
            <Orders />
          ) : (
            <div>
              <h1>Hola soy error</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
