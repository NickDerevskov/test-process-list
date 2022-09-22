const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getProcessList: () => ipcRenderer.invoke('getProcessList'),
    killProcByPID: (pid) => ipcRenderer.invoke('killProcByPID', pid),
});
