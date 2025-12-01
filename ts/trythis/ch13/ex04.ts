// -- ComponentProps<Compo> :   <Comp name={...} age={33}   />
// regist 함수가 다음과 같을 때 파라미터 처리를 해보세요.
function registUserObj({ name, age }: { name: string; age: number }) {
  const id = 100;
  return { id, name, age };
}
// Parameters랑 같은 코드
type ComponentProps<F extends (...args: any) => void> = F extends (
  ...args: infer ARGS
) => void
  ? ARGS[0]
  : never;

type RegistUserObj = Parameters<typeof registUserObj>[0];
type RegistUserObj2 = ComponentProps<typeof registUserObj>[0];

const paramObj: RegistUserObj = { name: "Hong", age: 32 };
const newUser2 = registUserObj(paramObj);
console.log("🚀  newUser2:", newUser2);
