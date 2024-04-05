import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import TableUsers from "./tableUsers";

export default function Users() {
  const { Data, Error } = useFetch("/users", "GET", { "": "" });
  return (
    <div className="flex justify-center">
      <div className="w-3/4">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-white pb-4">
            Usuarios
          </h2>
          {Data ? (
            <TableUsers props={Data} />
          ) : Error ? (
            <div className="flex justify-center space-y-2">
              <h1>{Error}</h1>
              <span className="loading loading-infinity loading-lg"></span>
            </div>
          ) : (
            <div className="flex justify-center">
              <span className="loading loading-infinity loading-lg"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
