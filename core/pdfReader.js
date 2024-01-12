/*
获取请求参数，展示pdf
*/
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("path");
createRawPdfViewver();
/*
 * 下载按钮
 */
const rawUrl = `https://raw.githubusercontent.com/meowrain/meowrain.github.io/master/${myParam}`;
const boostURL = `https://mirror.ghproxy.com/${rawUrl}`;

const downloadBtn = document.querySelector("#downloadBtn");
downloadBtn.addEventListener("click", function () {
  console.log("downloading....");
  let link = document.createElement("a");
  link.href = boostURL;
  filename = myParam.substring(myParam.lastIndexOf("/") + 1);
  link.download = filename || boostURL.split("/").pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});


/*
pdf 渲染
*/
  const pdfH5ViewverBtn = document.querySelector("#pdfh5Viewer");
  const rawPdfViewerBtn = document.querySelector("#rawPdfViewer");

  rawPdfViewerBtn.addEventListener("click", function () {
        createRawPdfViewver();
  });

  pdfH5ViewverBtn.addEventListener("click", function () {
    createPdfH5Viewver();
    new Pdfh5("#pdfh5", {
      pdfurl: myParam,
    });
  });
/*
原生iframe渲染
*/
function createRawPdfViewver() {
    if(document.querySelector('#pdfh5') != null){
        document.body.removeChild(document.querySelector('#pdfh5'));
    }
    let rawPdfViewer = document.createElement("iframe");
    rawPdfViewer.src = myParam;
    rawPdfViewer.id = "pdf";
    rawPdfViewer.width = '100%';
    rawPdfViewer.height = '800px';
    document.body.appendChild(rawPdfViewer);
}


/*
pdfh5渲染
*/
function createPdfH5Viewver() {
    if(document.querySelector('#pdf') != null){
        document.body.removeChild(document.querySelector('#pdf'));
    }
    let pdfH5Viewver = document.createElement("div");
    pdfH5Viewver.id = "pdfh5";
    document.body.appendChild(pdfH5Viewver);
}
