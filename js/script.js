// Variables globales para mantener el estado
let currentGroup = '';
let currentProcessId = '';
let currentSubProcessId = '';
let currentLevel = 'nivel0';

// Función para obtener el color del grupo
function getGroupColor(group) {
  switch (group) {
    case 'estrategico':
      return '#c0392b'; // Rojo
    case 'operacional':
      return '#2980b9'; // Azul
    case 'soporte':
      return '#27ae60'; // Verde
    default:
      return '#ffffff'; // Blanco por defecto
  }
}

// Función para cargar el nivel 1
function loadLevel1(group) {
  currentGroup = group;
  currentLevel = 'nivel1';
  const groupData = processData[group];
  if (!groupData) {
    console.error(`Grupo no encontrado: ${group}`);
    return;
  }

  let html = `
    <h2 class="text-3xl font-bold mb-6 text-center text-serviu-blue">${groupData.title}</h2>
    <div class="sub-level grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  `;

  groupData.processes.forEach(process => {
    html += `
      <div class="box group p-6 rounded-lg shadow-custom cursor-pointer transform transition-transform duration-300 hover:scale-105 text-center" data-id="${process.id}" style="background-color: ${getGroupColor(currentGroup)};">
        <h3 class="text-xl font-semibold text-white group-hover:text-gray-200">${process.name}</h3>
      </div>
    `;
  });

  html += `</div>`;

  document.getElementById('level-container').innerHTML = html;
  assignLevel1Events();
  toggleNavigationIcons(true, group);
}

// Función para asignar eventos en el nivel 1
function assignLevel1Events() {
  const boxes = document.querySelectorAll('.sub-level .box');
  boxes.forEach(element => {
    element.addEventListener('click', () => {
      const processId = element.dataset.id;
      loadLevel2(currentGroup, processId);
    });
  });
}

// Función para cargar el nivel 2
function loadLevel2(group, processId) {
  currentProcessId = processId;
  currentLevel = 'nivel2';
  const groupData = processData[group];
  const process = groupData.processes.find(p => p.id === processId);
  if (!process) {
    console.error(`Proceso no encontrado: ${processId}`);
    return;
  }

  let html = `
    <h2 class="text-3xl font-bold mb-6 text-center text-serviu-blue">${process.name}</h2>
    <div class="sub-level grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  `;

  process.subProcesses.forEach(subProcess => {
    html += `
      <div class="box group p-6 rounded-lg shadow-custom cursor-pointer transform transition-transform duration-300 hover:scale-105 text-center" data-id="${subProcess.id}" style="background-color: ${getGroupColor(currentGroup)};">
        <h3 class="text-xl font-semibold text-white group-hover:text-gray-200">${subProcess.name}</h3>
      </div>
    `;
  });

  html += `</div>`;

  document.getElementById('level-container').innerHTML = html;
  assignLevel2Events();
}

// Función para asignar eventos en el nivel 2
function assignLevel2Events() {
  const boxes = document.querySelectorAll('.sub-level .box');
  boxes.forEach(element => {
    element.addEventListener('click', () => {
      const subProcessId = element.dataset.id;
      loadLevel3(currentGroup, currentProcessId, subProcessId);
    });
  });
}

// Función para cargar el nivel 3
function loadLevel3(group, processId, subProcessId) {
  currentSubProcessId = subProcessId;
  currentLevel = 'nivel3';
  const groupData = processData[group];
  const process = groupData.processes.find(p => p.id === processId);
  const subProcess = process.subProcesses.find(sp => sp.id === subProcessId);
  if (!subProcess) {
    console.error(`Subproceso no encontrado: ${subProcessId}`);
    return;
  }

  if (!subProcess.subProcesses) {
    console.error(`No hay subprocesos en el nivel 3 para: ${subProcessId}`);
    return;
  }

  let html = `
    <h2 class="text-3xl font-bold mb-6 text-center text-serviu-blue">${subProcess.name}</h2>
    <div class="sub-level grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  `;

  subProcess.subProcesses.forEach(subSubProcess => {
    html += `
      <div class="box group p-6 rounded-lg shadow-custom cursor-pointer transform transition-transform duration-300 hover:scale-105 text-center" data-id="${subSubProcess.id}" style="background-color: ${getGroupColor(currentGroup)};">
        <h3 class="text-xl font-semibold text-white group-hover:text-gray-200">${subSubProcess.name}</h3>
      </div>
    `;
  });

  html += `</div>`;

  document.getElementById('level-container').innerHTML = html;
  assignLevel3Events();
}

// Función para asignar eventos en el nivel 3
function assignLevel3Events() {
  const boxes = document.querySelectorAll('.sub-level .box');
  boxes.forEach(element => {
    element.addEventListener('click', () => {
      const subSubProcessId = element.dataset.id;
      loadLevel4(currentGroup, currentProcessId, currentSubProcessId, subSubProcessId);
    });
  });
}

// Función para cargar el nivel 4 (mostrar archivos o enlaces)
function loadLevel4(group, processId, subProcessId, subSubProcessId) {
  currentLevel = 'nivel4';
  const groupData = processData[group];
  const process = groupData.processes.find(p => p.id === processId);
  const subProcess = process.subProcesses.find(sp => sp.id === subProcessId);
  const subSubProcess = subProcess.subProcesses.find(ssp => ssp.id === subSubProcessId);
  if (!subSubProcess) {
    console.error(`Sub-subproceso no encontrado: ${subSubProcessId}`);
    return;
  }

  // Aquí puedes manejar la carga del archivo o enlace
  let html = `
    <h2 class="text-3xl font-bold mb-4 text-center text-serviu-blue">${subSubProcess.name}</h2>
    <div class="text-center">
      <p class="text-lg mb-4">Haz clic en el siguiente enlace para más información:</p>
      ${subSubProcess.link ? `
        <a href="${subSubProcess.link}" target="_blank" class="btn btn-primary">
          Ver Documento
        </a>
      ` : `<p class="text-red-500">Enlace no disponible.</p>`}
    </div>
  `;

  document.getElementById('level-container').innerHTML = html;
}

// Función para regresar al nivel anterior
function goBack() {
  if (currentLevel === 'nivel4') {
    loadLevel3(currentGroup, currentProcessId, currentSubProcessId);
  } else if (currentLevel === 'nivel3') {
    loadLevel2(currentGroup, currentProcessId);
  } else if (currentLevel === 'nivel2') {
    loadLevel1(currentGroup);
  } else if (currentLevel === 'nivel1') {
    goBackToLevel0();
  }
}

// Función para regresar al nivel 0
function goBackToLevel0() {
  currentLevel = 'nivel0';
  currentGroup = '';
  currentProcessId = '';
  currentSubProcessId = '';
  document.getElementById('level-container').innerHTML = '';
  document.getElementById('nivel0').style.display = 'flex';
  toggleNavigationIcons(false);
}

// Función para mostrar/ocultar los iconos de navegación
function toggleNavigationIcons(show, group = '') {
  const icons = document.getElementById('navigation-icons');
  icons.style.display = show ? 'flex' : 'none';
}

// Eventos al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  // Eventos para las cajas del nivel 0
  document.querySelectorAll('#nivel0 .box').forEach(element => {
    element.addEventListener('click', () => {
      const group = element.dataset.group;
      document.getElementById('nivel0').style.display = 'none';
      loadLevel1(group);
    });
  });

  // Eventos para los botones de navegación
  document.getElementById('back-button').addEventListener('click', goBack);
  document.getElementById('home-button').addEventListener('click', goBackToLevel0);

  // Evento para el logo de SERVIU
  document.getElementById('logo-serviu').addEventListener('click', () => {
    window.open('https://www.serviubiobio.cl/', '_blank');
  });

  // Establecer el año actual en el pie de página
  const currentYear = new Date().getFullYear();
  document.getElementById('current-year').textContent = currentYear;
});
