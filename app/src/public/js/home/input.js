'use strict';

const yearInfo = document.querySelector('#year');
const monthInfo = document.querySelector('#month');
const daysInfo = document.querySelector('#days');
const salesInfo = document.querySelector('#sales');
const cancelBtn = document.querySelector('#cancel');
const updateBtn = document.querySelector('#update');
const insertBtn = document.querySelector('#insert');

updateBtn.addEventListener('click', Update);
insertBtn.addEventListener('click', Insert);
cancelBtn.addEventListener('click', Cancel);

function Update() {
  const req = {
    year: yearInfo.value,
    month: monthInfo.value,
    days: daysInfo.value,
    sales: salesInfo.value,
  };
  fetch('/sales', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = '/table';
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error('오류발생'));
    });
}

function Insert() {
  const req = {
    year: yearInfo.value,
    month: monthInfo.value,
    days: daysInfo.value,
    sales: salesInfo.value,
  };
  fetch('/sales', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = '/table';
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error('오류발생'));
    });
}

function Cancel() {
  location.href = '/table';
}

//login 버튼 뜨게하고 나머지 뿌옇게 하기

function arrowClick() {
  const arrowDown = document.querySelector('.arrow-down');
  const logout = document.getElementById('logout');

  arrowDown.classList.toggle('arrow_click');

  if (arrowDown.classList.contains('arrow_click')) {
    console.log('arrowClick() 실행3');
    document.querySelector('.calendar').style.opacity = '0.5';
    logout.style.display = 'block';
  } else {
    document.querySelector('.calendar').style.opacity = '1';
    logout.style.display = 'none';
  }
}
