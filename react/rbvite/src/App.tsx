import './App.css';
import Hello from './components/Hello';
import My from './components/My';
import { useCounter } from './hooks/CounterContext';

function App() {
  // const [count, setCount] = useState(0); -> 대신에 context에서 가져오면 된다! -> 냉장고에 count & pluscount을 넣은 것이다. 
  const { count } = useCounter();
  

  return (
    <div className='grid place-items-center h-screen mx-2'>
      <h1 className='text-3xl'>count: {count}</h1>
      <My />
      <Hello>
        {/* hello의 children이 된다.  */}
        반갑습니다.
      </Hello>
    </div>
  );
}

export default App;
