import { useRef, useState, type FormEvent, type RefObject } from "react";
import type { ItemType } from "../App"
import Small from "./ui/Small";
import Button from "./ui/Button";
import LabelInput from "./ui/LabelInput";
import { FilePlusIcon } from "lucide-react";

type Props = {
  // App에 정의된 Item
  item: ItemType;
  removeItem : (id: number) => void;
  // addItem: (id: number, name:string, price:number) => void;
  // addItem: (item : Item) => void; // destructuring
  saveItem: ({id, name, price} : ItemType) => void; // destructuring
}

export default function Item({item, removeItem, saveItem}: Props) {
  // type을 잘 정의하기!
  const [isEditing, setEditing] = useState(false);
  const [hasDirty, setDirty] = useState(false);

    // const idRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)

    const {id, name, price} = item;
  
    const editItem = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // name & price가 가야함
      const name = nameRef.current?.value;
      // 없을 수도 있기 떄문에 number로 처리 안함
      const price = priceRef.current?.value;
      let msg;
      let ref: RefObject<HTMLInputElement | null> | null = null;
  
      if (!name) {
        // alert('Input the item name!');
        // nameRef.current?.focus();
        msg = 'Input the item name!';
        ref = nameRef;
      }
      if (!price) {
        msg = 'Input the item price';
        ref = priceRef;
      }
  
      if (msg) {
        alert(msg);
        if (ref && ref.current) ref.current.focus();
      }
       saveItem({ id: 0, name: name ?? '', price: Number(price) });
      if (nameRef.current && priceRef.current) {
        nameRef.current.value = '';
        priceRef.current.value = '';
        nameRef.current.focus();
      }
    }

  return <>
  <Small>{id}.</Small>
            {name}
            <Small>{price.toLocaleString()}원</Small>
            <Button onClick={() => removeItem(id)} className='ml-2 px-1 py-0 text-sm bg-red-500 hover:bg-red-600 text-white shadow2-lg hover:shadow-2xl active:scale-150 transition duration-300'>X</Button>
      
      <form onSubmit={editItem} className='flex gap-1'>
          {/* <input type='number' ref={idRef} placeholder='id...' className='w-14'/> */}
          <LabelInput ref={nameRef} placeholder='name...' />
          <LabelInput type = 'number'ref={priceRef} placeholder='price...' />
          <Button type= 'submit' className='text-blue-500'><FilePlusIcon>
            </FilePlusIcon></Button>
        </form>'
  </>;

  
}

// import { useState } from "react";
// import type { Session } from "../App";

// type Prop = {
//     session: Session;
// };

// export default function Item({session} : Prop) {
//     const [session, setSession] = useState<Session>(DefSes);
    
//     const removeItem = (id: number) => {
//     if(!confirm('Are u sure?')) return; // 뒤에 리턴문에 가는 것을 무겁게 하면 안좋다.
//     // setSession({...session, cart: [...session.cart.filter(item => item.id !== id)]})

//     // 카트의 주소만 바꾼 것이다. 
//     setSession({...session, cart: session.cart = session.cart.filter(item => item.id !== id)})
//   }

//   const addItem = (name:string, price: number) => {
//     // max는 반드시 iterator로 펼쳐서 받아야 한다. 
//     // ...와 같은 spread 연산자를 사용하면 id: Math.max([100, 200, 300]) 안에 배열이 펼쳐져서 나온다. 
//     const newItem = { id: Math.max(...session.cart.map(item => item.id), 0) + 1, name, price}
//     setSession({...session, cart: [...session.cart, newItem]})
//   }
//     <>Item</>
// } 
// // addItem, editItem, removeItem item