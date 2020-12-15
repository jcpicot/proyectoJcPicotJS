export function obtenerListaUsuarios() {
    var listaUsuarios = JSON.parse(localStorage.getItem('listaUsuariosLs'));
    if (listaUsuarios == null) {
      listaUsuarios =
        [
          ['1', 'picot', '123'],
          ['2', 'juan', '1234']
        ]
    }
    return listaUsuarios;
  
  }
  export function validarUsuario(unombre, ucontra) {
    var listaUsuarios = obtenerListaUsuarios();
    var acceso = false;
    for (var i = 0; i < listaUsuarios.length; i++) {
      if (unombre == listaUsuarios[i][1] && ucontra == listaUsuarios[i][2]) {
        acceso = true;
      }
    }
    return acceso;
  }