const formulario = document.getElementById("formulario");
const tipoSolicitud = document.getElementById("tipoSolicitud");


const campoAusencia = document.getElementById("campoAusencia");
const campoReunion = document.getElementById("CampoReunion");
const campoApoyo = document.getElementById("campoApoyo");

const mensajeRespuesta = document.getElementById("mensajeRespuesta");
const resumen = document.getElementById("resumen");
const datosResumen = document.getElementById("datosResumen");

tipoSolicitud.addEventListener("change", function () {
campoAusencia.style.display = "none";
campoReunion.style.display = "none";
campoApoyo.style.display = "none";

if (tipoSolicitud.value === "Justificacion de Ausencia"){
    campoAusencia.style.display = "block"
}

if (
    tipoSolicitud.value === "Reunion con docente" ||
    tipoSolicitud.value === "Reunion con orientacion"
){
    campoReunion.style.display = "block";
}

if (tipoSolicitud.value === "Apoyo educativo"){
    campoApoyo.style.display = "block";
}
})

formulario.addEventListener("submit", function (evento){
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const identificacion = document.getElementById("Direccion").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const nivel = document.getElementById("Nacionalidad").value.trim();
    const seccion = document.getElementById("seccion").value.trim();
    const jornada = document.getElementById("Genero").value.trim();

    const encargado = document.getElementById("encargado").value.trim();
    const parentesco = document.getElementById("parentesco").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();

    const solicitud = document.getElementById("solicitud").value.trim();
    const urgencia = document.getElementById("urgencia").value.trim();
    const detalle = document.getElementById("detalle").value.trim();

    const autorizacion = document.getElementById("autorizacion").value.trim();
    const veracidad = document.getElementById("veracidad").value.trim();

    if (
        nombre === "" ||
        identificacion === "" ||
        edad === "" ||
        nivel === ""||
        seccion === ""||
        jornada === "" ||
        encargado === "" ||
        parentesco === "" ||
        telefono === "" ||
        correo === "" ||
        solicitud === "" ||
        urgencia === "" ||
        detalle === "" ||
    ) {
        mostrarMensaje("Por todos los campos obligatorios.", "error");
        resumen.style.display = "none"
        return;
    }

    if(edad < 5 || edad > 80){
        mostrarMensaje("La edad debe estar entre y 80 años","error");
        resumen.style.display = "none";
        return;
    }

    if (IvalidarCorreo(correo)){
        mostrarMensaje("Digite un correo elctronico valido", "error");
        resumen.style.display = "none";
        return;
    }
    
    if (!autorizacion || !veracidad){
        mostrarMensaje("Debe aceptar las autorizaciones para enviar el fomulario.", "error")
        resumen.style.display = "none"
        return;
    }

    let areasApoyo = [];
    const checkboxes = campoApoyo.querySelectorAll('input[type=checked]');

    checkboxes.forEach(function (check){
        areasApoyo.push(check.value);
    });

    mostrarMensaje("Formulario enviado correctamnete. La solicitid fue registrada","exito")

    datosResumen.innerHTML = `
    <strong>Estudiantes:</strong> ${nombre}<br>
    <strong>Direccion:</strong> ${Direccion}<br>
    <strong>Edad:</strong> ${edad}<br>
    <strong>Nacionalidad:</strong> ${nivel}<br>
    <strong>Seccion:</strong> ${seccion}<br>
    <strong>Genero:</strong> ${Genero}<br>

    <strong>Encargado:</strong> ${encargado}<br>
    <strong>Parentesco:</strong> ${parentesco}<br>
    <strong>Telefono:</strong> ${telefono}<br>
    <strong>Correo:</strong> ${correo}<br>
    <strong>Genero:</strong> ${Genero}<br>
    <strong>Centro educativo:</strong> ${Centroeducativo}<br>

    <strong>Especialidad tecnica:</strong> ${EspecialidadTec}<br>
    <strong>Plan de estudio:</strong> ${PlanEstudio}<br>
    <strong>Cursos libres:</strong> ${CursosLibres}<br>
    
    <strong>Nivel de urgencia:</strong> ${urgencia}<br>
    `;


    resumen.style.display = "block"
})

formulario.addEventListener("reset", function() {
    mensajeRespuesta.style.display = "none";
    resumen.style.display= "none";
    campoAusencia.style.display = "none";
    campoReunion.style.display = "none";
    campoApoyo.style.display = "none";
});

function mostrarMensaje(texto, tipo) {
    mensajeRespuesta.textContent = texto;
    mensajeRespuesta.className = "mensaje" + tipo;
    mensajeRespuesta.style.display = "block";
}

function validarCorre(correo){
const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return expresion.test(correo);
}