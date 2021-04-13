let pagina = 1;

document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  mostrarservicios();

  //resalta el Div actual segun el tab al que se le presiona
  mostrarSeccion();

  // oculta o muestra una seccion segun el tab al que se presiona
  cambiarSeccion();

  //paginacion

  paginaSiguiente();
  paginaAnterior();

  botonesPaginador();
}

function mostrarSeccion() {
  //eliminar mostrar-seccion de la seccion actual
  const seccionAnterior = document.querySelector(".mostrar-seccion");
  if (seccionAnterior) {
    seccionAnterior.classList.remove("mostrar-seccion");
  }

  const seccionActual = document.querySelector(`#paso-${pagina}`);
  seccionActual.classList.add("mostrar-seccion");

  //eliminar el clase actual

  const tabAnterior = document.querySelector(".tabs .actual");
  if (tabAnterior) {
    tabAnterior.classList.remove("actual");
  }

  //resalta el tab actual
  const tab = document.querySelector(`[data-paso="${pagina}"]`);
  tab.classList.add("actual");
}

function cambiarSeccion() {
  const enlaces = document.querySelectorAll(".tabs button");

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", (e) => {
      e.preventDefault();
      pagina = parseInt(e.target.dataset.paso);

      mostrarSeccion();
      botonesPaginador();
    });
  });
}

async function mostrarservicios() {
  try {
    const resultado = await fetch("./servicios.json");
    const db = await resultado.json();
    const { servicios } = db;

    //generando html

    servicios.forEach((servicio) => {
      const { id, nombre, precio } = servicio;

      //DOM
      const nombreServicio = document.createElement("P");
      nombreServicio.textContent = nombre;
      nombreServicio.classList.add("nombre-servicio");

      const precioServicio = document.createElement("P");
      precioServicio.textContent = `L. ${precio}`;
      precioServicio.classList.add("precio-servicio");

      const servicioDiv = document.createElement("DIV");
      servicioDiv.classList.add("servicio");
      servicioDiv.dataset.idServicio = id;

      //selecciona un servicio para la cita

      servicioDiv.onclick = seleccionarServicio;

      servicioDiv.appendChild(nombreServicio);
      servicioDiv.appendChild(precioServicio);

      const domServicios = document.querySelector("#servicios");
      domServicios.appendChild(servicioDiv);
    });
  } catch (error) {
    console.log(error);
  }
}

function seleccionarServicio(e) {
  let elemento;
  if (e.target.tagName === "P") {
    elemento = e.target.parentElement;
  } else {
    elemento = e.target;
  }

  if (elemento.classList.contains("seleccionado")) {
    elemento.classList.remove("seleccionado");
  } else {
    elemento.classList.add("seleccionado");
  }
}

function paginaSiguiente() {
  const paginaSiguiente = document.querySelector("#siguiente");
  paginaSiguiente.addEventListener("click", (page) => {
    pagina++;
    console.log(pagina);
    botonesPaginador();
  });
}

function paginaAnterior() {
  const paginaAnterior = document.querySelector("#anterior");
  paginaAnterior.addEventListener("click", (page) => {
    pagina--;
    console.log(pagina);
    botonesPaginador();
  });
}

function botonesPaginador() {
  const paginaSiguiente = document.querySelector("#siguiente");
  const paginaAnterior = document.querySelector("#anterior");

  /* if (pagina === 1) {
    paginaAnterior.classList.add("ocultar");
  } else if (pagina === 3) {
    paginaAnterior.classList.remove("ocultar");
    paginaSiguiente.classList.remove("ocultar");
} else {
    paginaSiguiente.classList.add("ocultar");
    paginaAnterior.classList.remove("ocultar");
  }
  */
  switch (pagina) {
    case 1: {
      paginaAnterior.classList.add("ocultar");
      break;
    }
    case 2: {
      paginaAnterior.classList.remove("ocultar");
      paginaSiguiente.classList.remove("ocultar");
      break;
    }
    default: {
      paginaSiguiente.classList.add("ocultar");
      paginaAnterior.classList.remove("ocultar");
    }
  }

  mostrarSeccion();
}
