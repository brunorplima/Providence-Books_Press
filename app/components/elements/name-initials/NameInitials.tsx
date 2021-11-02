import React from 'react'
import styles from '../../../styles/elements/NameInitials.module.css'

interface Props {
   readonly name: string;
   readonly size?: number;
   readonly fontSize?: string;
}

const NameInitials: React.FC<Props> = ({ name, size, fontSize }) => {

   function getStyle() {
      const style: { [key: string]: any } = {};
      if (size) {
         style.height = size;
         style.width = size;
      }
      if (fontSize) {
         style.fontSize = fontSize;
      }
      return style;
   }

   return (
      <div
         className={styles.container}
         style={getStyle()}

      >
         {getInitials(name)}
      </div>
   )
}

export const getInitials = (name: string) => {
   const firstInitial = name[0];
   let nextInitials = '';
   for (let i = 0; i < name.length; i++) {
      if (name[i] === ' ' && name[i + 1]) {
         nextInitials += name[i + 1];
      }
   }
   return firstInitial + nextInitials;
}

export default NameInitials
