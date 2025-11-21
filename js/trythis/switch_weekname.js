const WEEKNAMES = "일월화수목금토";

function getWeekName(date) {
  // date가 없으면 new Date()로 대체
  const weekName = WEEKNAMES[(date ?? new Date()).getDay()];
  console.log(`오늘은 ${weekName}요일입니다`);
}

getWeekName(new Date());
