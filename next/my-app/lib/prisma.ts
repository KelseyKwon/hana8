import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import 'dotenv/config';
import { PrismaClient } from './generated/prisma/client';

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});

// const -> local, module scope. hmr (hot module replacement)
// 변경된 모듈만 리플레이스된다!
const newInstance = () => new PrismaClient({ adapter });

// 최초의 한번은 여기를 타게 된다.
// biome-ignore lint/suspicious/noShadowRestrictedNames: 'prisma single'
declare const globalThis: {
  prismaGlobal: ReturnType<typeof newInstance>;
} & typeof global;

export const prisma = globalThis.prismaGlobal || newInstance();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
