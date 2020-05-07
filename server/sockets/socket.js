const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios')
const { crearMensaje } = require('../utilidades/utilidades')


const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, call) => {

        if (!data.nombre || !data.sala) {
            return call({
                error: true,
                mensaje: 'El nombre y sala son necesarios'
            })
        }

        //JOIN se ocupa para unirse a una SALA
        client.join(data.sala);

        usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));

        call(usuarios.getPersonasPorSala(data.sala));

    })

    client.on('crearMensaje', (data) => {

        let persona = usurarios.getPersona(client.id)

        let mensaje = crearMensaje(persona, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

    })

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Admin', `${personaBorrada.nombre} salió`))
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
    })

    //El servidor escucha cuando un usuario manda un mensjae privado.
    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id);
        //Aunque es broadcast con la funcion .to se especifica el id del usuario al que se el envia el mensaje
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    })

});