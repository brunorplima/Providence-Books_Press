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
}

const FormSelect: React.FC<Props> = ({
   options,
   selectClassName,
   value,
   setValue,
   size,
   isRequired,
   containerClassName,
   label
}) => {
   const style: CSSProperties = {
      width: size ? size : SMALL
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