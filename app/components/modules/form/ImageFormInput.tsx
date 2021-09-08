import React, { CSSProperties } from 'react';
import { SMALL } from '../../../util/inputFormSizes';
import mainFormStyles from '../../../styles/form/MainForm.module.css';

interface Props {
   readonly setFiles: Function;
   readonly inputClassName?: string;
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
      <div className={containerClassName ? containerClassName : mainFormStyles.inputContainer}>
         <label htmlFor={name}>{label} {isRequired && '*'}</label>
         <input
            type='file'
            className={inputClassName ? inputClassName : mainFormStyles.inputField}
            onChange={e => setFiles(e.target.files)}
            required={isRequired}
            style={style}
            multiple={multiple}
         />
      </div>
   )
}

export default ImageFormInput;
