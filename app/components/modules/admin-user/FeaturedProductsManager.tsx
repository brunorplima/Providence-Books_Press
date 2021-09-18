import React, { useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { updateFeaturedProductIds } from '../../../firebase/update'
import Product from '../../../interfaces-objects/Product'
import { ReduxState } from '../../../redux/reducers/rootReducer'
import styles from '../../../styles/admin-user/AdminContent.module.css'
import ownStyles from '../../../styles/admin-user/FeaturedProductsManager.module.css'
import { getFromProducts } from '../../../util/productModelHelper'
import { useAdminContext } from '../../contexts/AdminProvider'
import FormInput from '../form/FormInput'
import ProductSelectDropdownMenu from './ProductSelectDropdownMenu'

const FeaturedProductsManager = () => {
   const [search, setSearch] = useState('')
   const { featuredProductIds, listenForFPIds } = useAdminContext()
   const products = useSelector(({ products }: ReduxState) => products)

   useEffect(() => {
      listenForFPIds()
   }, [])

   function deleteProductFromFP(id: string) {
      const ids = featuredProductIds.filter(fpId => fpId !== id)
      updateFeaturedProductIds(ids)
   }

   function selectProduct({ _id }: Product) {
      setSearch('')
      if (featuredProductIds.includes(_id)) return
      const ids = [...featuredProductIds, _id]
      updateFeaturedProductIds(ids)
   }

   return (
      <div className={styles.container} style={{ marginBottom: '4rem' }}>
         <h4>Featured Products Section</h4>

         <div className={ownStyles.searchContainer}>
            <FormInput
               type='text'
               value={search}
               setValue={setSearch}
               placeholder='Search products'
            />
            <ProductSelectDropdownMenu
               {...{ products, search, selectProduct }}
            />
         </div>

         <div className={ownStyles.productCards}>
            {
               featuredProductIds.length ?
                  featuredProductIds.map(id => {
                     const product = getFromProducts(id)
                     if (!product) return null
                     const { images, name, type } = product
                     return (
                        <div key={id} className={ownStyles.productCard}>
                           <div className={ownStyles.closeIcon} onClick={() => deleteProductFromFP(id)}>
                              <IoIosClose fontSize={46} color='#fff' />
                           </div>

                           <div className={ownStyles.productImage}>
                              <img src={images[0]} alt='Book cover' />
                           </div>

                           <div className={ownStyles.productTitle}>
                              <div>{name}{product.subtitle && ` - ${product.subtitle}`}</div>
                           </div>

                           <div className={ownStyles.productType}>
                              <div>{type}</div>
                           </div>
                        </div>
                     )
                  }) :
                  null
            }
         </div>
      </div>
   )
}

export default FeaturedProductsManager
