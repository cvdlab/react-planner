const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

export function browserDownload(json) {
  let output = JSON.stringify(json);
  ipcRenderer.sendSync('layout-data', { output });
}

export function browserUpload() {
  return new Promise(function (resolve, reject) {

    let fileInput = document.createElement('input');
    fileInput.type = 'file';

    fileInput.addEventListener('change', function (event) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.addEventListener('load', (fileEvent) => {
        let loadedData = fileEvent.target.result;
        resolve(loadedData);
      });
      reader.readAsText(file);
    });

    fileInput.click();
  });
}
