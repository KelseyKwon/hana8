/**
type X = { id: "XS" | "S" | "M" | "L" | "XL"; price: number };
const SIZE: X[] = [
  { id: "XS", price: 8000 },
  { id: "S", price: 10000 },
  { id: "M", price: 12000 },
  { id: "L", price: 14000 },
  { id: "XL", price: 15000 },
];
*/

/** 
function calcTotalPrice(sizeOption: { [key: string]: number }) {
    // sizeOption 객체를 [key, value] 형태로 바꾸기 -> entries!
  return Object.entries(sizeOption).reduce((sum, [id, qty]) => {
    const found = SIZE.find((size) => size.id === id);

    if (!found) {
      return sum;
    }

    return sum + found.price * qty;
  }, 0);
}
  */

const SIZE = [
  { id: "XS", price: 8000 },
  { id: "S", price: 10000 },
  { id: "M", price: 12000 },
  { id: "L", price: 14000 },
  { id: "XL", price: 15000 },
] as const;
type O = { [k in keyof typeof SIZE]: typeof SIZE[k] };

const sizeOption1 = { XS: 1, S: 5, M: 2, L: 2, XL: 4 };
// typeof : 객체 앞에 있으면 sizeOption1을 객체화 시킨다.
// 그리고 keyof 하면 앞에 달린 key들만 반환하게 된다.
// type Q = keyof typeof sizeOption1;
const totalPrice1 = SIZE.reduce(
  (currPrice, size) => currPrice + sizeOption1[size.id] * size.price,
  0
);
console.log("🚀 ~ totalPrice1:", totalPrice1);

const sizeOption2 = { XS: 2, S: 3, MM: 4, L: 5, XL: 6 };
const totalPrice2 = SIZE.reduce(
  (currPrice, size) => currPrice + sizeOption2[size.id] * size.price,
  0
);
console.log("🚀 ~ totalPrice2:", totalPrice2);
