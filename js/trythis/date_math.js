console.log((new Date("1970-01-02") - new Date("1970-01-01")) / 1000);

// 이 달의 날짜 5개를 무작위로 만들어 역순으로 출력하시오.
/*
function getRandomDatesOfThisMonth(count = 5) {
  // 오늘의 날짜를 구하고, 달을 구해
  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth();

  const lastDate = new Date(thisYear, thisMonth + 1, 0).getDate();

  // 중복 없이 랜덤 추출
  const dates = new Set();
  while (dates.size < count) {
    // Math.random()을 돌리면 -> 0에서 1사이의 값이 나온다.
    const randomDay = Math.floor(Math.random() * lastDate) + 1;
    dates.add(randomDay);
  }

  return [...dates].sort((a, b) => b - a);
}

console.log(getRandomDatesOfThisMonth());
*/
const d3 = new Date();
d3.setMonth(d3.getMonth() + 1);
// Date가 날짜, Day가 요일 => Date가 0이면 직전 달의 마지막 날짜가 된다.
d3.setDate(0);
const lastday = d3.getDate();
// console.log("🚀 ~ lastday:", lastday);
const rand = (s, e) => s + Math.floor((e - s + 1) * Math.random());
// const dates = Array.from({ length: 5 }, (_) => rand(1, lastday));
const dates = [];
// 중복 없이 하기 => 한 번은 무조건 비교가 되고!
do {
  const r = rand(1, lastday);
  if (!dates.includes(r)) dates.push(r);
} while (dates.length < 5);
dates.sort((a, b) => (a > b ? 1 : -1)).reverse();
console.log("🚀 ~ dates:", dates);
const ym = `${d3.getFullYear()}-${d3.getMonth() + 1}`;
dates.forEach((d) => console.log(`${ym}-${d.toString().padStart(2, "0")}`));

// 내년(2026년) 오늘의 요일을 출력하시오.

const today = new Date();
const oneYearLater = new Date(today);
oneYearLater.setFullYear(today.getFullYear() + 1);
const fmtWeek = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  weekday: "long",
});

console.log("Next Year: ", fmtWeek.format(oneYearLater));

/*
switch (
  oneYearLater.getDay() // ★ 여기!
) {
  case 0:
    oneYearLaterDateInKorean = "일요일";
    break;
  case 1:
    oneYearLaterDateInKorean = "월요일";
    break;
  case 2:
    oneYearLaterDateInKorean = "화요일";
    break;
  case 3:
    oneYearLaterDateInKorean = "수요일";
    break;
  case 4:
    oneYearLaterDateInKorean = "목요일";
    break;
  case 5:
    oneYearLaterDateInKorean = "금요일";
    break;
  case 6:
    oneYearLaterDateInKorean = "토요일";
    break;
  default:
    oneYearLaterDateInKorean = "알 수 없음";
}
    */

// 오늘로 부터 100일 후의 날짜는?
const hundreadDayLater = new Date(today);
hundreadDayLater.setDate(today.getDate() + 100);
console.log(fmtWeek.format(hundreadDayLater));
