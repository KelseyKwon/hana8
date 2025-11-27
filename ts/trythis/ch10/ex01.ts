const isStringNumber = (value: unknown): value is [string, number] => {
  return (
    // Array 한거 -> 타입 가드를 걸어놓은 것!
    Array.isArray(value) &&
    value.length == 2 &&
    typeof value[0] === "string" &&
    typeof value[1] === "number"
  );
};
const f1 = (value: number | string | boolean | [string, number]) => {
  if (isStringNumber(value)) {
    console.log(value[0].toUpperCase(), value[1].toFixed());
  }
};
f1(["item", 1000]);

interface Animal {}
interface Dog extends Animal {
  name: string;
}
interface Cat extends Animal {
  punch(): void;
}

class Navi implements Cat {
  punch() {
    console.log("kukuki");
  }
}
console.log("navi is dog:", isDog(new Navi()));
class Retriever implements Dog {
  name: string;
  // 구현 해줘야 함
  constructor(name: string) {
    this.name = name;
  }
}
const r = new Retriever("Maxx");
console.log("Maxx is dog:", isDog(r));

function isDog(a: Animal): a is Dog {
  //   return "name" in (a as any);
  return !!a && typeof a === "object" && "name" in a && !("punch" in a);
}
