/*-漢堡選單--------------------------------------------------- */
// 獲取DOM元素
const mobileMenu = document.querySelector('.mobileMenu');
const menuList = document.querySelector('.menu');
const menu = document.querySelector('.mainMenu');

// 用於儲存目前視窗寬度是否小於768px的狀態
let isSmallScreen = window.innerWidth < 768;

if (menuList) {
  // 更新選單狀態（顯示或隱藏）的函式
  const updateMenuState = () => {
    if (isSmallScreen) {
      // menuList.style.display = 'none';
      // mobileMenu.style.display = 'flex';
      menuList.classList.remove('show');
    } else {
      // menuList.style.display = 'flex';
      // mobileMenu.style.display = 'none';
      menuList.classList.remove('show');
      menuList.style.maxHeight = ''; // 清除max-height屬性
    }
  };

  // 監聽視窗大小的變化
  window.addEventListener('resize', () => {
    const newIsSmallScreen = window.innerWidth < 768;
    if (isSmallScreen !== newIsSmallScreen) {
      isSmallScreen = newIsSmallScreen;
      updateMenuState();
    }
  });

  // 點擊漢堡圖示，顯示或隱藏選單
  mobileMenu.addEventListener('click', () => {
    menuList.classList.toggle('show');
    if (menuList.classList.contains('show')) {
      // 動態計算選單的高度並應用到滑動效果上
      menuList.style.maxHeight = menuList.scrollHeight + 'px';
    } else {
      menuList.style.maxHeight = '0';
    }
  });
  updateMenuState();
}

// 初始化

/*-tab切換--------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tabContent');

  if (tabs.length > 0) {
    function clearActive() {
      tabs.forEach((t) => t.classList.remove('active'));
      tabContents.forEach((tc) => tc.classList.remove('active'));
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', function () {
        clearActive();
        tab.classList.add('active');
        tabContents[index].classList.add('active');
      });
    });

    // 預設選中第一個頁籤
    tabs[0].classList.add('active');
    tabContents[0].classList.add('active');
  }
});

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


