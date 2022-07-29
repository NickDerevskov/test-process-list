const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getProcList: () => ipcRenderer.invoke('getProcList'),
    killProcByPID: (pid) => ipcRenderer.invoke('killProcByPID', pid),
});
