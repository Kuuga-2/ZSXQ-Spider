var isAppTemplate = true;

// 把页面高度传递给 App
window.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    zsxq_js.updateWebViewHeight({height: document.body.clientHeight});
    console.log(document.body.clientHeight, 'dom');
  }, 300);
});

window.addEventListener("load", function () {
  setTimeout(function () {
    zsxq_js.updateWebViewHeight({height: document.body.clientHeight});
    console.log(document.body.clientHeight, 'load');
  }, 300);
  isMilkdown()
});

// previewImage
var images = [].slice.apply(document.querySelectorAll('.content img'));
var imagesItems = images.map(function (image) {
  return image.src;
});

images.forEach(function (image, index) {
  var imageIndex = index;
  image.addEventListener('click', function (event) {
    zsxq_js.previewImage({
      current: imagesItems[imageIndex],
      urls: imagesItems
    });
  });
});

// 用于映射夜间模式颜色
var colorRefs = {}
window.dark = function(isDark) {
  const divDom = document.createElement("div");
  document.body.appendChild(divDom);

  function darkColorCoverter(color) {
    if (!color) {
      return ''
    }

    try {
      divDom.style.color = color;

      const computedColor = window.getComputedStyle(divDom).color;
      const rgbMatch = computedColor.match(/\d+/g)
      const r = parseInt(rgbMatch[0])
      const g = parseInt(rgbMatch[1])
      const b = parseInt(rgbMatch[2])

      const bright = 0.299 * r + 0.587 * g + 0.114 * b
      let mixValue = 0
      
      // 根据比例微调调整极亮或极暗的颜色
      if (bright < 30) {
        mixValue = 400
      } else if (bright < 50) {
        mixValue = 300
      } else if (bright < 70) {
        mixValue = 250
      } else if (bright < 90) {
        mixValue = 200
      } else if (bright > 220) {
        mixValue = -130
      } else if (bright > 200) {
        mixValue = -60
      } else if (bright > 180) {
        mixValue = -25
      } else if (bright > 160) {
        mixValue = 10
      }
      if (mixValue !== 0) {
        const color = `rgb(${(r + mixValue) / 2}, ${(g + mixValue) / 2}, ${(b + mixValue) / 2})`
        if (rgbMatch) {
          return color
        }
      }
    } catch (error) {
      console.error(error)
    }

    return ''
  }

  function checkDomColor(dom) {
    const children = Array.from(dom.children || [])
    if (children.length > 0) {
      children.forEach(child => {
        checkDomColor(child)
      })
    }

    const ignoreTokens = ['transparent', 'currentColor', 'transparent', 'inherit', 'initial', 'unset']

    if (dom.style.color && !ignoreTokens.includes(dom.style.color)) {
      if (isDark) {
        const convertedColor = darkColorCoverter(dom.style.color)
        if (convertedColor) {
          const prevColor = dom.style.color
          dom.style.color = convertedColor
          colorRefs[dom.style.color] = prevColor
        }
      } else {
        const convertedColor = colorRefs[dom.style.color]
        if (convertedColor) {
          console.log(`${dom.style.color} have color: ${convertedColor}`)
          dom.style.color = convertedColor
        } else {
          console.log(`${dom.style.color} dont have color`)
        }
      }
    }

    if (dom.style.backgroundColor && !ignoreTokens.includes(dom.style.backgroundColor)) {
      if (isDark) {
        const convertedColor = darkColorCoverter(dom.style.backgroundColor)
        if (convertedColor) {
          const prevColor = dom.style.backgroundColor
          dom.style.backgroundColor = convertedColor
          colorRefs[dom.style.backgroundColor] = prevColor
        }
      } else {
        const convertedColor = colorRefs[dom.style.backgroundColor]
        if (convertedColor) {
          dom.style.backgroundColor = convertedColor
        }
      }
    }
  }

  checkDomColor(document.querySelector('.content.ql-editor'))
  document.body.removeChild(divDom);
  window.is_dark = isDark
}

if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  window.dark(!!prefersDarkScheme.matches)

  prefersDarkScheme.addEventListener('change', (e) => {
    window.dark(!!e.matches)
  });
} else {
  const attributeValue = document.body.getAttribute('data-theme')
  window.dark(attributeValue === 'dark')  
}

const callback = function(mutationsList) {
  for(let mutation of mutationsList) {
    const oldValue = mutation.oldValue
    const newValue = mutation.target.getAttribute('data-theme')
    if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme' && oldValue !== newValue) {
      window.dark(newValue === 'dark')
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(document.body, {
  attributes: true,                       
  attributeFilter: ['data-theme'],
  attributeOldValue: true
});

function isMilkdown () {
  const editor = document.querySelector('.milkdown-editor');
  const container = document.querySelector('.content-container');
  if (editor) {
    document.querySelector('.ql-snow').style.display = 'none'
  } else {
    document.querySelector('.milkdown-preview').style.display = 'none'
    container.classList.remove('dark:!bg-[#20242A]')
  }
}