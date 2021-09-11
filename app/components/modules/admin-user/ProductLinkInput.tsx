import React, { useState, useEffect } from 'react'
import { ProductLink } from '../../../interfaces-objects/interfaces'
import FormInput from '../form/FormInput'
import styles from '../../../styles/form/ProductLinkInput.module.css'
import Product from '../../../interfaces-objects/Product'
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { ReduxState } from '../../../redux/reducers/rootReducer'
import { connect } from 'react-redux'
import clsx from 'clsx'

interface Props {
   readonly setLinks: React.Dispatch<React.SetStateAction<ProductLink[]>>
   readonly links: ProductLink[]
   readonly indexFrom: number
   readonly hasProduct: boolean
   readonly products?: Product[]
}

const ProductLinkInput: React.FC<Props> = ({ setLinks, links, indexFrom, hasProduct, products }) => {
   const [search, setSearch] = useState('')
   const [choseProduct, setChoseProduct] = useState(false)
   const [description, setDescription] = useState('')
   const [selectedProduct, setSelectedProduct] = useState<Product>(null)

   const link = links ? links[indexFrom] : null

   useEffect(() => {
      if (hasProduct) {
         setSelectedProduct(products.find(product => product._id === link?.relProductId))
         if (link) {
            setChoseProduct(true)
            setDescription(link.description)
            if (link.relProductId)
               setSearch(products.find(product => product._id === link.relProductId).name)
         }
      }
   }, [])

   const filteredResults = products.filter(product => product.name.match(new RegExp(search, 'i'))).slice(0, 5)

   function handleSearchChange(search: string) {
      setChoseProduct(false)
      setSearch(search)
   }

   function handleDescriptionChange(description: string) {
      setDescription(description)
      const newLink: ProductLink = { ...link, description }
      if (links)
         setLinks(links.map((link, idx) => idx === indexFrom ? newLink : link))
      else {
         const newLinks: ProductLink[] = []
         for (let i = 0; i <= indexFrom; i++) {
            if (i === indexFrom) newLinks.push(newLink)
            else newLinks.push(null)
         }
      }
   }

   function selectProduct(product: Product) {
      setChoseProduct(true)
      setSearch(product.name)
      setSelectedProduct(product)
      const newLinks: ProductLink[] = links ? links : []
      newLinks[indexFrom] = {
         description,
         relProductId: product._id
      }
      setLinks(newLinks)
   }

   function removeProduct() {
      setSelectedProduct(null)
      setSearch('')
      const newLinks = links
      newLinks[indexFrom] = { ...newLinks[indexFrom], relProductId: '' }
      setLinks(newLinks)
   }

   function addLinkInput() {
      const newLink: ProductLink = {
         description: '',
         relProductId: ''
      }
      if (links.length) setLinks([...links, newLink])
      else setLinks([newLink, newLink])
   }

   function removeLinkInput() {
      const newLinks = links.slice(0, links.length - 1)
      setLinks(newLinks)
   }

   return (
      <div className={styles.container}>
         {
            !indexFrom &&
            <div className={styles.controllers}>
               <div><AiFillPlusCircle size={19} onClick={addLinkInput} /></div>
               {
                  links?.length > 1 ?
                     <>
                        &nbsp;
                        <div><AiFillMinusCircle size={19} onClick={removeLinkInput} /></div>
                     </> :
                     null
               }
            </div>
         }

         <FormInput
            type='text'
            value={description}
            setValue={handleDescriptionChange}
            label='Link to Other Product'
            placeholder='Link description'
         />

         <div className={styles.searchContainer}>
            <FormInput
               type='text'
               value={search}
               setValue={handleSearchChange}
               placeholder='Search for a product'
            />

            {
               search && !choseProduct ?
                  <div className={styles.resultsContainer}>
                     {
                        filteredResults.length ?
                           filteredResults.map(product => (
                              <div key={product._id} className={styles.resultItem} onClick={() => selectProduct(product)}>
                                 <div className={styles.img}><img src={product.images[0]} alt='Book cover' /></div>

                                 <div className={styles.name}>
                                    <h5>{product.name}</h5>
                                 </div>

                                 <div className={styles.type}><div>{product.type}</div></div>
                              </div>
                           )) :
                           <div className={styles.resultItem}>
                              <div className={styles.img}></div>

                              <div className={styles.name}>
                                 <h5>No results found</h5>
                              </div>

                              <div className={styles.type}><div></div></div>
                           </div>
                     }
                  </div> : null
            }
         </div>

         {
            selectedProduct ?
               <div className={styles.resultsContainerFixed}>
                  <div className={clsx(styles.resultItem, styles.resultItemFixed)}>
                     <div className={styles.resultItemCheck} onClick={removeProduct}>
                        <AiFillCloseCircle size={22} />
                     </div>

                     <div className={styles.img}><img src={selectedProduct.images[0]} alt='Book cover' /></div>

                     <div className={styles.name}>
                        <h5>{selectedProduct.name}</h5>
                     </div>
                     <div className={styles.type}><div>{selectedProduct.type}</div></div>
                  </div>
               </div> :
               <div className={clsx(styles.resultItem, styles.resultItemEmpty)}>
                  <div></div>
                  <div><span>No product selected yet</span></div>
                  <div></div>
               </div>
         }
      </div>
   )
}

const mapStateToProps = ({ products }: ReduxState) => ({ products })

export default connect(mapStateToProps)(ProductLinkInput)
