import { type NextRequest, NextResponse } from 'next/server';
import { books } from '../bookdata';

type Params = {
  // params는 넘버라 해도 스트링으로 처리해야 한다!
  params: Promise<{ bookId: string }>;
};
export async function GET(_req: NextRequest, { params }: Params) {
  const { bookId } = await params;
  // bookId는 String, book.id는 number
  const book = books.find((book) => book.id === +bookId);
  // 못 찾았을때 : 404 page로 보내줘!
  if (!book)
    return NextResponse.json(
      { message: `Not found #${bookId}`, error: 404 },
      { status: 404 },
    );

  // 찾았을때 :
  return NextResponse.json(book);
}
