const readline = require('readline');
const apiService = require('../domain/services/apiService');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const menu = {
  "1": { text: "Saludo", action: () => console.log("¡Hola! ¿Cómo estás?") },
  "2": { 
    text: "Opciones Avanzadas", 
    submenu: {
      "1": { text: "Subopción 1", action: () => console.log("Esta es la subopción 1.") },
      "2": { text: "Subopción 2", action: () => console.log("Esta es la subopción 2.") },
      "3": { text: "Consultar API", action: fetchAndDisplayData },
      "4": { text: "Volver", action: () => showMenu(mainMenu) }
    }
  },
  "3": { text: "Finalizar", action: () => { console.log("Adiós!"); rl.close(); } }
};

const mainMenu = menu;

function showMenu(currentMenu) {
  console.log('\nSeleccione una opción:');
  Object.keys(currentMenu).forEach(key => {
    console.log(`${key}: ${currentMenu[key].text}`);
  });

  rl.question('> ', (answer) => {
    if (currentMenu[answer]) {
      if (currentMenu[answer].submenu) {
        showMenu(currentMenu[answer].submenu);
      } else {
        currentMenu[answer].action();
        showMenu(mainMenu);
      }
    } else {
      console.log('Opción no válida, por favor intente de nuevo.');
      showMenu(currentMenu);
    }
  });
}

async function fetchAndDisplayData() {
  try {
    const data = await apiService.fetchData();
    console.log('Datos recibidos de la API:', data);
  } catch (error) {
    console.error('No se pudieron obtener los datos de la API.');
  }
  showMenu(mainMenu);
}

module.exports = {
  showMenu,
  mainMenu
};
