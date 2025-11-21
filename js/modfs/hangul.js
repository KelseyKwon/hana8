/**
 * 마지막 글자 추출 하고
 * 1. 영어면 false
 * 2. 숫자면 false
 *
 * 그리고 한글이면 ->
 */
var X = 999;
export default X; //readonly -> 오직 읽을 수 있다!
Array.prototype.mapBy = function (prop) {
  return this.map((a) => a[prop]);
};
console.log("*********");
export const isEndJaum = (str) => {
  // export -> 나갈 수 있다
  /**
    // Falsy => 거짓같은 값인지 체크한다.
    if (!str) return false;
    
    // 마지막 글자의 아스키 코드값을 반환
    const lastCode = str.charCodeAt(str.length - 1);

    // 가 ~ 힣이 아니면 => false!
    if (lastCode < 0xAC00 || lastCode > 0xD7A3) {
        return false;
    }

    // 한글 종성은 총 27개 -> 종성이 없는 것을 주기로 돌면
    // 28개를 주기로 한번씩 돈다.
    // 따라서 %28 > 0이면 받침이 있는 것!
    return (lastCode - 0xAC00) % 28 > 0;
    */
  const alphaNums = "lmnr1356780"; //발음상 받침이 있는 문자들
  const lastCHar = str.at(-1);

  //   if (alphaNums.includes(lastCHar)) return true;
  if (/[lmnr1356780]/i.test(lastCHar)) return true;
  //alphaNums.match(lastCHar)) return true;
  const lastCharCode = lastCHar.charCodeAt();

  /**
   * charCodeAt을 계속 부르면 부를때마다 CPU를 차지하게 됨
   * -> 전기세를 많이 먹게 된다!
   * 따라서 가 = 44032라고 따로 저장해둠 (백엔드 관점)
   */
  //   const 가 = "가".charCodeAt();  => 프론트엔드가 짜는 방식.
  const 가 = 44032; // "가".charCodeAt()
  //   console.log("🚀 ~ isEndJaum ~ 가:", 가);
  const 힣 = "힣".charCodeAt();
  //   console.log("🚀 ~ isEndJaum ~ 힣:", 힣);
  if (
    lastCharCode >= 가 &&
    lastCharCode <= 힣 &&
    (lastCharCode - 가) % 28 !== 0
  )
    return true;

  const ㄱ = "ㄱ".charCodeAt();
  const ㅎ = "ㅎ".charCodeAt();
  if (lastCharCode >= ㄱ && lastCharCode <= ㅎ) return true;

  return false;
};

// const iga = (str) => (isEndJaum(str) ? "이" : "가");
// const eunun = (str) => (isEndJaum(str) ? "은" : "는");
// const eulul = (str) => (isEndJaum(str) ? "을" : "를");
// const eyuya = (str) => (isEndJaum(str) ? "이어야" : "여야");
// const irang = (str) => (isEndJaum(str) ? "이랑" : "랑");
const josa = (str, ja_mo) => {
  const [ja, mo] = ja_mo.split("/");
  return `${isEndJaum(str) ? ja : mo}`;
};
export const iga = (str) => josa(str, "이/가");
export const eunun = (str) => josa(str, "은/는");
export const eulul = (str) => josa(str, "을/를");
export const eyuya = (str) => josa(str, "이어야/여야");
export const irang = (str) => josa(str, "이랑/랑");

// 문자열이 한글 자음으로 끝나는지 체크하는 함수를 작성하시오.
isEndJaum("강원도"); // false
isEndJaum("바라당"); // true
isEndJaum("ㅜㅜ"); // false
isEndJaum("케잌"); // true
isEndJaum("점수 A"); // false lmnr   cf. isEndJaum('알파벳L')은 true
isEndJaum("24"); // false   cf. isEndJaum('23')은 true 136780

// 조사 '이/가, 을/를, 은/는'를 알아서 붙이는 함수를 작성하시오.
console.log(`고성군${iga("고성군")}`); // 고성군이  cf. `강원도${iga('강원도')}` ⇒ 강원도가
console.log(`고성군${eunun("고성군")}`); // 고성군은  cf. `강원도${eunun('강원도')}` ⇒ 강원도는
console.log(`고성군${eulul("고성군")}`); // 고성군을  cf. `강원도${eulul('강원도')}` ⇒ 강원도를
// (추가) ~이어야/여야, ~이랑/랑           isEndJaum('북면') ?  '이' : '가')

const searchByKoreanInitialSound = (data, first) => {
  // ㄱ => [ㄱ가 - 깋]
  // ㄴ => [ㄴ나 - 닣]
  // ㄱㄴ 검색 => [ㄱ가-깋][ㄴ나-닣]
  // IDEA : 매핑 테이블 -> ㄱ <-> 가, ㄴ <-> 나 가 서로 1:1 대응이 된다.
  // 테스트할때는 시작지점과 끝 지점에 대한 테스트를 꼭 진행해야 한다!
  const ㄱㄴㄷ = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
  const 가나다 = "가까나다따라마바빠사싸아자짜차카타파하";
  const 힣next = "힣".charCodeAt(0) + 1;

  // IDEA : first의 문자 하나마다 정규식 문자열을 ㅗ립한다.
  const regStr = [...first].reduce((reg, c) => {
    const idx = ㄱㄴㄷ.indexOf(c); // 'ㄱ'의 index = 0, 'ㄲ'의 index = 1
    const S = 가나다[idx]; // 가나다[idx] => 가나다[0] = 가
    // 마지막 글자의 ascII을 알려면 -> 즉, ㄱ의 초성이 적용되는 범위를 알려면
    // 까 직전 -> 즉, 까의 ascII을 알아내고, 1을 빼면 된다.
    const eCode = (가나다[idx + 1].charCodeAt() ?? 힣nextCode) - 1;

    // [ㄱ가-깋][ㄴ나-닣] 이렇게 나온다.
    return `${reg}[${c}${S}-${String.fromCharCode(eCode)}]`; // [가 - 깋]
  }, "");
  console.log("🚀 ~ searchByKoreanInitialSound ~ regStr:", regStr);
  const regexp = new RegExp(regStr); //[ㄱ가-깋]
  return data.filter((d) => regexp.test(d)); // 홍길동 비교해서 -> 참이 나오는 사람만 filtering
};

// 초성 검색을 하는 search함수를 정규식을 이용하여 작성하시오.
s = [
  "강원도 고성군",
  "고성군 토성면",
  "토성면 북면",
  "북면",
  "김1수",
  "홍길동",
]; // 끝 지점에 대한 testCode
searchByKoreanInitialSound(s, "ㄱㅅㄱ"); // /[ㄱ가-깋][ㅅ사-싷][ㄱ가-깋]/
searchByKoreanInitialSound(s, "ㅌㅅㅁ");
searchByKoreanInitialSound(s, "ㅂㅁ");
searchByKoreanInitialSound(s, "ㅍㅁ");
searchByKoreanInitialSound(s, "ㄱ1ㅅ");
