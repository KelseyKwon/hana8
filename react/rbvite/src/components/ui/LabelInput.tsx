import { useId, type ChangeEvent } from 'react';

// 다른 것만 정의한다.
type Props = {
  type?: string;
  label?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  defaultValue?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  autoComplete?: '' | 'off' | 'email' | 'tel';
};

export default function LabelInput({
  type,
  label,
  ref,
  onChange,
  defaultValue,
  placeholder,
  className,
  required,
  autoComplete = '',
}: Props) {
  // useId : ID라는 map이 있는데, 키가 중복되지 않게 관리해준다.

  const inputId = useId();
  // console.log('🚀 ~ inputId:', inputId);

  return (
    <div>
      {/* // label이 true일떄만 보여줘라 -> && */}

      {label && (
        <label htmlFor={inputId} className='text-sm text-gray-600'>
          {label}
        </label>
      )}
      <input
        type={type || 'text'}
        id={inputId}
        ref={ref}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${className}`}
        required={required}
        autoComplete={autoComplete}
      />
    </div>
  );
}
