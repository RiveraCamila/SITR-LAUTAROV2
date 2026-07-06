function renderNuevoRegistro() {

    const fecha = new Date().toLocaleDateString("es-CL");

    app.innerHTML = `
    <div class="card">

        <button class="btn-back" onclick="renderHome()">← Atrás</button>

        <h2>MBT - Nuevo Registro</h2>

        <div class="form-group">
            <label>Nombres *</label>
            <input id="nombres" type="text" placeholder="Ingrese nombres">
        </div>

        <div class="form-group">
            <label>Apellidos *</label>
            <input id="apellidos" type="text" placeholder="Ingrese apellidos">
        </div>

        <div class="row">

            <div class="col form-group">
                <label>RUT *</label>
                <input id="rut" maxlength="8" placeholder="12345678">
            </div>

            <div class="col form-group">
                <label>DV</label>
                <input id="dv" maxlength="1">
            </div>

        </div>

        <div class="form-group">
            <label>Teléfono</label>
            <input id="telefono" type="tel">
        </div>

        <div class="form-group">
            <label>Sector *</label>
            <input id="sector">
        </div>

        <hr>

        <h3>Ubicación</h3>

        <button class="btn" onclick="obtenerUbicacion()">
            📍 Obtener ubicación
        </button>

        <div class="row">

            <div class="col form-group">
                <label>Latitud</label>
                <input id="latitud" readonly>
            </div>

            <div class="col form-group">
                <label>Longitud</label>
                <input id="longitud" readonly>
            </div>

        </div>

        <div class="form-group">
            <label>Fecha Registro</label>
            <input value="${fecha}" readonly>
        </div>

        <button class="btn" onclick="guardarMBT()">
            Siguiente →
        </button>

    </div>
    `;
}
function obtenerUbicacion(){

    if(!navigator.geolocation){

        alert("El dispositivo no soporta GPS.");
        return;

    }

    navigator.geolocation.getCurrentPosition(function(pos){

        document.getElementById("latitud").value =
            pos.coords.latitude.toFixed(6);

        document.getElementById("longitud").value =
            pos.coords.longitude.toFixed(6);

    });

}
function guardarMBT(){

    datosSITR.usuario = {

        nombres: document.getElementById("nombres").value,

        apellidos: document.getElementById("apellidos").value,

        rut: document.getElementById("rut").value,

        dv: document.getElementById("dv").value,

        telefono: document.getElementById("telefono").value,

        sector: document.getElementById("sector").value,

        latitud: document.getElementById("latitud").value,

        longitud: document.getElementById("longitud").value

    };

    renderTipoRegistro();

}