import React, { CSSProperties } from 'react';

interface Props {
   readonly textareaClassName: string;
   readonly value: any;
   readonly setValue: Function;
   readonly containerClassName?: string;
   readonly name?: string;
   readonly label?: string;
   readonly placeholder?: string;
   readonly isRequired?: boolean;
   readonly gridArea?: string;
}

const FormTextArea: React.FC<Props> = ({
   textareaClassName,
   value,
   setValue,
   containerClassName,
   name,
   label,
   placeholder,
   isRequired,
   gridArea
}) => {
   const style: CSSProperties = {
      gridArea: gridArea ? gridArea : ''
   }

   return (
      <div className={containerClassName} style={style}>
         {label && <label>{label} {isRequired && '*'}</label>}
         <textarea
            className={textareaClassName}
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
         >

         </textarea>
      </div>
   )
}

export default FormTextArea;
