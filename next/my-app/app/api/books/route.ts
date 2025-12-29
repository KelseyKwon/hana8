import { type NextRequest, NextResponse } from 'next/server';
import { books } from './bookdata';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const searchStr = searchParams.get('q') ?? '';

  return NextResponse.json(
    books.filter((book) => book.title.includes(searchStr)),
  );
}

export async function POST(req: NextRequest) {
  const { title, writer } = await req.json();
  const id = Math.max(...books.map((book) => book.id), 0) + 1;

  // client는 상태로 -> setBooks로 해야 한다 (왜냐? 리액트가 순수함수만 처리하므로)
  // server는 아래와 같이 하면 된다.
  const newer = { id, title, writer };
  books.push(newer);

  // body는 항상 await으로 비동기로 가져와야 함.
  return NextResponse.json(newer);
}

// param : Promise, async : 서버에서 읽어오기 때문에
export async function GET1(req: NextRequest) {
  const { host, hostname, searchParams, origin, pathname, basePath } =
    req.nextUrl;
  return NextResponse.json({
    host,
    hostname,
    pathname,
    origin,
    basePath,
    q: searchParams.get('q'),
  });
}
