export function browserDownload(file) {
  var ext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "json";
  var typeMap = {
    json: "text/plain",
    obj: "model/obj",
    mtl: "model/mtl	"
  };
  if (!typeMap[ext]) return;
  var fileOutputLink = document.createElement('a');
  var filename = 'output' + Date.now() + '.' + ext;
  filename = window.prompt('Insert output filename', filename);
  if (!filename) return;
  var data = null;
  data = new Blob([file], {
    type: typeMap[ext]
  });
  var url = window.URL.createObjectURL(data);
  fileOutputLink.setAttribute('download', filename);
  fileOutputLink.href = url;
  fileOutputLink.style.display = 'none';
  document.body.appendChild(fileOutputLink);
  fileOutputLink.click();
  document.body.removeChild(fileOutputLink);
}
export function browserUpload() {
  return new Promise(function (resolve, reject) {
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.addEventListener('change', function (event) {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.addEventListener('load', function (fileEvent) {
        var loadedData = fileEvent.target.result;
        resolve(loadedData);
      });
      reader.readAsText(file);
    });
    fileInput.click();
  });
}