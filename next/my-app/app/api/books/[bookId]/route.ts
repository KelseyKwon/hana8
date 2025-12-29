import { type NextRequest, NextResponse } from 'next/server';
import { errorResponse, HttpError } from '@/lib/errors';
import { type Book, books } from '../bookdata';

type Params = {
  // params는 넘버라 해도 스트링으로 처리해야 한다!
  params: Promise<{ bookId: string }>;
};

type ReturnBookOrIndex<T extends boolean = false> = T extends true
  ? number
  : Book;

// 아래는 너무 지저분져서 잘 안씀 -> generic!
// //====== function overload =======//
// function getBook({params}: Params, i: true): Promise<number>
// function getBook({params}: Params, i: false): Promise<number>
// function getBook({params}: Params): Promise<number>

const getBook = async <T extends boolean = false>(
  { params }: Params,
  isIndex?: T,
) => {
  const { bookId } = await params;
  const fn = isIndex ? books.findIndex : books.find;
  // const book = books.find((book) => book.id === +bookId);
  const book = fn.bind(books)((book) => book.id === +bookId);

  // findINdex에서 못찾을 때, find에서 못 찾을 때
  if (book === -1 || book === undefined)
    throw new HttpError(`Not found book (id: #${bookId}`, 404);
  // return book as ReturnBookOrIndex<T>;
  return book as ReturnBookOrIndex<T>;
};

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const book = await getBook({ params });
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
    const bookIdx = await getBook({ params }, true);

    // books라는 객체를 새로 만들지 않아야 한다 (주소를 안 만들어야 한다) => 따라서 [...] 보다는, splice로 만ㄷㄴ다!
    // books.splice(bookIdx, 1);
    return NextResponse.json(books.splice(bookIdx, 1));
  } catch (err) {
    return errorResponse(err);
  }
}

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    console.log('*****', process.env.DB_PASSWD);
    console.log('*****', process.env.DB);
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
