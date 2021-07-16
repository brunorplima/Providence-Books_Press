import React, { CSSProperties } from 'react';
import { SMALL } from '../../../util/inputFormSizes';

interface Props {
   readonly type: 'text' | 'number';
   readonly inputClassName: string;
   readonly value: any;
   readonly setValue: Function;
   readonly size?: string;
   readonly isRequired?: boolean;
   readonly containerClassName?: string;
   readonly name?: string;
   readonly label?: string;
   readonly placeholder?: string;
   readonly gridArea?: string;
}

const FormInput: React.FC<Props> = ({
   type,
   inputClassName,
   containerClassName,
   value,
   setValue,
   size,
   isRequired,
   name,
   label,
   placeholder,
   gridArea
}) => {
   const style: CSSProperties = {
      width: size ? size : SMALL,
      gridArea: gridArea ? gridArea : ''
   }

   return (
      <div className={containerClassName ? containerClassName : ''}>
         <label htmlFor={name}>{label} {isRequired && '*'}</label>
         <input
            type={type}
            className={inputClassName}
            placeholder={placeholder}
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            required={isRequired}
            style={style}
         />
      </div>
   )
}

export default FormInput;
