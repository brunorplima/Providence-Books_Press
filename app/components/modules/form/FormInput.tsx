import React, { CSSProperties } from 'react';
import { SMALL } from '../../../util/inputFormSizes';
import styles from '../../../styles/form/MainForm.module.css';

interface Props {
   readonly type: 'text' | 'number';
   readonly value: any;
   readonly setValue: Function;
   readonly size?: string;
   readonly isRequired?: boolean;
   readonly name?: string;
   readonly label?: string;
   readonly placeholder?: string;
   readonly isInline?: boolean;
   readonly containerStyle?: CSSProperties;
   readonly inputStyle?: CSSProperties
}

const FormInput: React.FC<Props> = ({
   type,
   value,
   setValue,
   size,
   isRequired,
   name,
   label,
   placeholder,
   isInline,
   containerStyle = {},
   inputStyle = { width: size ? size : '100%', }
}) => {
   if (isInline) {
      containerStyle.flexDirection = 'row'
      containerStyle.justifyContent = 'center'
      containerStyle.alignItems = 'center'
      inputStyle.marginLeft = '1rem'
   }

   const id = Math.ceil(Math.random() * 999999999999).toString()

   return (
      <div className={styles.inputContainer} style={containerStyle}>
         <label htmlFor={id}>{label} {isRequired && '*'}</label>
         <input
            {...{ type, placeholder, value, id, name }}
            className={styles.inputField}
            onChange={e => setValue(e.currentTarget.value)}
            required={isRequired}
            style={inputStyle}
         />
      </div>
   )
}

export default FormInput;
