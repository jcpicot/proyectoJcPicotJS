export function inicio() {
    document.getElementById('paginas').innerHTML += `<div class="panel">
      <div class="panel__media">
          <img src="./imagenes/983277-golden-state-warriors-nba-basketball-748x421.jpg" alt="Torneos">
      </div>
      <div class="panel__content">
          <h1 class="huno">Torneos</h1>
          <p class="pe">Crea tus propios torneos de distintas formas con tus equipos favoritos de la NBA y observa quien gana!</p>
      </div>
  </div>
  
  <div class="panel">
      <div class="panel__media">
          <img src="./imagenes/45-458744_penny-hardaway.jpg" alt="Equipos">
      </div>
      <div class="panel__content">
          <h1 class="huno">Equipos</h1>
          <p class="pe">Busca entre todos los equipos de la NBA y visita sus páginas oficiales para analizar cuáles prefieres para tu torneo!</p>
      </div>
  </div>
  <div class="panel">
      <div class="panel__media">
          <img src="./imagenes/128981-basketball-748x421.jpg" alt="Minijuegos">
      </div>
      <div class="panel__content">
          <h1 class="huno">Minijuegos</h1>
          <p class="pe">Juega a nuestros minijuegos y diviertete. Puedes tratar de encestar el máximo número de canastas o adivinar la posición de los equipos NBA, disfruta!</p>
      </div>
  </div>
  `;
  }

  export function login() {
    document.getElementById('paginas').innerHTML += `
      <div class="login">
        <h2 class="active"> sign in </h2>
        <form>
          <input type="text" id="userna" class="text" name="username">
           <span>username</span>
          <br> 
          <br>
          <input type="password" id="pass" class="text" name="password">
          <span>password</span>
          <br>
          <p id="fallologin" style="color:red;"></p>
          <p id="fallologin2" style="color:red;"></p>
  
          <br> 
          <button class="signin">
            Sign In
          </button>
          </form>
      </div>`
  }

  export function cargando() {
    document.getElementById('paginas').innerHTML += `
    <div id="loader-wrapper">
      <div class="floor"></div>
      <div class="ball">
        <div class="ball-line"></div>
        <div class="ball-line"></div>
        <div class="ball-line"></div>
        <div class="ball-line"></div>
      </div>
    </div>`
  }

  export function clear() {
    document.getElementById('paginas').innerHTML = '';
  
  }
  export function barra() {
    let pagbarra = document.getElementById('paginas');
    pagbarra.innerHTML += ` <nav id="navegacio">
    <ul class="barraul">
      <li class="barrali" id="inicio">Inicio</li>
      <li class="barrali" id="torneo">Torneo</li>
      <li class="barrali" id="equipos">Equipos</li>
      <li class="barrali" id="minijuego">Minijuegos</li>
      <li class="barrali" id="logout">Logout</li>
    </ul>
    </nav>`
  }