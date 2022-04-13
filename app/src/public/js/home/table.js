let date = new Date(); //현재 날짜와 시간

//현재 년도와 날짜
const renderCalendar = () => {
  const viewYear = date.getFullYear(); //2022년
  const viewMonth = date.getMonth() + 1; //3월 (0부터 시작)

  document.querySelector('.year-month').textContent =
    viewYear + '년 ' + viewMonth + '월';

  // TestCode
  console.log(viewYear, viewMonth);
  // console.log(data);

  //지난달의 마지막 날의 Date 객체
  const prevLast = new Date(viewYear, viewMonth - 1, 0); //2022년 3월 31일
  //이번달의 마지막 날의 Date 객체
  const thisLast = new Date(viewYear, viewMonth, 0); //2022 4월 30일

  const PLDate = prevLast.getDate(); //지난달 마지막 달의 날짜 -31일
  const PLDay = prevLast.getDay(); //getDay()는 요일을 반환, 목요일 (0은 일요일)

  const TLDate = thisLast.getDate(); //이번달 마지막 달의 날짜 30일
  const TLDay = thisLast.getDay(); //토요일

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1); //배열안의 개수는 날짜 개수와 동일 30일 or 31일
  //slice()는 제일앞에 있는 0을 없애주기 위함.
  const nextDates = [];

  //지난달을 표현할 날짜들
  if (PLDay !== 6) {
    //지난달의 요일이 툐요일이 아니면(지난달이 토요일이면 굳이 그릴필요 없으므로)
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }
  //PLDay가 0일때는(일요일) prevDates=[31]
  //1일때는(월) [30,31]
  //5일때는(금) [26,27,28,29,30,31]

  //다음달을 표현할 날짜들
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }
  //

  // Dates 합치기
  const dates = prevDates.concat(thisDates, nextDates);

  const dailyReturns__text = '일일 매출액 : ';
  const dailyReturns__figure = '';

  //주간 매출액을 일요일만 뜨게 해야함.
  const weeklyReturns__text = '주간 매출액 : ';
  const weeklyReturns__figure = '';

  //지난 날짜, 다음 날짜 흐리게
  const firstDateIndex = dates.indexOf(1); //5 (1일)
  const lastDateIndex = dates.lastIndexOf(TLDate); //34 (30일)
  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';

    dates[i] = `<div class="date ${condition}">
      <span class="${condition}">${date}</span>
      <div class="daily-returns returns">
          <span class="daily-returns__title ${condition}">${dailyReturns__text}</span>
          <span class="daily-returns__figure ${condition}">${dailyReturns__figure}</span>
      </div>
      <div class="weekly-returns returns">
          <span class="weekly-returns__title ${condition}">${weeklyReturns__text}</span>
          <span class="weekly-returns__figure ${condition}">${weeklyReturns__figure}</span>
      </div>
    </div>`;
  });

  document.querySelector('.dates').innerHTML = dates.join('');

  // 오늘 날짜 그리기
  const today = new Date();
  if (viewMonth - 1 === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll('.this')) {
      if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
      }
    }
  }
};

renderCalendar();

//지난달, 다음날, 오늘로 이동하는 함수
const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};

const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

const goToday = () => {
  date = new Date();
  renderCalendar();
};
