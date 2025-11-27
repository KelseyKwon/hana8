const hasMessageError = (error: unknown): error is Error =>
  error instanceof Error ||
  (error !== null &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string");
// 다음에서 '가', '나', '다' 어떤 걸 throw 해도 에러 메시지를 출력하도록 (라) 부분을 수정하시오. (type predicate)
try {
  // throw new Error('some error!!!!');   // 가 : Error 객체
  // throw 'some string error!!!';        // 나 : string
  throw ["some", "array", "error"]; // 다 : 배열
} catch (error) {
  //   if (error instanceof Error)
  if (hasMessageError(error)) console.log(error.message); // (라)
}
