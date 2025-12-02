interface IUser {
  id: number;
  age: number;
  name: string;
}

interface IDept {
  id: number;
  age: string;
  dname: string;
  captain: string;
}

//==== ex01 ====//
// interface의 IUser에서 ''name'이라는
// type PartialRequired<T> = Partial<Omit<T, K>>, Required<T, K>
// type PartialRequired<T, K extends keyof T> = Partial<Omit<T, K>> & Required<Pick<T, K>>;
// type PartialRequired<T, R extends keyof T> = Partial<T> & Required<Pick<T, R>>;

type PartialRequired<T, R extends keyof T> = {
  [k in keyof T as k extends R ? never : k]?: T[k];
} & {
  // partial은 해결
  [k in keyof T as k extends R ? k : never]-?: T[k];
};

//
type User = PartialRequired<IUser, "name">; // name만 required
// type User2 = PartialRequired<IUser, 'addr'>; // name만 required

// let missName: User = {}; // Error! (: name is required)
let nameOnly: User = { name: "Hong" }; // OK
let nameWithId: User = { name: "Hong", id: 2 }; // OK
// let nameWithExtra: User = { name: 'Hong', idd: 2 }; // Fail(idd is not exists)
// console.log('🚀 ~', missName, nameOnly, nameWithId, nameWithExtra);

//==== ex02 ====//
/**
 * 두 타입을 합치고 일부는 제외하는 CombineExclude 유틸리티 타입 만들기
 * 힌트: 두 타입의 같은 key 라면 union type, 그렇지 않다면 각 타입의 key type
 * name || dname을 제외하라!
 *
 * T, U에서 일단 E인 것은 빼고 -> 그리고 같은 key라면 union -> 그렇지 않으면 각 타입의 key
 */
// type CombineExclude<T, U, E> = Exclude<T, E> & Exclude<U, E>((types) => types extends keyof U ? T & U : T | U )
// type CombineExclude<T, U, E extends PropertyKey> = {
//     [K in Exclude<keyof T | keyof U, E>] :
//     (K extends keyof T ? T[K]: never) |
//     (K extends keyof U ? U[K]: never);
// }

type CombineExclude<T, U, E> = {
  [k in keyof (T & U)]: k extends keyof T & keyof U ? T[k] | U[k] : (T & U)[k];
};

type ICombineExclude = CombineExclude<IUser, IDept, "name" | "dname">;
