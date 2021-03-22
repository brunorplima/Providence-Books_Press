import React from 'react'
import styles from '../../../styles/products-list/ProductItem.module.css'

interface Props {
   flag: string,
   isRelativePos?: boolean
}

const ProductItemFlag: React.FC<Props> = ({ flag, isRelativePos }) => {
   if (!flag) return null;

   return (
      <div className={(!isRelativePos ? styles.defaultFlag : styles.biggerFlag) + ' ' + styles.flag}>
         <div>{flag}</div>
         <div className={isRelativePos ? `${styles.triangleTopLeftDefault} ${styles.triangleTopLeft}` : styles.triangleTopLeftDefault}></div>
         <div className={isRelativePos ? `${styles.triangleBottomLeftDefault} ${styles.triangleBottomLeft}` : styles.triangleBottomLeftDefault}></div>
      </div>
   )
}

export default ProductItemFlag
