const app = document.getElementById("app");

function renderHome() {
  app.innerHTML = `
    <div class="card">
      <button class="btn" onclick="renderNuevoRegistro()">+ Nuevo Registro</button>
      <button class="btn" onclick="buscarRegistro()">Buscar Registro</button>
      <button class="btn" onclick="abrirVisor()">Visor Territorial</button>
    </div>
  `;
}

function renderNuevoRegistro() {
  app.innerHTML = `
    <div class="card">
      <button class="btn-back" onclick="renderHome()">← Atrás</button>

      <h2>Nuevo Registro</h2>

      <div class="form-group">
        <label>Nombres</label>
        <input>
      </div>

      <div class="form-group">
        <label>Apellidos</label>
        <input>
      </div>

      <div class="row">
        <div class="col form-group">
          <label>RUT</label>
          <input>
        </div>

        <div class="col form-group">
          <label>DV</label>
          <input>
        </div>
      </div>

      <div class="form-group">
        <label>Teléfono</label>
        <input>
      </div>

      <div class="form-group">
        <label>Sector</label>
        <input>
      </div>

      <button class="btn" onclick="renderTipoRegistro()">Siguiente</button>
    </div>
  `;
}

function renderTipoRegistro() {
  app.innerHTML = `
    <div class="card">
      <button class="btn-back" onclick="renderNuevoRegistro()">← Atrás</button>

      <h2>Tipo de Registro</h2>

      <button class="btn" onclick="renderCatastro()">Catastro Predial</button>
      <button class="btn">Diagnóstico Productivo</button>
      <button class="btn">Ayudas / Beneficios</button>
      <button class="btn">Emergencias</button>
    </div>
  `;
}

function renderCatastro() {
  app.innerHTML = `
    <div class="card">
      <button class="btn-back" onclick="renderTipoRegistro()">← Atrás</button>

      <h2>Catastro Predial</h2>

      <div class="form-group">
        <label>Rol</label>
        <input>
      </div>

      <div class="form-group">
        <label>Superficie</label>
        <input>
      </div>

      <button class="btn" onclick="renderHome()">Guardar</button>
    </div>
  `;
}

function buscarRegistro() {
  alert("Módulo en construcción");
}

function abrirVisor() {
  alert("Visor en construcción");
}

renderHome();