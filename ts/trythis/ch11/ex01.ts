type User = {
  id: number;
  name: string;
  12: number;
};

// 1) 다음에서 key가 number 타입이면 key앞에 user_를 붙이세요.
type UserNumKeyPrefix<T, Prefix extends number> = {
  [k in keyof T as `user_${k}`]: T[k];
};

// 2) 다음에서 key가 string 타입인 것만 남기세요.

type UserOnlyStrKey<T> = {
  [k in keyof T & keyof string]: T[k];
};

// 3) User에서 key가 string 타입인 것만 남기고 prefix(user_)를 붙이세요 (2가지)
type UserOnlyStrKeyPrefix<T, Prefix extends string> = {
  [k in keyof T & keyof string as `user_${k}`]: T[k];
};
