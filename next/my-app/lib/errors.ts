export const errorResponse = (err: unknown) => {
  let message = '';
  let status = 500;

  if (err instanceof HttpError) {
    // const { message, status } = err;
    message = err.message;
    status = err.status;
    // return NextResponse.json({ message, status }, { status });
    // 기타 에러
  } else if (isErrorWithMessage(err)) {
    // const { message } = err;
    // const status = 500;
    // return NextResponse.json({ message, status }, { status });
    message = err.message;
  } else {
    message = JSON.stringify(err);
  }
};
export class HttpError extends Error {
  // 초기화는 생성자에서 해줬기 때문에 안해줘도 된다.
  status: number;
  constructor(message: string, status: number) {
    // error의 메시지가 불림
    super(message);
    this.status = status;
  }
}

type WithMessage = {
  message: string;
};

// type predicate / err는 항상 unknown
export const isErrorWithMessage = (err: unknown): err is WithMessage =>
  err instanceof Error ||
  (typeof err === 'object' &&
    err !== null &&
    'message' in err &&
    typeof err.message === 'string');
