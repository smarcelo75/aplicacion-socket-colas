const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }

    getUltimo4Ticket() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        // Tomo el numero de ticket del primer elemento del array
        let numeroTicket = this.tickets[0].numero;
        // Elimino el primer elemento del array
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        // grabo el nuevo ticket en la primer posicion del array
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            // Elimino el ultimo elemento del array
            this.ultimos4.splice(-1, 1);
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();
        return atenderTicket;
    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${ this.ultimo }`;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDatastring = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDatastring);
    }

}

module.exports = {
    TicketControl
}