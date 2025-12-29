export type Book = { id: number; title: string; writer: string; msdn?: string };

// export -> module! 기본적으로 데이터가 하나만 생긴다.
// 근데 넥스트가 다시 새로 시작하면서, GET이 바라보는 books랑, POST, PATCH가 바라보는 books가 다르다.
export const books = [
  { id: 1, title: '1st book', writer: 'hong' },
  { id: 2, title: '2nd book', writer: 'kim' },
  { id: 3, title: '3rd book', writer: 'lee' },
];
