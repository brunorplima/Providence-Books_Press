import React, { CSSProperties } from 'react'
import { FaRegFileAudio } from 'react-icons/fa'
import { AiOutlineFileText, AiOutlineBook } from 'react-icons/ai'
import styles from '../../../styles/elements/ProductType.module.css'

interface Props {
   type: string,
   padding?: number | string,
   fontSize?: string,
   margin?: string,
   fontWeight?: string
}

const ProductType: React.FC<Props> = ({ type, padding, fontSize, margin, fontWeight }) => {

   function applyPropsStyles() {
      const style: CSSProperties = {};
      if (padding) style.padding = padding;
      if (fontSize) style.fontSize = fontSize;
      if (margin) style.margin = margin;
      return style;
   }


   function getTypeIcons() {
      switch (type) {
         case 'Book':
            return <AiOutlineBook />;
         case 'E-book':
            return <AiOutlineFileText />
         case 'Audio book':
            return <FaRegFileAudio />
         default:
            return null
      }
   }


   return (
      <div className={styles.type} style={applyPropsStyles()}>
         <div>{type.toUpperCase()}</div>
         <div className={styles.icon}>{getTypeIcons()}</div>
      </div>
   )
}

export default ProductType
