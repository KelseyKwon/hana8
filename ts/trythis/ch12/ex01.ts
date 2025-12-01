function add(a: number, b: string, c: boolean) { 
  return `${a} - ${b} + ${c}`;
}

type A = FirstArgs<typeof add>;  // number
type B = SecondArgs<typeof add>; // string
type C = Args<typeof add>;    
// number | string | boolean

type FirstArgs<F> = {

}

type SecondArgs<F> = {

}

type Args<F> = {

}

type AX = Args<typeof String.prototype.endsWith>;  // ⇒ string | number | undefined
type AX2 = Args<typeof String.prototype.charAt>;   // ⇒ number
