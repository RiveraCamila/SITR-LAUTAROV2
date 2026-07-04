const app = document.getElementById("app");

let datosSITR = {
    usuario: {
        id: generarIdUsuario(),
        nombres: "",
        apellidos: "",
        rut: "",
        dv: "",
        telefono: "",
        sector: "",
        latitud: "",
        longitud: "",
        fecha: new Date().toLocaleDateString("es-CL")
    },
    modulo: "",
    catastro: {},
    diagnostico: {},
    ayudas: {},
    emergencias: {}
};

function generarIdUsuario() {
    return "USR-" + Math.floor(Math.random() * 100000).toString().padStart(5, "0");
}

window.onload = () => renderHome();

function renderHome() {
    app.innerHTML = `
    <div class="card">
        <button class="btn" onclick="renderNuevoRegistro()">+ Nuevo Registro</button>
        <button class="btn" onclick="buscarRegistro()">🔍 Buscar Registro</button>
        <button class="btn" onclick="abrirVisor()">🗺 Visor Territorial</button>
    </div>`;
}

function renderNuevoRegistro() {
    const u = datosSITR.usuario;

    app.innerHTML = `
    <div class="card">
        <button class="btn-back" onclick="renderHome()">← Atrás</button>
        <h2>Nuevo Registro (MBT)</h2>

        <div class="form-group">
            <label>ID Usuario</label>
            <input value="${u.id}" disabled>
        </div>

        <div class="form-group">
            <label>Nombres</label>
            <input id="nombres" value="${u.nombres}">
        </div>

        <div class="form-group">
            <label>Apellidos</label>
            <input id="apellidos" value="${u.apellidos}">
        </div>

        <div class="row">
            <div class="col form-group">
                <label>RUT</label>
                <input id="rut" value="${u.rut}">
            </div>
            <div class="col form-group">
                <label>DV</label>
                <input id="dv" value="${u.dv}">
            </div>
        </div>

        <div class="form-group">
            <label>Teléfono</label>
            <input id="telefono" value="${u.telefono}">
        </div>

        <div class="form-group">
            <label>Sector</label>
            <input id="sector" value="${u.sector}">
        </div>

        <button class="btn" onclick="obtenerUbicacion()">📍 Obtener ubicación</button>

        <div class="row">
            <div class="col form-group">
                <label>Latitud</label>
                <input id="latitud" value="${u.latitud}">
            </div>
            <div class="col form-group">
                <label>Longitud</label>
                <input id="longitud" value="${u.longitud}">
            </div>
        </div>

        <div class="form-group">
            <label>Fecha</label>
            <input value="${u.fecha}" disabled>
        </div>

        <button class="btn" onclick="guardarMBT()">Siguiente</button>
    </div>`;
}

function obtenerUbicacion() {
    if (!navigator.geolocation) {
        alert("GPS no disponible");
        return;
    }

    navigator.geolocation.getCurrentPosition(pos => {
        document.getElementById("latitud").value = pos.coords.latitude.toFixed(6);
        document.getElementById("longitud").value = pos.coords.longitude.toFixed(6);
    });
}

function guardarMBT() {
    const u = datosSITR.usuario;

    u.nombres = document.getElementById("nombres").value;
    u.apellidos = document.getElementById("apellidos").value;
    u.rut = document.getElementById("rut").value;
    u.dv = document.getElementById("dv").value;
    u.telefono = document.getElementById("telefono").value;
    u.sector = document.getElementById("sector").value;
    u.latitud = document.getElementById("latitud").value;
    u.longitud = document.getElementById("longitud").value;

    renderTipoRegistro();
}

function renderTipoRegistro() {
    app.innerHTML = `
    <div class="card">
        <button class="btn-back" onclick="renderNuevoRegistro()">← Atrás</button>
        <h2>Tipo de Registro</h2>

        <button class="btn" onclick="renderCatastro()">Catastro Predial</button>
        <button class="btn" onclick="renderDiagnostico()">Diagnóstico Productivo</button>
        <button class="btn" onclick="renderAyudas()">Ayudas / Beneficios</button>
        <button class="btn" onclick="renderEmergencias()">Emergencias</button>
    </div>`;
}
/* =========================
   CATASTRO PREDIAL
========================= */

function renderCatastro() {
    app.innerHTML = `
    <div class="card">
        <button class="btn-back" onclick="renderTipoRegistro()">← Atrás</button>
        <h2>Catastro Predial</h2>

        <div class="form-group">
            <label>Rol</label>
            <input id="rol">
        </div>

        <div class="row">
            <div class="col form-group">
                <label>Superficie</label>
                <input id="superficie">
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
                <option>Copropietario</option>
                <option>Herencia</option>
                <option>DRU</option>
                <option>Goce</option>
            </select>
        </div>

        <div class="form-group">
            <label>Uso de suelo</label>
            <select id="usoSuelo">
                <option>Agrícola</option>
                <option>Ganadero</option>
                <option>Forestal</option>
                <option>Habitacional</option>
                <option>Mixto</option>
            </select>
        </div>

        <div class="form-group">
            <label>Tipo de acceso</label>
            <select id="acceso">
                <option>Pavimentado</option>
                <option>Ripio</option>
                <option>Tierra</option>
                <option>Servidumbre</option>
            </select>
        </div>

        <div class="form-group">
            <label>Observaciones</label>
            <textarea id="obsCatastro"></textarea>
        </div>

        <button class="btn" onclick="guardarModulo('catastro')">
            Guardar Registro
        </button>
    </div>`;
}

/* =========================
   DIAGNÓSTICO PRODUCTIVO
========================= */

function renderDiagnostico() {
    app.innerHTML = `
    <div class="card">
        <button class="btn-back" onclick="renderTipoRegistro()">← Atrás</button>
        <h2>Diagnóstico Productivo</h2>

        <div class="form-group">
            <label>Rubro principal</label>
            <input id="rubroPrincipal">
        </div>

        <div class="form-group">
            <label>Rubro secundario</label>
            <input id="rubroSecundario">
        </div>

        <div class="form-group">
            <label>Superficie productiva</label>
            <input id="superficieProductiva">
        </div>

        <div class="form-group">
            <label>Sistema de riego</label>
            <input id="riego">
        </div>

        <div class="form-group">
            <label>Maquinaria</label>
            <textarea id="maquinaria"></textarea>
        </div>

        <div class="form-group">
            <label>Limitantes productivas</label>
            <textarea id="limitantes"></textarea>
        </div>

        <button class="btn" onclick="guardarModulo('diagnostico')">
            Guardar Registro
        </button>
    </div>`;
}

/* =========================
   AYUDAS / BENEFICIOS
========================= */

function renderAyudas() {
    app.innerHTML = `
    <div class="card">
        <button class="btn-back" onclick="renderTipoRegistro()">← Atrás</button>
        <h2>Ayudas / Beneficios</h2>

        <div class="form-group">
            <label>Programa</label>
            <input id="programa">
        </div>

        <div class="form-group">
            <label>Tipo ayuda</label>
            <input id="tipoAyuda">
        </div>

        <div class="form-group">
            <label>Año</label>
            <input id="anio">
        </div>

        <div class="form-group">
            <label>Monto / Valorización</label>
            <input id="monto">
        </div>

        <div class="form-group">
            <label>Estado</label>
            <select id="estadoAyuda">
                <option>Entregado</option>
                <option>Pendiente</option>
                <option>Postulado</option>
            </select>
        </div>

        <div class="form-group">
            <label>Observaciones</label>
            <textarea id="obsAyuda"></textarea>
        </div>

        <button class="btn" onclick="guardarModulo('ayudas')">
            Guardar Registro
        </button>
    </div>`;
}

/* =========================
   EMERGENCIAS
========================= */

function renderEmergencias() {
    app.innerHTML = `
    <div class="card">
        <button class="btn-back" onclick="renderTipoRegistro()">← Atrás</button>
        <h2>Emergencias</h2>

        <div class="form-group">
            <label>Tipo evento</label>
            <select id="evento">
                <option>Temporal</option>
                <option>Helada</option>
                <option>Incendio</option>
                <option>Inundación</option>
                <option>Sequía</option>
            </select>
        </div>

        <div class="form-group">
            <label>Fecha evento</label>
            <input type="date" id="fechaEvento">
        </div>

        <div class="form-group">
            <label>Nivel afectación</label>
            <select id="nivel">
                <option>Baja</option>
                <option>Media</option>
                <option>Alta</option>
            </select>
        </div>

        <div class="form-group">
            <label>Superficie afectada</label>
            <input id="supAfectada">
        </div>

        <div class="form-group">
            <label>Descripción daño</label>
            <textarea id="danio"></textarea>
        </div>

        <button class="btn" onclick="guardarModulo('emergencias')">
            Guardar Registro
        </button>
    </div>`;
}

/* =========================
   GUARDAR / OTROS
========================= */

function guardarModulo(modulo) {
    datosSITR.modulo = modulo;

    alert(
        "Registro guardado (modo prototipo)\\n\\n" +
        "Usuario: " + datosSITR.usuario.nombres + " " +
        datosSITR.usuario.apellidos + "\\n" +
        "Módulo: " + modulo
    );

    renderHome();
}

function buscarRegistro() {
    app.innerHTML = `
    <div class="card">
        <button class="btn-back" onclick="renderHome()">← Atrás</button>
        <h2>Buscar Registro</h2>

        <div class="form-group">
            <label>Buscar por RUT / Nombre / Sector</label>
            <input placeholder="Buscar...">
        </div>

        <button class="btn">Buscar</button>
    </div>`;
}

function abrirVisor() {
    app.innerHTML = `
    <div class="card">
        <button class="btn-back" onclick="renderHome()">← Atrás</button>
        <h2>Visor Territorial</h2>

        <p>Visor cartográfico en construcción.</p>
        <br>
        <div style="height:300px;background:#dce3e7;border-radius:16px;
                    display:flex;align-items:center;justify-content:center;">
            MAPA
        </div>
    </div>`;
}