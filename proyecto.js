//Control del DOM y llamada a las páginas
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
   
    login();
    dom();
  });
})();
//Pantalla de login
import {login} from './vista.js';
function dom() {
  let boto = document.getElementsByTagName('form')[0];
  boto.addEventListener('submit', (event) => {
    event.preventDefault();
    entrarInicio();

  });
}
function equip() {
  let eq = document.getElementById('equipos');
  eq.addEventListener('click', () => {
    getEquipos();
  });
}

function logout() {
  let log = document.getElementById('logout');
  log.addEventListener('click', () => {
    clear();
    login();
    dom();
  });
}

function tournament() {
  let tor = document.getElementById('torneo');
  tor.addEventListener('click', () => {
    getTorneo();
  });
}
async function getTorneo() {
  clear();
  cargando();
  await torneopromise();
  borrarCargando();
  bototodo();
}
function torneopromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(llamartorneos());
    }, 2000);
  })
}

function logoutpromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(logout());
    }, 2000);
  })
}

async function logoutawait() {
  await logoutpromise();
}

function botoinicio() {
  let botoinici = document.getElementById('inicio');
  botoinici.addEventListener('click', () => {
    getbotoinicio();
  });
}

async function getbotoinicio() {
  clear();
  cargando();
  await getBarraInicio();
  borrarCargando();
}

//INICIO
import {inicio} from './vista.js';


//Funciones para cargar la página de Equipos
function borrarCargando() {
  document.getElementById('loader-wrapper').remove();
}
function getBarraEquipos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(equipos());
    }, 1000);
  });
}
async function getEquipos() {
  clear();
  cargando();
  await getBarraEquipos();
  borrarCargando();
  botoinicio();
  tournament();

}
async function getInicio() {
  cargando();
  await getBarraInicio();
  borrarCargando();
}
function getBarraInicio() {
  return new Promise((resolve) => {
    setTimeout(() => {
      barra(); inicio(); equip(); tournament(); logoutawait();


      resolve();
    }, 2000);
  });
}

import {cargando,clear,barra} from './vista.js';
//import {clear} from './vista.js';
function buscador() {

  let pagbuscador = document.getElementById('paginas');
  function busca() {
    pagbuscador.innerHTML += ` <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="buscador">
      <div class="search-box" id="box-buscador">
        <input type="text" placeholder="Buscar..." class="inputbuscador" id="inputSearch">
        <div class="btnbuscar">
          <i class="fa fa-search" aria-hidden="true"></i>
        </div>
      </div>
    </div>`;

    setTimeout(() => {
      //Efecto buscador
      $(".btnbuscar").click(function () {
        $(".inputbuscador").toggleClass("active").focus;
        $(this).toggleClass("animate");
        $(".inputbuscador").val("");
      });
    }, 50);
  }
  busca();

}

//Efecto cards
function lazyLoad() {
  var card_images = document.querySelectorAll('.card-image');
  card_images.forEach(function (card_image) {
    var image_url = card_image.getAttribute('data-image-full');
    var content_image = card_image.querySelector('img');


    content_image.src = image_url;
    content_image.addEventListener('load', function () {
      card_image.style.backgroundImage = 'url(' + image_url + ')';
      card_image.className = card_image.className + ' is-loaded';
    });

  });

}

//Filtrado de busqueda
function buscador_interno(teams) {
  setTimeout(() => {
    let buscar = document.getElementById('inputSearch');
    buscar.addEventListener('keydown', (e) => {
      const texto = buscar.value.toLowerCase();
      let contenido = '';
      for (i = 0; i < teams.length; i++) {
        if (teams[i].full_name.toLowerCase().includes(texto)) {

          contenido += `
          <li class="card">
            <a class="card-image" href="`+ teams[i].link + `" target="_blank" style=" filter: none; background-image: url(` + teams[i].png + `);" data-image-full="` + teams[i].png + `">
              <img src="`+ teams[i].png + `" />
            </a>
            <a class="card-description" href="`+ teams[i].link + `" target="_blank">
              <h2>`+ teams[i].full_name + `</h2>
              <p>`+ teams[i].conference + `</p>
            </a>
          </li>`;
        }
      }
      document.getElementsByClassName('card-list')[0].innerHTML = contenido;
    })
  }, 2000);



}

//Crear usuarios
import {obtenerListaUsuarios,validarUsuario} from './usuarios.js';


function entrarInicio() {
  let mensaje;
  let data;
  var unombre = '';
  var ucontra = '';
  var acceso = false;
  unombre = document.querySelector('#userna').value;
  ucontra = document.querySelector('#pass').value;
  acceso = validarUsuario(unombre, ucontra);
  if (acceso == true) {
    checkCookie();
    clear();
    getInicio();
    logoutawait();
  } else {
    let pagerror = document.getElementById('fallologin');
    mensaje = "Usuario o contraseña incorrectos";
    pagerror.innerHTML = '';
    pagerror.innerHTML += mensaje;
    data = new Date();
    let pagerror2 = document.getElementById('fallologin2');
    pagerror2.innerHTML = '';
    pagerror2.innerHTML += data;

  }
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var user = getCookie("username");
  if (user != "") {
    alert("Bienvenido de nuevo");
  } else {
    user = document.querySelector('#userna').value;
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}
//Llamada a la API para creación de cards de Equipos
async function equipos() {
  await fetch("https://free-nba.p.rapidapi.com/teams?page=0", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "a48695b6famshf346246aacd1af0p1eb22ejsn31fada541309",
      "x-rapidapi-host": "free-nba.p.rapidapi.com"
    }
  })
    .then(response => response.json())
    .then(dato => {
      barra();
      buscador();
      logoutawait();
      let pagequipos = document.getElementById('paginas');
      pagequipos.innerHTML += `  <div class="container-fluid">
  <div class="row" id="team"></div>
  </div>`;
      let element = document.getElementById('team');
      let { data } = dato;
      console.log(data);
      buscador_interno(data);
      let imagens = ["./imagenes/fotohawks.png", "./imagenes/fotoceltics.png", "./imagenes/fotonets.png", "./imagenes/fotohornets.png", "./imagenes/fotobulls.png", "./imagenes/fotocavaliers.png", "./imagenes/fotomavericks.png", "./imagenes/fotonuggets.png", "./imagenes/fotopistons.png", "./imagenes/fotowarriors.png", "./imagenes/fotorockets.png", "./imagenes/fotopacers.png", "./imagenes/fotoclippers.png", "./imagenes/fotolakers.png", "./imagenes/fotogrizzlies.png", "./imagenes/fotoheat.png", "./imagenes/fotobucks.png", "./imagenes/fototimberwolves.png", "./imagenes/fotopelicans.png", "./imagenes/fotoknicks.png", "./imagenes/fotothunder.png", "./imagenes/fotomagic.png", "./imagenes/foto76ers.png", "./imagenes/fotosuns.png", "./imagenes/fotoblazers.png", "./imagenes/fotokings.png", "./imagenes/fotospurs.png", "./imagenes/fotoraptors.png", "./imagenes/fotojazz.png", "./imagenes/fotowizards.png"]
      let enlaces = ["https://www.nba.com/hawks/", "https://www.nba.com/celtics/", "https://www.nba.com/nets/", "https://www.nba.com/hornets/", "https://www.nba.com/bulls/", "https://www.nba.com/cavaliers/", "https://www.nba.com/mavericks/", "https://www.nba.com/nuggets/", "https://www.nba.com/pistons/", "https://www.nba.com/warriors/", "https://www.nba.com/rockets/", "https://www.nba.com/pacers/", "https://www.nba.com/clippers/", "https://www.nba.com/lakers/", "https://www.nba.com/grizzlies/", "https://www.nba.com/heat/", "https://www.nba.com/bucks/", "https://www.nba.com/timberwolves/", "https://www.nba.com/pelicans/", "https://www.nba.com/knicks/", "https://www.nba.com/thunder/", "https://www.nba.com/magic/", "https://www.nba.com/sixers/", "https://www.nba.com/suns/", "https://www.nba.com/blazers/", "https://www.nba.com/kings/", "https://www.nba.com/spurs/", "https://www.nba.com/raptors/", "https://www.nba.com/jazz/", "https://www.nba.com/wizards/"]

      imagens.forEach((element, i) => data[i].png = element);
      enlaces.forEach((element, i) => data[i].link = element);

      let carta = '<ul class="card-list"></ul>';
      document.getElementById('team').innerHTML += carta;
      data.forEach(element => {

        document.getElementsByClassName('card-list')[0].innerHTML += `
  <li class="card">
    <a class="card-image" href="`+ element.link + `" target="_blank" style="background-image: url(` + element.png + `);" data-image-full="` + element.png + `">
      <img src="`+ element.png + `" />
    </a>
    <a class="card-description" href="`+ element.link + `" target="_blank">
      <h2>`+ element.full_name + `</h2>
      <p>`+ element.conference + `</p>
    </a>
  </li>`;
        setTimeout(lazyLoad, 400);
      });

    })
    .catch(err => console.log(err))
}

//Creación seleccionador de torneos

class Torneo {
  constructor(id, nombre, numEquipos, foto, descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.numEquipos = numEquipos;
    this.foto = foto;
    this.descripcion = descripcion;
  }
  dibujarCartas() {

    let pagCartaTorneo = `<div id="opt${this.id}" class="cartatorneo">
        <div class="colcartatorneo">
             <div class="colcarta" ontouchstart="this.classList.toggle('hover');">
                <div class="contenedorcarta">
                   <div class="delante" style="background-image: url(${this.foto})">
                      <div class="inner">
                         <p>OPCIÓN ${this.id}</p>
                  <span>${this.nombre}</span>
                      </div>
                   </div>
                   <div class="detras">
                      <div class="inner">
                        <p>${this.descripcion}</p>
                      </div>
                   </div>
                </div>
                <button id="botontorneo${this.id}">CREAR</button>
             </div>
        </div>
        `;
    if (document.querySelector('.container') == null) {
      let pagcartastorneo = document.createElement('div');
      pagcartastorneo.setAttribute('class', 'container');
      let pagcartastorneo2 = document.createElement('div');
      pagcartastorneo2.setAttribute('class', 'row');
      pagcartastorneo2.innerHTML += pagCartaTorneo;
      pagcartastorneo.appendChild(pagcartastorneo2);
      return pagcartastorneo;

    } else {
      let pagcartastorneo = document.querySelector('.row');
      pagcartastorneo.innerHTML += pagCartaTorneo;
      return pagcartastorneo;
    }

  }
}


function llamartorneos() {
  barra();
  logoutawait();
  botoinicio();
  equip();
  let torneos = [];
  let jsontorneos = `[
    {"id":"1","nombre":"TODOS CONTRA TODOS","numEquipos":"16","foto":"https://s.yimg.com/uu/api/res/1.2/WmPQ.aFAL0Sf.ZDbTurp7g--~B/aD0xMDY3O3c9MTYwMDthcHBpZD15dGFjaHlvbg--/https://o.aolcdn.com/hss/storage/midas/6dc7d367151f10b23aaa296845a1323/205096603/nba-jam-ed.jpg","descripcion":"Aquí puedes ver enfrentados a los mejores equipos de la NBA en una lucha por el primer puesto!","ordenEquipos":"Random"},
    {"id":"2","nombre":"EMPAREJAMIENTOS","numEquipos":"16","foto":"https://venturebeat.com/wp-content/uploads/2018/03/nbajam.jpg?fit=1920%2C1080&strip=all","descripcion":"Crea tus propios equipos y enfréntalos para ver quién resulta ser el ganador!"}
  ]`;

  jsontorneos = JSON.parse(jsontorneos);

  for (let pagcartastorneo of jsontorneos) {
    torneos.push(new Torneo(pagcartastorneo.id, pagcartastorneo.nombre, pagcartastorneo.numEquipos, pagcartastorneo.foto, pagcartastorneo.descripcion, pagcartastorneo.ordenEquipos));
  }

  for (let pagcartastorneo of torneos) {
    let torneoElement = pagcartastorneo.dibujarCartas();
    let insertarcartas = document.getElementById('paginas');
    insertarcartas.appendChild(torneoElement);
  }
  let bototorneo = document.getElementById('botontorneo1');
  bototorneo.addEventListener('click', () => {
  tabla = `<section class="secciontorneo">
  <h1 class="titulotorneo">TORNEO NBA RANDOM</h1>
  <div class="tbl-header">
    <table class="tablatorneo" cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
          <th class="barratorneo">RONDA</th>
          <th class="barratorneo">LOCAL</th>
          <th class="barratorneo">VISITANTE</th>
          <th class="barratorneo">CIUDAD</th>
          <th class="barratorneo">RESULTADO</th>
        </tr>
      </thead>
    </table>
  </div>`;
   });
}




function torneoequipos() {
  return new Promise((resolve) => {
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {

      if (this.readyState === this.DONE) {
        let equipostorneo = JSON.parse(this.responseText);
        resolve(desordenar(equipostorneo.data));
      }
    });
    xhr.open("GET", "https://free-nba.p.rapidapi.com/teams?page=0");
    xhr.setRequestHeader("x-rapidapi-key", "a071df9475msh4e49e0eec9aabd3p1ca5fcjsn5058fd9512d4");
    xhr.setRequestHeader("x-rapidapi-host", "free-nba.p.rapidapi.com");

    xhr.send(data);
  })

}


function desordenar(numeros) {
  var desordenado = []
  while (true) {
    if (!numeros.length) { break }
    var sacado = numeros.shift()
    var aleatorio = Math.floor(Math.random() * (desordenado.length + 1))
    var inicio = desordenado.slice(0, aleatorio)
    var medio = sacado
    var fin = desordenado.slice(aleatorio, desordenado.length)
    desordenado = (inicio).concat(medio).concat(fin)
  }
  return desordenado
}
class Equipo {
  constructor(abbreviation, city, conference, division, full_name, id, name) {
    this.abbreviation = abbreviation;
    this.city = city;
    this.conference = conference;
    this.division = division;
    this.full_name = full_name;
    this.id = id;
    this.name = name;
  }
}

class Partido {
  constructor(casa, fuera,ronda) {
    this.casa = casa;
    this.fuera = fuera;
    this.resultatcasa = 0;
    this.resultatfuera = 0;
    this.ronda = ronda;
  }


  jugarpartido() {

    this.resultatcasa = Math.floor(Math.random() * 40 + 80);
    this.resultatfuera = Math.floor(Math.random() * 40 + 80);
    if (this.resultatcasa == this.resultatfuera) {
      let numrandom = Math.random();
      if (numrandom > 0.5) {
        this.resultatcasa += 1;
      } else {
        this.resultatfuera += 1;
      }
    }
  }



}

class Ganador extends Equipo {
  constructor(abbreviation, city, conference, division, full_name, id, name) {
    super(abbreviation, city, conference, division, full_name, id, name);
  }
}

let partidos;
let tabla;
let e;
let jugar;
async function equipobracket() {

  let _equipos = [];
  for (e of await torneoequipos()) {
    _equipos.push(new Equipo(e.abbreviation, e.city, e.conference, e.division, e.full_name, e.id, e.name));

  }

  //console.log(_equipos);
  partidos = [];
  partidos.push(new Partido(_equipos[0], _equipos[1],"Octavos"), new Partido(_equipos[2], _equipos[3],"Octavos"), new Partido(_equipos[4], _equipos[5],"Octavos"), new Partido(_equipos[6], _equipos[7],"Octavos"), new Partido(_equipos[8], _equipos[9],"Octavos"), new Partido(_equipos[10], _equipos[11],"Octavos"), new Partido(_equipos[12], _equipos[13],"Octavos"), new Partido(_equipos[14], _equipos[15],"Octavos"));
  octavos();
}
function octavos() {
  for (jugar of partidos) {
    jugar.jugarpartido();;
    

  }
  //console.log(partidos);

  let winner = partidos.map(x => {
    if (x.resultatcasa > x.resultatfuera) {

      return new Ganador(x.casa.abbreviation, x.casa.city, x.casa.conference, x.casa.division, x.casa.full_name, x.casa.id, x.casa.name);
    } else {
      return new Ganador(x.fuera.abbreviation, x.fuera.city, x.fuera.conference, x.fuera.division, x.fuera.full_name, x.fuera.id, x.fuera.name);
    }


  });

  contenidotorneo();
  //console.log(winner);
  /*let partidocuartos = [];*/
  partidos = [];
  partidos.push(new Partido(winner[0], winner[1],"Cuartos"), new Partido(winner[2], winner[3],"Cuartos"), new Partido(winner[4], winner[5],"Cuartos"), new Partido(winner[6], winner[7],"Cuartos"));
  cuartos();
}
function cuartos() {

  for (jugar of partidos) {
    jugar.jugarpartido();
  }
  //console.log(partidos);

  let winnercuartos = partidos.map(x => {
    if (x.resultatcasa > x.resultatfuera) {

      return new Ganador(x.casa.abbreviation, x.casa.city, x.casa.conference, x.casa.division, x.casa.full_name, x.casa.id, x.casa.name);
    } else {
      return new Ganador(x.fuera.abbreviation, x.fuera.city, x.fuera.conference, x.fuera.division, x.fuera.full_name, x.fuera.id, x.fuera.name);
    }


  });
  contenidotorneo();
  /*let partidosemis = [];*/
  partidos = [];
  partidos.push(new Partido(winnercuartos[0], winnercuartos[1],"Semifinales"), new Partido(winnercuartos[2], winnercuartos[3],"Semifinales"));
  semifinales();
}

function semifinales() {

  for (jugar of partidos) {
    jugar.jugarpartido();
  }
  //console.log(partidos);
  let winnersemis = partidos.map(x => {
    if (x.resultatcasa > x.resultatfuera) {
      return new Ganador(x.casa.abbreviation, x.casa.city, x.casa.conference, x.casa.division, x.casa.full_name, x.casa.id, x.casa.name);
    } else {
      return new Ganador(x.fuera.abbreviation, x.fuera.city, x.fuera.conference, x.fuera.division, x.fuera.full_name, x.fuera.id, x.fuera.name);
    }
  });
  contenidotorneo();
  //console.log(winnersemis);
  /*let partidofinal = [];*/
  partidos = [];
  partidos.push(new Partido(winnersemis[0], winnersemis[1],"Final"));
  final();
}

function final() {

  for (jugar of partidos) {
    jugar.jugarpartido();
  }
 

  //console.log(winnerfinal);
  contenidotorneo();
  
}
 
function creartorneo() {
tabla = `<section class="secciontorneo">
<h1 class="titulotorneo">TORNEO NBA RANDOM</h1>
<div class="tbl-header">
  <table class="tablatorneo" cellpadding="0" cellspacing="0" border="0">
    <thead>
      <tr>
        <th class="barratorneo">RONDA</th>
        <th class="barratorneo">LOCAL</th>
        <th class="barratorneo">VISITANTE</th>
        <th class="barratorneo">CIUDAD</th>
        <th class="barratorneo">RESULTADO</th>
      </tr>
    </thead>
  </table>
</div>`;
}

function cerrartorneo() {
tabla+=`</section>`;
document.querySelector('.row').innerHTML+=tabla;
}

function contenidotorneo() {
partidos.forEach(element => {
  tabla += ` <div class="tbl-content">
  <table class="tablatorneo" cellpadding="0" cellspacing="0" border="0">
    <tbody>
      <tr>
        <td class="contenidotorneo">${element.ronda}</td>
        <td class="contenidotorneo">${element.casa.full_name}</td>
        <td class="contenidotorneo">${element.fuera.full_name}</td>
        <td class="contenidotorneo">${element.casa.city}</td>
        <td class="contenidotorneo">${element.resultatcasa}-${element.resultatfuera}</td>
      </tr>
    </tbody>
  </table>
</div>`
})
}

async function todo() {
  creartorneo();
  await equipobracket();
  cerrartorneo();
}

function bototodo() {
  let bototorneo = document.getElementById('botontorneo1');
  bototorneo.addEventListener('click', () => {
    todo();
   });
}
