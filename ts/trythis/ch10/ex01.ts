const isStringNumber = (value: unknown): value is [string, number] => {
  return (
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
class Retriever implements Dog {
  name = "Rex";
}

function isDog(a: Animal): a is Dog {
  return "name" in (a as any);
}
