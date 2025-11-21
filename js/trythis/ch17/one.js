const total = { price: 45000, vat: 4500 };

// 문자열과 변수 (${}) 을 쪼개서 fmt 함수에게 넘겨준다.
const fmt = (string, val) => {
  // 천 단위 콤마로 변환
  const formattedNum = val.toLocaleString();

  // 우측 정렬 -> 공백 채우기
  const paddedNum = formattedNum.padStart(7, " ");
  console.log("🚀 ~ fmt ~ paddedNum:", paddedNum);

  // 문자열 조립하기
  return string[0] + paddedNum + string[1];
};

console.log(fmt`주문합계: ${total.price}원`);
console.log(fmt`세액합계: ${total.vat}원`);
