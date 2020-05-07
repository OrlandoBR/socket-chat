//La clase Usuarios se encargara de todos los usuarios conectados
class Usuarios {

    //Inicialza variables
    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {

        let persona = {
            id,
            nombre,
            sala
        };

        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id) {
        console.log('Arreglo de PERSONAS ', this.personas);
        let persona = this.personas.filter(persona => { return persona.id === id })[0]; //[0] para que me tome solo el primer registro.

        return persona;
    }

    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala)
        return personasEnSala;
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);

        return personaBorrada;
    }

}

module.exports = {
    Usuarios
}