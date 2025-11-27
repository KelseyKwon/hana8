// 다음에서 '가', '나', '다' 어떤 걸 throw 해도 에러 메시지를 출력하도록 (라) 부분을 수정하시오. (type predicate)
try {
  // throw new Error('some error!!!!');   // 가
  // throw 'some string error!!!';        // 나
  throw ["some", "array", "error"]; // 다
} catch (error) {
  if (error instanceof Error) console.log((error as Error).message); // (라)
}
