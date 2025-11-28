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

//======ex02========//
// captain의 type을 IUser로 바꾸기
type Change<T, K extends keyof T, U> = {
  [k in keyof T]: k extends keyof U ? U : T[k];
};
type DeptCaptain = Change<IDept, "captain", IUser>;
type Err = Change<IDept, "xxx", IUser>; // 존재하지 않는 키는 Error!!!

//========ex03=======//

// IUser와 IDept에서 key가 똑같으면 -> 그 타입을 일치시키기
// T쪽 키만 추가하기
// type Combine<T, U> = {
//   [k in keyof T]: k extends keyof U ? (T[k] | U[k]) : T[k]
// }

// IUser와 Idept에서 keyrk 똑같으면 -> 그 타입을 일치시키기
type Combine<T, U> = {
  [k in keyof T | keyof U]: k extends keyof T
    ? k extends keyof U
      ? T[k] | U[k]
      : T[k]
    : k extends keyof U
    ? U[k]
    : never;
};
type ICombined = Combine<IUser, IDept>;
