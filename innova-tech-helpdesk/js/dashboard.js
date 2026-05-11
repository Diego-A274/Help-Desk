function cambiarEstado(elemento) {
  const estados = [
    { texto: "Nuevo", clase: "status-nuevo" },
    { texto: "En Progreso", clase: "status-progreso" },
    { texto: "Resuelto", clase: "status-resuelto" },
  ];

  let indiceActual = estados.findIndex(
    (estado) => estado.texto === elemento.innerText,
  );

  let siguienteIndice = (indiceActual + 1) % estados.length;
  let nuevoEstado = estados[siguienteIndice];

  elemento.innerText = nuevoEstado.texto;
  elemento.className = "badge " + nuevoEstado.clase;
}
let filaActual = null;
let estadoSeleccionado = null;

function abrirModal(btn, id, asunto) {
  filaActual = btn.closest("tr");
  const estadoActual = filaActual
    .querySelector("td:nth-child(5) .badge")
    .textContent.trim();

  document.getElementById("modalTicketInfo").innerHTML =
    `<strong>${id}</strong> — ${asunto}`;

  document.querySelectorAll(".estado-opcion").forEach((op) => {
    op.classList.toggle("selected", op.dataset.estado === estadoActual);
  });
  estadoSeleccionado = document.querySelector(".estado-opcion.selected");

  document.getElementById("modalOverlay").classList.add("active");
}

function cerrarModal() {
  document.getElementById("modalOverlay").classList.remove("active");
  filaActual = null;
  estadoSeleccionado = null;
}

function seleccionarEstado(el) {
  document
    .querySelectorAll(".estado-opcion")
    .forEach((op) => op.classList.remove("selected"));
  el.classList.add("selected");
  estadoSeleccionado = el;
}

function guardarEstado() {
  if (!filaActual || !estadoSeleccionado) return;
  const badge = filaActual.querySelector("td:nth-child(5) .badge");
  badge.textContent = estadoSeleccionado.dataset.estado;
  badge.className = "badge " + estadoSeleccionado.dataset.clase;
  cerrarModal();
}

document.addEventListener("click", (e) => {
  if (e.target.id === "modalOverlay") cerrarModal();
});

document.getElementById("searchInput").addEventListener("keyup", function (e) {
  let terminoBusqueda = e.target.value.toLowerCase();
  let filasTickets = document.querySelectorAll("#ticketTableBody tr");

  filasTickets.forEach((fila) => {
    let asunto = fila.cells[1].innerText.toLowerCase();

    if (asunto.includes(terminoBusqueda)) {
      fila.style.display = ""; // Mostrar
    } else {
      fila.style.display = "none"; // Ocultar
    }
  });
});
