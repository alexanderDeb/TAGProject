import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

export default function TableUsers(props) {

  const handlerDeleteButton = (e) => {
    const Valor = e.currentTarget.getAttribute("data-value")
    console.log(Valor);
  };

  return (
    <div className="overflow-x-auto h-96">
      <table className="table table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.props.map((x) => {
            return (
              <tr>
                <td>{x.name}</td>
                <td>{x.email}</td>
                {x.status == true ? (
                  <td className="text-success">Activo</td>
                ) : (
                  <td className="text-error">Inactivo</td>
                )}
                <td>{x.role}</td>
                <th className="flex flex-row space-x-2">
                  <button
                    className="btn btn-ghost btn-md"
                    onClick={handlerDeleteButton}
                    data-value={x}
                  >
                    <FaRegEdit />
                  </button>
                  <button className="btn btn-ghost btn-md">
                    <FaTrashAlt />
                  </button>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
