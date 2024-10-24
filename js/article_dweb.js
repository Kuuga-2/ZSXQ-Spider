// set qrcode
var url = document.getElementById('qrcode-url').innerHTML;
var imgBase64 = jrQrcode.getQrBase64(url);
document.getElementById('qrcode').src = imgBase64;
// set logo
function setImg() {
  if (window.devicePixelRatio > 1) {
    document
      .getElementById('logo')
      .setAttribute('src', '../../assets_dweb/logo@2x.png');
  }
}
window.onload =  function () {
  setImg();
  isMilkdown();
};
// set style
var time = document.getElementById('article-date').innerHTML;
var articleTime = new Date(
  time.replace('年', '-').replace('月', '-').replace('日', '').replace(/-/g, '/')
).getTime();
if (articleTime > 1589990400000) {
  var new_element = document.createElement('style');
  new_element.innerHTML =
    '.content img.fr-dib {margin:5px auto;display:block;float:none}' +
    '.content img.fr-dib.fr-fil {margin-left:0;text-align:left}' +
    '.content img.fr-dib.fr-fir {margin-right:0;text-algin:right}';
  document.body.appendChild(new_element);
}

var messageTimer = null
function message(content) {
  var container = document.querySelector('.message-container-overlay');
  container.innerHTML = '<div class="message-item">' + content + '</div>';
  clearTimeout(messageTimer)
  messageTimer = setTimeout(function() {
    container.innerHTML = '';
  }, 1500)
}

function isMilkdown () {
  const editor = document.querySelector('.milkdown-editor');
  const container = document.querySelector('.quill-editor');
  const titleDom = document.querySelector('.title-mark');
  if (editor) {
    document.querySelector('.ql-snow').style.display = 'none'
  } else {
    document.querySelector('.milkdown-preview').style.display = 'none'
    container.classList.remove('dark:!bg-[#20242A]')
    titleDom.classList.remove('dark:!text-slate-300')
  }
}