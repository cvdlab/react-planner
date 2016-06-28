var eventFire = function eventFire(el, etype) {
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
};

export function browserDownload(json) {
  var fileOutputLink = document.createElement('a');

  var filename = "output" + Date.now() + ".json";
  filename = window.prompt("Insert output filename", filename);
  if (!filename) return;

  var output = JSON.stringify(json);
  var data = new Blob([output], {type: 'text/plain'});
  var url = window.URL.createObjectURL(data);
  fileOutputLink.setAttribute('download', filename);
  fileOutputLink.href = url;
  eventFire(fileOutputLink, 'click');
}


export function browserUpload() {
  return new Promise(function (resolve, reject) {

    var fileInput = document.createElement('input');
    fileInput.type = "file";

    fileInput.addEventListener('change', function (event) {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.addEventListener('load', (fileEvent) => {
        var loadedData = fileEvent.target.result;
        resolve(loadedData);
      });
      reader.readAsText(file);
    });

    eventFire(fileInput, 'click');

  });
}
