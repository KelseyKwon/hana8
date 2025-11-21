class Pet {
  feed(nutrient) {
    console.log(`feed to ${this.name} :`, nutrient);
  }
}

class Emp extends Pet {
  constructor(name) {
    super();
    this.fullName = name;
  }

  // 'Kildong Hong'
  // property니까 소문자로 쓴다.
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }

  get fullName() {
    // instance pool에서 찾아야 하므로 무조건 this를 붙여줘야 한다!
    return `${this.firstName} ${this.lastName}`;
  }

  //   lowerName() {
  //     throw new Error("implement this!!");
  //   }
}

// class X extends Emp {
//     lowerName() {
//         // 반드시 재정의해줘야 함!
//     }
// }

const hong = new Emp("Kildong Hong");
console.log(hong.fullName);
hong.fullName = "Nanda Kim";
console.log(hong.fullName);

console.log(Object.getOwnPropertyDescriptor(Emp.prototype, "fullName"));
console.log(hong);

const kim = { id: 1, firstName: "Nanda", lastName: "Kim" };
const proxyObj = new Proxy(kim, {
  // x = target.fullName
  get(target, prop, receiver) {
    console.log("receiver>>", receiver === proxyObj);
    if (prop === "fullName") {
      return `${target.firstName} ${target.lastName}`;
    }
    return target[prop];
  },

  // target.fullName = x;
  set(target, prop, value, receiver) {
    if (prop === "fullName") {
      [target.firstName, target.lastName] = value.split(" "); // 배열로 만들기
    } else {
      target[prop] = value;
    }
  },
});

// console.log("🚀 ~ name:", kim.fullName); // fullname이 없으므로 당연히 안찍힘

console.log("🚀 ~ id:", proxyObj.fullName, kim.fullName);
console.log("🚀 ~ id:", kim.id);
console.log(proxyObj instanceof Emp);
// Proxy is not class -> just constructor function!

// Object.defineProperty(Emp.prototype, 'upperName', {})
// 없던 정의를 새로 접근하는 것.
Object.defineProperties(Emp.prototype, {
  upperName: {
    get() {
      return this.fullName.toUpperCase();
    },
  },
  lowerName: {
    get() {
      return this.fullName.toLowerCase();
    },
  },
});

// 함수는 메소드이기 떄문에 prototype에 심어버리면 된다.
Emp.prototype.nameLength = function () {
  return this.fullName.length;
};
console.log("upper>>", hong.upperName);
console.log("lower>>", hong.lowerName);
console.log("nameLength>>", hong.nameLength());

console.log("-----------------------");
Object.assign(Emp.prototype, { feed: Pet.prototype.feed });
console.log(hong.feed("xxxx"));
