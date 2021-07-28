import React, { CSSProperties } from 'react';
import { SMALL } from '../../../util/inputFormSizes';

interface Props {
   readonly inputClassName: string;
   readonly setFiles: Function;
   readonly size?: string;
   readonly isRequired?: boolean;
   readonly containerClassName?: string;
   readonly name?: string;
   readonly label?: string;
   readonly multiple?: boolean;
}

const ImageFormInput: React.FC<Props> = ({
   inputClassName,
   containerClassName,
   setFiles,
   size,
   isRequired,
   name,
   label,
   multiple
}) => {

   const style: CSSProperties = {
      width: size ? size : SMALL,
   }

   return (
      <div className={containerClassName ? containerClassName : ''}>
         <label htmlFor={name}>{label} {isRequired && '*'}</label>
         <input
            type='file'
            className={inputClassName}
            onChange={e => setFiles(e.target.files)}
            required={isRequired}
            style={style}
            multiple={multiple}
         />
      </div>
   )
}

export default ImageFormInput;
