const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('node:path');

let mainWindow;
let tray;

const Size = {
  x: 100,
  y: 179,
}

app.whenReady().then(() => {
  // Створення вікна
  mainWindow = new BrowserWindow({
    width: Size.x,
    height: Size.y,
    frame: false, // Без рамок
    transparent: true, // Прозоре вікно
    alwaysOnTop: true, // Завжди поверх усіх вікон
    skipTaskbar: true, // Не відображається в панелі завдань
    resizable: false,
    focusable: false, // Ігнорування фокусу миші
    webPreferences: {
      preload: __dirname + '/assets/preload.js',
      webSecurity: false, // Prevent loading insecure content
      allowRunningInsecureContent: true,
    }
  });
  // Відкрити DevTools
  // mainWindow.webContents.openDevTools();
  // Позиціювання вікна в нижньому лівому куті
  const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize;
  mainWindow.setBounds({
    x: width - Size.x,
    y: height - Size.y, // Відступ знизу (висота вікна = 300)
    width: Size.x,
    height: Size.y,
  });

  // Завантаження HTML-файлу
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Створення трей-іконки
  tray = new Tray(__dirname + "/assets/icon.png"); // Замініть icon.png на шлях до вашої іконки
  tray.setToolTip('Програма на Electron');
  tray.setContextMenu(Menu.buildFromTemplate([{
    label: 'Оновити вікно',
    click: () => mainWindow || mainWindow.reload(),
  }, {
    label: 'Закрити програму',
    click: () => app.quit()
  }]));

  // Дії для MacOS
  if (process.platform === 'darwin') app.dock.hide();
});

// Завершення програми при закритті всіх вікон
app.on('window-all-closed', e => e.preventDefault());
