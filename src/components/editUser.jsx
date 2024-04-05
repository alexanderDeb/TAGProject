export const edit_user = (params) => {
  Swal.fire({
    title: "Editar usuario",
    html: `
      <form class="text-left space-y-4">
        <div class="flex flex-col">
          <label class="font-semibold">Nombre</label>
          <input id="name_id" class='input-modal' placeholder="Nombre Usuario" value="${
            params.name
          }"/>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold">Apellido</label>
          <input id="last_name_id" class='input-modal' placeholder="Nombre Usuario" value="${
            params.last_name
          }"/>
        </div>
        <div class="flex flex-col">
          <label class="font-semibold">Username</label>
          <input id="username_id" class='input-modal' placeholder="Nombre Usuario" value="${
            params.username
          }"/>
        </div>
        <div class="flex flex-col space-y-2">
          <label class="font-semibold">Roles</label>
          <select id="group_id" class="select-modal" value="${groups}" onChange=${(
      e
    ) => setGroups(e.target.value)}>
              <option>seleccionar rol</option>
                ${roles.map(
                  (role) =>
                    `<option key=${role.id} value=${role.id}>${role.name}</option>`
                )}
          </select>
        </div>
        <div class="flex flex-row justify-between">
          <div>
            <label class="font-semibold">Desbloquear Usuario</label>
            <div class="flex flex-row items-center space-x-3">
              <input class="" id="unlock_user_id" value="0" type="checkbox">
              <p>Borrar Intentos</p>
            </div>
          </div>
          <div class="">
            <label class="font-semibold">Estado del Usuario</label>
            <div class="flex flex-row items-center space-x-3">
              <input class="" type="checkbox">
              <p>Activo</p>
            </div>
            <div class="flex flex-row items-center space-x-3">
              <input class="" type="checkbox">
              <p>Inactivo</p>
            </div>
          </div>
        </div>
      </form>
      `,
    focusConfirm: false,
    allowOutsideClick: true,
    backdrop: true,
    preConfirm: () => {
      const name = document.getElementById("name_id").value;
      const last_name = document.getElementById("last_name_id").value;
      const username = document.getElementById("username_id").value;
      const groups = document.getElementById("group_id").value;
      const state = document.getElementById("unlock_user_id").value;
      const credentials = { username, name, state, last_name, groups };
      try {
        fetch(users_URL + params.id + "/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify(credentials),
        }).then(async function (response) {
          console.log(credentials);
          if (response.status === 200) {
            console.log("pai si funciono");
            Swal.fire({
              title: "success!",
              text: "Se edito correctamente el usuario!",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
            {
              edited ? not_edited() : yes_edited();
            }
          } else {
            Swal.fire({
              title: "ERROR!",
              text: "No tiene permisos para editar usuarios!",
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
  });
};
