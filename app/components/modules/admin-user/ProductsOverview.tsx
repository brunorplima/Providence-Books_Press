import Link from 'next/link';
import React, { createRef, useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { RiDeleteBinFill, RiFileEditFill } from 'react-icons/ri';
import { deleteProduct } from '../../../firebase/delete';
import AudioBook from '../../../interfaces-objects/AudioBook';
import Book from '../../../interfaces-objects/Book';
import EBook from '../../../interfaces-objects/EBook';
import Product from '../../../interfaces-objects/Product';
import Box from './Box';
import ListItem from './ListItem';
import styles from '../../../styles/admin-user/ProductsOverview.module.css';
import withState, { ListWithState } from './withState';
import { BiSearchAlt } from 'react-icons/bi';


const ProductsOverview: React.FC<ListWithState> = ({
   list,
   search,
   setSearch,
   pagination,
   listPageMax,
   increasePage,
   decreasePage,
   toFirstPage,
   toLastPage
}) => {

   const container = createRef<HTMLDivElement>();

   function paginate(action: '+' | '-' | 'first' | 'last') {
      let pageWasChanged: boolean;
      if (action === '+') pageWasChanged = increasePage(Math.ceil(listToRender.length / listPageMax));
      if (action === '-') pageWasChanged = decreasePage();
      if (action === 'first') pageWasChanged = toFirstPage();
      if (action === 'last') pageWasChanged = toLastPage(Math.ceil(listToRender.length / listPageMax));
      if (pageWasChanged) container.current.scrollIntoView();
   }

   let listToRender: Product[] = list;
   if (search) {
      const regexp = new RegExp(search, 'i');
      listToRender = listToRender.filter(item => item.name.match(regexp))
   }

   return (
      <div ref={container}>
         <Box paddingVertical title='BOOKS, E-BOOKS AND AUDIOBOOKS'>
            <div>
               <div className={styles.productsListHeader}>
                  <div className={styles.search}>
                     <div><BiSearchAlt /></div>
                     <div>
                        <input
                           type='text'
                           value={search}
                           onChange={e => setSearch(e.currentTarget.value)}
                           placeholder='Search'
                        />
                     </div>
                  </div>
               </div>

               <div className={styles.productsList}>
                  {
                     listToRender
                        .filter((prod, idx) => {
                           const max = pagination * listPageMax - 1;
                           const min = pagination * listPageMax - listPageMax - 1;
                           return idx > min && idx <= max;
                        })
                        .map((prod, idx) => {
                           const product = (prod as Book | EBook | AudioBook);
                           return (
                              <ListItem key={product._id} isFirstItem={!idx}>
                                 <div className='LI-id'>
                                    {product._id}
                                    {/* Index: {products.findIndex(p => p._id === prod._id)} */}
                                 </div>

                                 <div className='LI-image'>
                                    <Link href={`/product/${product._id}`}><a>
                                       <img src={product.images[0]} />
                                    </a></Link>
                                 </div>

                                 <div className='LI-flex3'>
                                    <Link href={`/product/${product._id}`}><a className='LI-link'>
                                       <div className={styles.productName}>{product.name}</div>
                                       {product.subtitle && <div className={styles.productSubtitle}>{product.subtitle}</div>}
                                    </a></Link>
                                 </div>

                                 <div className='LI-flex3'>
                                    <div>{product.authors}</div>
                                    <div>{product.category}</div>
                                    <div>{product.publisher}</div>
                                    {'readBy' in product && <div>{product.readBy}</div>}
                                 </div>

                                 <div className='LI-flex2'>
                                    <div>{product.type}</div>
                                    {'weight' in product && <div>{product.weight.toFixed(3)} Kg</div>}
                                    {'numberPages' in product && <div>{product.numberPages} Pages</div>}
                                    {'fileExtensions' in product && <div>{product.fileExtensions.join(', ')}</div>}
                                    {'duration' in product && <div>{product.duration}</div>}
                                    {'stock' in product && <div>{product.stock} in stock</div>}
                                 </div>

                                 <div className='LI-flex2'>
                                    {'coverType' in product && <div>{product.coverType}</div>}
                                    <div>{product.isbn}</div>
                                 </div>

                                 <div className='LI-actions'>
                                    <div><RiFileEditFill /></div>
                                    <div onClick={() => deleteProduct(product._id)}>
                                       <RiDeleteBinFill />
                                    </div>
                                 </div>
                              </ListItem>
                           )
                        })
                  }
               </div>

               <div className={styles.productsListFooter}>
                  <div>There are {listToRender.length} products</div>
                  <div className={styles.paginationControllers}>
                     <div onClick={() => paginate('first')}><FaAngleDoubleLeft /></div>
                     <div onClick={() => paginate('-')}><FaAngleLeft /></div>
                     <div>
                        {pagination * listPageMax - listPageMax + 1} - {pagination * listPageMax > list.length ? list.length : pagination * listPageMax}
                     </div>
                     <div onClick={() => paginate('+')}><FaAngleRight /></div>
                     <div onClick={() => paginate('last')}><FaAngleDoubleRight /></div>
                  </div>
               </div>
            </div>
         </Box>
      </div>
   )
}

export default withState<ListWithState, Product>(ProductsOverview);