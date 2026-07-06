const app = document.getElementById("app");

let datosSITR = {
    usuario: {
        nombres: "",
        apellidos: "",
        rut: "",
        dv: "",
        telefono: "",
        sector: "",
        latitud: "",
        longitud: "",
        fecha: ""
    },

    catastro: {},
    diagnostico: {},
    ayudas: {},
    emergencias: {}
};

window.onload = function () {
    renderHome();
};

function renderHome() {

    app.innerHTML = `

    <div class="card">

        <h2>SITR - LAUTARO</h2>

        <p>Sistema de Información Territorial Rural</p>

        <button class="btn"
            onclick="renderNuevoRegistro()">

            ➕ Nuevo Registro

        </button>

        <button class="btn"
            onclick="buscarRegistro()">

            🔎 Buscar Registro

        </button>

        <button class="btn"
            onclick="abrirVisor()">

            🗺️ Visor Territorial

        </button>

    </div>

    `;

}
function renderNuevoRegistro() {

    const fecha = new Date().toLocaleDateString("es-CL");

    app.innerHTML = `

    <div class="card">

        <button class="btn-back" onclick="renderHome()">
            ← Atrás
        </button>

        <h2>MBT - Nuevo Registro</h2>

        <div class="form-group">
            <label>Nombres *</label>
            <input id="nombres" type="text" autocomplete="off">
        </div>

        <div class="form-group">
            <label>Apellidos *</label>
            <input id="apellidos" type="text" autocomplete="off">
        </div>

        <div class="row">

            <div class="col form-group">
                <label>RUT *</label>
                <input id="rut"
                       maxlength="8"
                       inputmode="numeric"
                       placeholder="12345678">
            </div>

            <div class="col form-group">
                <label>DV *</label>
                <input id="dv"
                       maxlength="1"
                       style="text-transform:uppercase;">
            </div>

        </div>

        <div class="form-group">
            <label>Teléfono</label>
            <input id="telefono"
                   type="tel"
                   placeholder="+56 9">
        </div>

        <div class="form-group">
            <label>Sector *</label>
            <input id="sector">
        </div>

        <hr>

        <h3>Ubicación</h3>

        <button class="btn"
                onclick="obtenerUbicacion()">

            📍 Obtener ubicación

        </button>

        <div class="row">

            <div class="col form-group">

                <label>Latitud</label>

                <input id="latitud"
                       readonly>

            </div>

            <div class="col form-group">

                <label>Longitud</label>

                <input id="longitud"
                       readonly>

            </div>

        </div>

        <div class="form-group">

            <label>Fecha Registro</label>

            <input id="fecha"
                   value="${fecha}"
                   readonly>

        </div>

        <button class="btn"
                onclick="guardarMBT()">

            Siguiente →

        </button>

    </div>

    `;

}
function obtenerUbicacion() {

    if (!navigator.geolocation) {
        alert("Este dispositivo no soporta geolocalización.");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        function (posicion) {

            document.getElementById("latitud").value =
                posicion.coords.latitude.toFixed(6);

            document.getElementById("longitud").value =
                posicion.coords.longitude.toFixed(6);

        },

        function () {

            alert("No fue posible obtener la ubicación.");

        }

    );

}

function guardarMBT() {

    if (document.getElementById("nombres").value.trim() === "") {
        alert("Debe ingresar los nombres.");
        return;
    }

    if (document.getElementById("apellidos").value.trim() === "") {
        alert("Debe ingresar los apellidos.");
        return;
    }

    if (document.getElementById("rut").value.trim() === "") {
        alert("Debe ingresar el RUT.");
        return;
    }

    if (document.getElementById("sector").value.trim() === "") {
        alert("Debe ingresar el sector.");
        return;
    }

    datosSITR.usuario = {

        nombres: document.getElementById("nombres").value,

        apellidos: document.getElementById("apellidos").value,

        rut: document.getElementById("rut").value,

        dv: document.getElementById("dv").value.toUpperCase(),

        telefono: document.getElementById("telefono").value,

        sector: document.getElementById("sector").value,

        latitud: document.getElementById("latitud").value,

        longitud: document.getElementById("longitud").value,

        fecha: document.getElementById("fecha").value

    };

    renderTipoRegistro();

}

function renderTipoRegistro() {

    app.innerHTML = `

    <div class="card">

        <button class="btn-back"
            onclick="renderNuevoRegistro()">

            ← Atrás

        </button>

        <h2>Seleccione el tipo de registro</h2>

        <button class="btn"
            onclick="renderCatastro()">

            🌾 Catastro Predial

        </button>

        <button class="btn"
            onclick="renderDiagnostico()">

            📋 Diagnóstico Productivo

        </button>

        <button class="btn"
            onclick="renderAyudas()">

            🤝 Ayudas y Beneficios

        </button>

        <button class="btn"
            onclick="renderEmergencias()">

            🚨 Emergencias

        </button>

    </div>

    `;

}
function renderCatastro() {

    app.innerHTML = `

    <div class="card">

        <button class="btn-back"
            onclick="renderTipoRegistro()">

            ← Atrás

        </button>

        <h2>Catastro Predial</h2>

        <div class="form-group">

            <label>Rol SII</label>

            <input id="rol">

        </div>

        <div class="row">

            <div class="col form-group">

                <label>Superficie</label>

                <input id="superficie"
                       type="number">

            </div>

            <div class="col form-group">

                <label>Unidad</label>

                <select id="unidad">

                    <option>ha</option>
                    <option>m²</option>

                </select>

            </div>

        </div>

        <div class="form-group">

            <label>Tenencia</label>

            <select id="tenencia">

                <option>Propietario</option>
                <option>Arrendatario</option>
                <option>Comodato</option>
                <option>Sucesión</option>
                <option>Otra</option>

            </select>

        </div>

        <div class="form-group">

            <label>Uso actual del predio</label>

            <select id="uso">

                <option>Agrícola</option>
                <option>Ganadero</option>
                <option>Forestal</option>
                <option>Mixto</option>
                <option>Habitacional</option>
                <option>Otro</option>

            </select>

        </div>

        <div class="form-group">

            <label>Disponibilidad de agua</label>

            <select id="agua">

                <option>Sí</option>
                <option>No</option>

            </select>

        </div>

        <div class="form-group">

            <label>Electricidad</label>

            <select id="electricidad">

                <option>Sí</option>
                <option>No</option>

            </select>

        </div>

        <div class="form-group">

            <label>Estado del acceso</label>

            <select id="acceso">

                <option>Bueno</option>
                <option>Regular</option>
                <option>Malo</option>

            </select>

        </div>

        <div class="form-group">

            <label>Observaciones</label>

            <textarea id="observaciones"
                      rows="5"></textarea>

        </div>

        <button class="btn"
            onclick="guardarCatastro()">

            Guardar Registro

        </button>

    </div>

    `;

}

function guardarCatastro(){

    datosSITR.catastro={

        rol:document.getElementById("rol").value,

        superficie:document.getElementById("superficie").value,

        unidad:document.getElementById("unidad").value,

        tenencia:document.getElementById("tenencia").value,

        uso:document.getElementById("uso").value,

        agua:document.getElementById("agua").value,

        electricidad:document.getElementById("electricidad").value,

        acceso:document.getElementById("acceso").value,

        observaciones:document.getElementById("observaciones").value

    };

    console.log(datosSITR);

    alert("Registro guardado correctamente.");

    renderHome();

}
function renderDiagnostico() {

    app.innerHTML = `

    <div class="card">

        <button class="btn-back"
            onclick="renderTipoRegistro()">
            ← Atrás
        </button>

        <h2>Diagnóstico Productivo</h2>

        <p style="margin-bottom:15px;">
            Módulo en desarrollo.
        </p>

        <button class="btn"
            onclick="renderHome()">

            Guardar

        </button>

    </div>

    `;

}

function renderAyudas() {

    app.innerHTML = `

    <div class="card">

        <button class="btn-back"
            onclick="renderTipoRegistro()">
            ← Atrás
        </button>

        <h2>Ayudas y Beneficios</h2>

        <p style="margin-bottom:15px;">
            Módulo en desarrollo.
        </p>

        <button class="btn"
            onclick="renderHome()">

            Guardar

        </button>

    </div>

    `;

}

function renderEmergencias() {

    app.innerHTML = `

    <div class="card">

        <button class="btn-back"
            onclick="renderTipoRegistro()">
            ← Atrás
        </button>

        <h2>Emergencias</h2>

        <p style="margin-bottom:15px;">
            Módulo en desarrollo.
        </p>

        <button class="btn"
            onclick="renderHome()">

            Guardar

        </button>

    </div>

    `