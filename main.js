const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const nodeManager = require('node-task-mgr')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.webContents.openDevTools()

    win.loadFile('index.html')

    console.log('test', nodeManager)
}

app.whenReady().then(() => {
    ipcMain.handle('getProcessList', async () => {
        let result = await nodeManager.getProcessList()
        return result
    });
    ipcMain.handle('killProcByPID', async (_,pid) => {
        let killResult = await nodeManager.killProcByPID(pid)
        return killResult
    });

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
