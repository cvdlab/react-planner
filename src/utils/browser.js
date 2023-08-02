export function browserDownload(file, ext="json") {
  const typeMap = { json: "text/plain", obj: "model/obj", mtl: "model/mtl	"}

  if (!typeMap[ext]) return;

  let fileOutputLink = document.createElement('a');

  let filename = 'output' + Date.now() + '.' + ext;
  filename = window.prompt('Insert output filename', filename);
  if (!filename) return;

  let data = null

  data = new Blob([file], {type: typeMap[ext]});

  let url = window.URL.createObjectURL(data);
  fileOutputLink.setAttribute('download', filename);
  fileOutputLink.href = url;
  fileOutputLink.style.display = 'none';
  document.body.appendChild(fileOutputLink);
  fileOutputLink.click();
  document.body.removeChild(fileOutputLink);
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
