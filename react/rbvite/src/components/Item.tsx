import { useRef, useState, type FormEvent, type RefObject } from "react";

import Small from "./ui/Small";
import Button from "./ui/Button";
import LabelInput from "./ui/LabelInput";
import { FilePlus2Icon, RotateCcwIcon, SaveIcon } from "lucide-react";
import { useSession, type ItemType } from "../hooks/SessionContext";

type Props = {
  // App에 정의된 Item
  item: ItemType;
  toggleAdding ?: () => void;
}

export default function Item({item, toggleAdding}: Props) {
  // type을 잘 정의하기!
  // setEditing은 아이템이 0일때 true가 된다. item.id가 없다면, true가 된다. 
  const {removeItem, saveItem} = useSession();
  const [isEditing, setEditing] = useState(!item.id);
  const [hasDirty, setDirty] = useState(false);
    // const idRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)

    const checkDirty = () => {
      // if (nameRef.current && priceRef.current) {
      // 처음에 전달된 아이템의 이름이 다르거나, 전달딘 가겨이 다르면
      setDirty((item.name !== nameRef.current?.value || item.price !== Number(priceRef.current?.value)));
    }
  
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
        return;
      }
       saveItem({ id: item.id, name: name ?? '', price: Number(price) });
      if (nameRef.current && priceRef.current) {
        nameRef.current.value = '';
        priceRef.current.value = '';
        nameRef.current.focus();
      }

    setEditing(false);
    setDirty(false);
    if (toggleAdding) toggleAdding();
    }

  const makeEdit = () => {
    setEditing(!isEditing);
    // if (nameRef.current && priceRef.current) {
    //   nameRef.current.value = item.name; //dom이기 때문에 nullable하다.
    //   priceRef.current.value = String(item.price); //dom이기 때문에 nullable하다. toString이면 null일 수 있으니까 String()으로 하기. 
    // }
  }

  // reset할 떄 값을 원 위치로 돌리는 것이 가장 중요하다!
  const cancelEdit = () => {
    setEditing(!isEditing);
    if (nameRef.current && priceRef.current) {
    nameRef.current.value = item.name;
    priceRef.current.value = String(item.price);
    if (toggleAdding) toggleAdding();
  }
};

  return (<>
  {/* isEditing이 아니면 수정을,  */}
  {isEditing ? (
    <form onSubmit={editItem} className='flex gap-1'>
          {/* <input type='number' ref={idRef} placeholder='id...' className='w-14'/> */}
          <LabelInput ref={nameRef} defaultValue={item.name} onChange={checkDirty} placeholder='name...' />
          <LabelInput type = 'number' ref={priceRef} defaultValue={item.price} onChange={checkDirty}  placeholder='price...' />
          <Button onClick={cancelEdit} type= 'reset' className=''><RotateCcwIcon /></Button>
          {/* {hasDirty && (<Button type= 'submit' className='text-blue-500' ><FilePlusIcon>
            </FilePlusIcon></Button>)} */}
            {hasDirty && (
            <Button
              type='submit'
              className='text-blue-500'
              disabled={!hasDirty}
            >
              {item.id ? <SaveIcon /> : <FilePlus2Icon />}
            </Button>
          )}
        </form>) : (<>
        <Small>{item.id}.</Small>
        <button onClick={(makeEdit)}className="border-0 p-0 hover:bg-inherit hover:underline" >{item.name}</button>
            <Small>{item.price.toLocaleString()}원</Small>
            <Button onClick={() => {if (removeItem) removeItem(item.id)}} className='ml-2 px-1 py-0 text-sm bg-red-500 hover:bg-red-600 text-white shadow2-lg hover:shadow-2xl active:scale-150 transition duration-300'>X</Button></>)
  }
  </>)
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