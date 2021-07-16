import React from 'react';
import styles from '../../../styles/form/FormGroup.module.css';

interface Props {
   // readonly gridAreas: string;
}

const FormGroup: React.FC<Props> = ({ children }) => {
   return (
      <fieldset
         className={styles.container}
      >
         {children}
      </fieldset>
   )
}

export default FormGroup;
