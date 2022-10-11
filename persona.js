let personas = JSON.parse(localStorage.getItem("personas")) ?? [];
let editando = false;
let indiceEditado;

let validarCedula = (cedula) => {
    return personas.some(element => element.cedula === cedula);
}

let calcularEdad = fecha => {
    let hoy = (new Date().toLocaleDateString()).split("/").map(e => parseInt(e));
    let nacimiento = (fecha.split("-")).map(e => parseInt(e)).reverse();
    let edad = hoy[2] - nacimiento[2];
    if((hoy[1] <= nacimiento[1])){
        if(hoy[0] < nacimiento[0]){
            --edad;
        }
    }
    return edad;
}

let guardarPersona = (nombre,cedula,edad,profesion,nacimiento) => {
    let persona = {
        nombre,
        cedula,
        edad,
        profesion,
        nacimiento
    };
    personas.push(persona);
    localStorage.setItem("personas", JSON.stringify(personas));
};

let eliminar = (cedula) => {
    let bandera = confirm("¿Estás seguro?");
    let nuevoArray = [];
    if(bandera == true){
        nuevoArray = personas.filter(element => element.cedula != cedula);
        personas = nuevoArray;
        localStorage.setItem("personas", JSON.stringify(personas));
        location.reload();
    }
}

let editar = (cedula) => {
    editando = true;
    
    let indice = personas.findIndex(element => element.cedula == cedula);
    let personaEditada = personas[indice];
    document.getElementById("nombre").value = personaEditada.nombre;
    document.getElementById("cedula").value = personaEditada.cedula;
    document.getElementById("nacimiento").value = personaEditada.nacimiento;
    document.getElementById("profesion").value = personaEditada.profesion;
    document.getElementById("submit").innerHTML = "Editar Datos"

    indiceEditado = indice;
}

let entablar = () => {
    let tabla = ``
    personas.forEach(element => {
            tabla += `
            <tr>
                <td>${element.nombre}</td>
                <td>${element.cedula}</td>
                <td>${element.edad}</td>
                <td>${element.profesion}</td>
                <td>
                    <button id="editar" type="button" onclick="editar(${element.cedula})">Editar</button>
                    <button id="eliminar" type="button" onclick="eliminar(${element.cedula})">Eliminar</button>
                </td>
            </tr>`
    });
    document.getElementById("tabla").innerHTML = tabla;
};

let formulario = document.getElementById("formulario");

entablar();

formulario.addEventListener("submit", (e) => {
    e.preventDefault

    let cedula = document.getElementById("cedula").value;
    let nombre = document.getElementById("nombre").value;
    let nacimiento = document.getElementById("nacimiento").value;
    let profesion = document.getElementById("profesion").value;
    let edad = calcularEdad(nacimiento);

    if(editando === false){
        if(!validarCedula(cedula)){      
            guardarPersona(nombre,cedula,edad,profesion,nacimiento);  
        } else {
            alert("Cedula ya registrada");
        }
    } else {
        alert("Datos editados");
        personas[indiceEditado] = {nombre,cedula,edad,profesion,nacimiento};
        localStorage.setItem("personas", JSON.stringify(personas));
    }


});