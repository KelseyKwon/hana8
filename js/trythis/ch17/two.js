const assert = require("assert");

//
const upperToLower = (str) => {
  return str.replace(/[A-Z]/g, (match) => `*${match.toLowerCase()}*-`);
};

const swapCase = (str) =>
  /** 
    let result = "";
    for (const char of str) {
        if (char === char.toLowerCase()) {
        result += char.toLowerCase();
        } else {
        result += char.toUpperCase();
        }
    }
    return result;
    */

  // 정규식 사용해서
  str.replace(
    /([A-Z])([a-z]*)/g,
    (_, up, low) => `${up.toLowerCase()}${low.toUpperCase()}`
  );

assert.equal(swapCase("Hanaro 8 Class"), "hANARO 8 cLASS");

/** 
const telfmt = (tel) => {
  const len = tel.length;
  // 일반 / 8자리(1588-0000) / 서울 지역 번호(02-) / 0507
  if (len === 8) {
    return tel.replace(/(\d{4})(\d{4})/, "$1-$2");
  }

  if (tel.startsWith("02")) {
    return tel.replace(/(02)(\d{3,4})(\d{4})/, "$1-$2-$3");
  }

  if (len === 12) {
    return tel.replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3");
  }

  return tel.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
};
*/

// 한국에만 적용이 된다. Locale을 잡아주면 글로벌로 가능!
const telfmt = (tel) => {
  const len = tel?.length;
  if (!len || len < 5) return tel; // 4자리 이하
  if (len <= 8) return `${tel.substring(0, len - 4)}-${tel.substring(len - 4)}`; // 8자리
  const n = tel.startsWith("02") ? 2 : 3;
  const e = len > 11 ? len - 11 : 0; // 12자리일 경우 앞자리를 늘려줌
  const regex = new RegExp(`(\\d${n + e})(\\d{3, 4})(\\d{4})`);
  return tel.replace(regex, "$1-$2-$3");
};

// 문자열 str에서 대문자만 골라 소문자로 변환하세요. (trythis: 대문자 <-> 소문자)
upperToLower("abc Senior Coding Learning JS");
// ⇒ 'abc *s*-enior *c*-oding *l*-earning *j*-*s*-'

// 전화번호를 정확한 형식으로 출력하는 함수를 작성하시오.
telfmt("0101234567"); // '010-123-4567'
telfmt("01012345678"); // '010-1234-5678'

telfmt("0212345678"); // '02-1234-5678'
telfmt("021234567"); // '02-123-4567'

telfmt("0331234567"); // '033-123-4567'
telfmt("15771577"); // '1577-1577'
telfmt("07012341234"); // '070-1234-1234'
// ex) in JSX
//    <small>{telfmt(user.tel)}</small>

assert.equal(
  swapCase("Senior Coding Learning JS"),
  "sENIOR cODING lEARNING js"
);
assert.equal(swapCase("Hanaro 8 Class"), "hANARO 8 cLASS");

assert.deepStrictEqual(telfmt("0101234567"), "010-123-4567");
assert.deepStrictEqual(telfmt("01012345678"), "010-1234-5678");
assert.deepStrictEqual(telfmt("0212345678"), "02-1234-5678");
assert.deepStrictEqual(telfmt("021234567"), "02-123-4567");
assert.deepStrictEqual(telfmt("0331234567"), "033-123-4567");
assert.deepStrictEqual(telfmt("15771577"), "1577-1577");
assert.deepStrictEqual(telfmt("07012341234"), "070-1234-1234");
assert.deepStrictEqual(telfmt("050712345678"), "0507-1234-5678");
