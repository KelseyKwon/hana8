// SayHello button 컴포넌트 -> page or layout 에 붙일 수 있다.
export default function SayHello({ name }: { name: string }) {
  return (
    <button
      onClick={() => alert(`Hello, ${name}!`)}
      className="cursor-pointer rounded-md border p-1"
      suppressHydrationWarning
    >
      Hello, {name} - {Date.now()}
    </button>
  );
}
