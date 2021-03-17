import React from 'react'
import styles from '../../../styles/products-list/ProductItem.module.css'

interface Props {
   flag: string
}

const ProductItemFlag: React.FC<Props> = ({ flag }) => {
   if (!flag) return null;

   return (
      <div className={styles.flag}>
         <div>{flag}</div>
         <div className={styles.triangleTopLeft}></div>
         <div className={styles.triangleBottomLeft}></div>
      </div>
   )
}

export default ProductItemFlag
