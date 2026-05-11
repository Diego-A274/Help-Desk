
function cambiarEstado(elemento) {
    const estados = [
        { texto: 'Nuevo', clase: 'status-nuevo' },
        { texto: 'En Progreso', clase: 'status-progreso' },
        { texto: 'Resuelto', clase: 'status-resuelto' }
    ];

    let indiceActual = estados.findIndex(estado => estado.texto === elemento.innerText);
    
    let siguienteIndice = (indiceActual + 1) % estados.length;
    let nuevoEstado = estados[siguienteIndice];

    elemento.innerText = nuevoEstado.texto;
    elemento.className = 'badge ' + nuevoEstado.clase;
}

document.getElementById('searchInput').addEventListener('keyup', function(e) {
    let terminoBusqueda = e.target.value.toLowerCase();
    let filasTickets = document.querySelectorAll('#ticketTableBody tr');

    filasTickets.forEach(fila => {
        let asunto = fila.cells[1].innerText.toLowerCase(); 
        
        if (asunto.includes(terminoBusqueda)) {
            fila.style.display = ''; // Mostrar
        } else {
            fila.style.display = 'none'; // Ocultar
        }
    });
});