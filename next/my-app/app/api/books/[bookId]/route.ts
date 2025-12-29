import { type NextRequest, NextResponse } from 'next/server';
import { errorResponse, HttpError } from '@/lib/errors';
import { type Book, books } from '../bookdata';

type Params = {
  // params는 넘버라 해도 스트링으로 처리해야 한다!
  params: Promise<{ bookId: string }>;
};

const getBook = async ({ params }: Params, isIndex: boolean = false) => {
  const { bookId } = await params;
  const fn = isIndex ? books.findIndex : books.find;
  // const book = books.find((book) => book.id === +bookId);
  const book = fn((book) => book.id === +bookId);

  if (!book) throw new HttpError(`Not found book (id: #${bookId}`, 404);
  return book;
};

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const book = (await getBook({ params })) as Book;
    // 수정하고 싶은 것
    const { title, writer } = await req.json();
    book.title = title;
    book.writer = writer;

    return NextResponse.json(book);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    // 하지만 book이라는 객체말고, bookIdx가 필요하다 -> 뒤에 인자를 더한다! "DELETE"
    const bookId = (await getBook({ params }, true)) as number;
    const bookIdx = books.findIndex((book) => book.id === bookId);

    // books라는 객체를 새로 만들지 않아야 한다 (주소를 안 만들어야 한다) => 따라서 [...] 보다는, splice로 만ㄷㄴ다!
    books.splice(bookIdx, 1);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const book = await getBook({ params });
    /**  -> getBook으로 뺴기
    const { bookId } = await params;
    // bookId는 String, book.id는 number
    const book = books.find((book) => book.id === +bookId);
    // 못 찾았을때 : 404 page로 보내줘!

    if (!book)
      // lib/errors.ts로 빼기
      // return NextResponse.json(
      //   { message: `Not found #${bookId}`, error: 404 },
      //   { status: 404 },
      // );

      throw new HttpError(`Not found #${bookId}`, 404);
      */
    return NextResponse.json(book);
  } catch (err) {
    return errorResponse(err);
  }
}
