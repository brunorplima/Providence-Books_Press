import React, { CSSProperties } from 'react';
import { SMALL } from '../../../util/inputFormSizes';

interface Props {
   readonly options: string[];
   readonly selectClassName: string;
   readonly value: any;
   readonly setValue: Function;
   readonly size?: string;
   readonly isRequired?: boolean;
   readonly containerClassName?: string;
   readonly label?: string;
   readonly disabled?: boolean;
}

const FormSelect: React.FC<Props> = ({
   options,
   selectClassName,
   value,
   setValue,
   size,
   isRequired,
   containerClassName,
   label,
   disabled
}) => {
   const style: CSSProperties = {
      width: size ? size : '100%'
   }

   return (
      <div 
         className={containerClassName}
      >
         {label && <label>{label} {isRequired && '*'}</label>}
         <select
            className={selectClassName}
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            style={style}
            disabled={disabled}
         >
            <option></option>
            {
               options.map((opt, idx) => <option key={opt + idx} value={opt}>{opt}</option>)
            }
         </select>         
      </div>
   )
}

export default FormSelect;