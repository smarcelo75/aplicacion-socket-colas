// Comando para establecer la conexion
var socket = io();
var labelTicket = $('#lblNuevoTicket');

// escuchar conexión
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// escuchar desconexión
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('estadoActual', function(data) {
    labelTicket.text(data.ticketActual);
});

// jquery: activa la escucha del evento click de los botones
$('button').on('click', function() {
    socket.emit('siguienteTicket', function(siguienteTicket) {
        console.log(siguienteTicket);
        labelTicket.text(siguienteTicket);
    });
});