const hasMessageError = (error: unknown): error is Error =>
  error instanceof Error ||
  (error !== null &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string");

    // message가 없는 애들은 메시지까지 불여주기
const messageError = (error: unknown) => hasMessageError(error) ? error.message : JSON.stringify(error);
// 다음에서 '가', '나', '다' 어떤 걸 throw 해도 에러 메시지를 출력하도록 (라) 부분을 수정하시오. (type predicate)
try {
  // throw new Error('some error!!!!');   // 가 : Error 객체
  // throw 'some string error!!!';        // 나 : string
  throw ["some", "array", "error"]; // 다 : 배열
} catch (error) {
  //   if (error instanceof Error)
  if (messageError(error)) console.log(error); // (라)
}
