export function browserDownload(json: any) {
  let fileOutputLink = document.createElement('a');

  let filename: string | null = 'output' + Date.now() + '.json';
  filename = window.prompt('Insert output filename', filename);
  if (!filename) return;

  let output = JSON.stringify(json);
  let data = new Blob([output], { type: 'text/plain' });
  let url = window.URL.createObjectURL(data);
  fileOutputLink.setAttribute('download', filename);
  fileOutputLink.href = url;
  fileOutputLink.style.display = 'none';
  document.body.appendChild(fileOutputLink);
  fileOutputLink.click();
  document.body.removeChild(fileOutputLink);
}

export function browserUpload(): Promise<any> {
  return new Promise(function (resolve, reject) {

    let fileInput = document.createElement('input');
    fileInput.type = 'file';

    fileInput.addEventListener('change', function (event: any) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.addEventListener('load', (fileEvent: any) => {
        let loadedData = fileEvent.target.result;
        resolve(loadedData);
      });
      reader.readAsText(file);
    });

    fileInput.click();
  });
}
