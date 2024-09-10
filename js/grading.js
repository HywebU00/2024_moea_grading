// 定義變數以儲存 header 高度
let headerHeight = 0;

// 計算 header 高度的函式
function updateHeaderHeight() {
  var header = document.querySelector('.header');
  headerHeight = header.offsetHeight;
}

// 滾動時的處理函式
function handleScroll() {
  var header = document.querySelector('.header');
  var wrap = document.querySelector('.wrap');

  if (window.scrollY > headerHeight) {
    header.classList.add('fixed');  // 新增 'fixed' class
    wrap.style.paddingTop = headerHeight + 'px';  // 增加 padding-top
  } else {
    header.classList.remove('fixed');  // 移除 'fixed' class
    wrap.style.paddingTop = '0';  // 將 padding-top 設回 0
  }
}

// 初始化並綁定事件
function init() {
  // 在頁面載入時將捲軸位置重設為頂部
  window.scrollTo(0, 0);

  // 初次加載時計算 header 高度
  updateHeaderHeight();

  // 監聽滾動事件
  window.addEventListener('scroll', handleScroll);

  // 監聽視窗大小改變事件，重新計算 header 高度
  window.addEventListener('resize', function() {
    updateHeaderHeight();
    handleScroll();  // 視窗調整大小後，立即根據滾動位置重新檢查
  });
}

// 在 DOM 加載完成後執行初始化
window.onload = init;



/*-滾動表格--------------------------------------------------- */
function scrollTables(obj) {
  let el = document.querySelectorAll(obj) || null; // --- 按鈕列表名稱

  // --- scrollTables 初始化
  function appendEle() {
    el.forEach((i) => {
      i.style.position = 'relative';
      const table = i.querySelector('table');
      const wrapElement = document.createElement('div');
      wrapElement.className = 'tableScroll';

      table.replaceWith(wrapElement);
      wrapElement.appendChild(table);

      // --- 產生左邊按鈕
      let _appendLeftEle;
      let _leftBtn;
      _appendLeftEle = document.createElement('div');
      _appendLeftEle.setAttribute('class', 'scrollTableNav scrollTableNavLeft');
      _appendLeftEle.style.height = `${i.clientHeight}px`;
      _leftBtn = document.createElement('div');
      _leftBtn.setAttribute('class', 'scrollTableLeftBtn');
      _appendLeftEle.appendChild(_leftBtn);

      // --- 產生右邊按鈕
      let _appendRightEle;
      let _rightBtn;
      _appendRightEle = document.createElement('div');
      _appendRightEle.setAttribute('class', 'scrollTableNav scrollTableNavRight');
      _appendRightEle.style.height = `${i.clientHeight}px`;
      _rightBtn = document.createElement('div');
      _rightBtn.setAttribute('class', 'scrollTableRightBtn');
      _appendRightEle.appendChild(_rightBtn);

      // --- 新增按鈕
      i.prepend(_appendLeftEle, _appendRightEle);

      displayNoneEle(i);
    });
  }

  // --- 開關遮罩功能
  function displayNoneEle(i) {
    // --- 父層元素的寬;
    let _table = i.querySelector('.tableScroll').clientWidth || 200;
    // --- 子層元素的寬
    let _tableItem = i.querySelector('.tableScroll').scrollWidth;
    // --- 左邊遮罩
    let _rightEle = i.querySelector('.scrollTableNavRight');
    // --- 右邊遮罩
    let _leftEle = i.querySelector('.scrollTableNavLeft');
    // --- 如果沒有建立遮罩
    if (_rightEle == null) {
      return;
    }
    // --- 如果子層跟父層一樣寬度
    if (_table === _tableItem) {
      _leftEle.style.display = 'none';
      _rightEle.style.display = 'none';
    } else {
      i.parentElement.scrollLeft = '0';
      _rightEle.style.display = 'block';
      _rightEle.style.opacity = '1';
    }
    eleScroll();
  }
  // --- 當父層滾輪滾動
  function eleScroll() {
    el.forEach((i) => {
      i.querySelector('.tableScroll').addEventListener('scroll', () => {
        // --- 父層元素的寬
        let _table = i.querySelector('.tableScroll').clientWidth;
        // --- 子層元素的寬
        let _tableItem = i.querySelector('.tableScroll').scrollWidth;
        // --- 左邊遮罩
        let _rightEle = i.querySelector('.scrollTableNavRight');
        // --- 右邊遮罩
        let _leftEle = i.querySelector('.scrollTableNavLeft');
        // --- 捲軸位置
        let _scrollPosition = i.querySelector('.tableScroll').scrollLeft;

        if (_scrollPosition === 0) {
          // _leftEle.style.opacity = 0;
          // _rightEle.style.opacity = 1;
          _leftEle.style.display = 'none';
          _rightEle.style.display = 'block';
        }
        // --- 如果捲軸位置還沒到底
        if (_scrollPosition > 0) {
          // _leftEle.style.opacity = 1;
          _leftEle.style.display = 'block';
        }
        // --- 如果捲軸位置＋父層寬度 ＝ 子層寬度
        if (_scrollPosition + _table === _tableItem) {
          // _rightEle.style.opacity = 0;
          // _leftEle.style.opacity = 1;
          _rightEle.style.display = 'none';
          _leftEle.style.display = 'block';
        }
        // --- 如果捲軸位置＋父層寬度 < 子層寬度
        if (_scrollPosition + _table < _tableItem) {
          _rightEle.style.opacity = 1;
        }
      });
    });
  }

  // --- 點擊左右按鈕時滾動畫面
  function clickEleBtn() {
    // --- 點擊左邊按鈕
    const leftBtn = document.querySelectorAll('.scrollTableLeftBtn');
    if (leftBtn.length !== 0) {
      leftBtn.forEach((i) => {
        i.addEventListener('click', (item) => {
          i.parentElement.parentElement.querySelector('.tableScroll').scrollLeft -= 200;
        });
      });
    }
    // --- 點擊右邊按鈕
    const rightBtn = document.querySelectorAll('.scrollTableRightBtn');
    rightBtn?.forEach((i) => {
      i.addEventListener('click', (item) => {
        i.parentElement.parentElement.querySelector('.tableScroll').scrollLeft += 200;
      });
    });
  }

  appendEle();
  clickEleBtn();
  // --- resize
  window.addEventListener('resize', () => {
    el.forEach((i) => {
      displayNoneEle(i);
    });
  });
}

window.addEventListener('load', () => {
  scrollTables('.tableWrapper');
});

/*-密碼眼睛開關--------------------------------------------------- */
function formEye(obj) {
  const documentHtml = document.querySelector('html');
  const webLang = documentHtml.getAttribute('lang');
  // form password eyes
  let checkEye = document.querySelectorAll('.passwordEye');
  checkEye.forEach((item) => {
    let passwordInput = item.parentNode.querySelector('[type="password"]');
    item.addEventListener('click', function (e) {
      console.log('a');

      if (e.target.classList.contains('hide')) {
        //換class / type
        e.target.classList.remove('hide');
        e.target.classList.add('show');
        if (webLang) {
          obj.password.data.forEach((s) => {
            if (webLang.slice(0, 2) == s.lang) {
              e.target.textContent = s.hide;
            }
          });
        }
        passwordInput.setAttribute('type', 'text');
      } else {
        passwordInput.setAttribute('type', 'password');
        e.target.classList.remove('show');
        e.target.classList.add('hide');
        e.target.textContent = obj.show;
        if (webLang) {
          obj.password.data.forEach((s) => {
            if (webLang.slice(0, 2) == s.lang) {
              e.target.textContent = s.show;
            }
          });
        }
      }
    });
  });
}

formEye({
  password: {
    data: [
      {
        lang: 'zh',
        show: '顯示密碼',
        hide: '隱藏密碼',
      },
      //...由此新增其他語系
    ],
    //預設語系
    default: {
      show: 'show',
      hide: 'hide',
    },
  },
});


function jsFadeIn(element, time) {
  let ele = window.getComputedStyle(element);
  let display = ele.display;
  let speed = time || 200;

  if (display === 'none') {
    display = 'block';
    let opacity = 0;
    element.style.display = display;
    element.style.opacity = 0;

    element.style.transitionProperty = 'opacity';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.opacity = `1`;
    }, 10);
    setTimeout(() => {
      element.style.display = 'block';
      element.style.removeProperty('opacity');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  }
}
function jsFadeOut(element, time) {
  let ele = window.getComputedStyle(element);
  let display = ele.display;
  let speed = time || 200;

  if (display !== 'none') {
    element.style.transitionProperty = 'opacity';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.opacity = `0`;
    }, 10);
    setTimeout(() => {
      element.style.display = 'none';
      element.style.removeProperty('opacity');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  }
}
function scrollToTop(obj) {
  const el = document.querySelector(obj); // 控制的對象

  function focusTopBtn() {
    const top = window.scrollY;
    if (top > 200) {
      jsFadeIn(el);
    } else {
      jsFadeOut(el);
    }
  }

  function scrollTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  if (el) {
    // window.scrollY 等於零的時候 執行 focus
    window.addEventListener('scroll', focusTopBtn);

    // 滑鼠點擊置頂按鈕
    el.addEventListener('click', (e) => {
      e.preventDefault();
      scrollTop();
    });

    // 鍵盤點擊置頂按鈕
    el.addEventListener('keydown', (e) => {
      e.preventDefault();
      scrollTop();
    });
  }
}

scrollToTop('.scrollToTop');