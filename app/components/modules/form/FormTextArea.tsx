import clsx from 'clsx';
import React, { CSSProperties } from 'react';
import mainFormStyles from '../../../styles/form/MainForm.module.css';
interface Props {
   readonly value: any;
   readonly setValue: Function;
   readonly textareaClassName?: string;
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
      <div className={clsx(mainFormStyles.textareaContainer, containerClassName)} style={style}>
         {label && <label>{label} {isRequired && '*'}</label>}
         <textarea
            className={clsx(mainFormStyles.textareaField, textareaClassName)}
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            placeholder={placeholder && placeholder}
         >

         </textarea>
      </div>
   )
}

export default FormTextArea;
