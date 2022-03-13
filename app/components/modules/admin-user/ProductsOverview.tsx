import Link from 'next/link';
import React, { createRef } from 'react';
import AudioBook from '../../../interfaces-objects/AudioBook';
import Book from '../../../interfaces-objects/Book';
import EBook from '../../../interfaces-objects/EBook';
import Product from '../../../interfaces-objects/Product';
import Box from './Box';
import ListItem from './ListItem';
import styles from '../../../styles/admin-user/BoxContent.module.css';
import withListState, { ListWithState } from './withListState';
import { BiSearchAlt } from 'react-icons/bi';
import ListPagination from './ListPagination';
import ListSearch from './ListSearch';
import splitListInPages from '../../../util/splitListInPages';
import { deleteProduct } from '../../../firebase/delete';

const ProductsOverview: React.FC<ListWithState> = ({
   setItemToUpdate,
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



   let listToRender: Product[] = list.sort((a, b) => a.name < b.name ? -1 : 1);
   if (search) {
      const regexp = new RegExp(search, 'i');
      listToRender = listToRender.filter(item => item.name.match(regexp))
   }

   return (
      <div ref={container}>
         <Box paddingVertical title='BOOKS, E-BOOKS AND AUDIOBOOKS'>
            <div className={styles.listHeader}>
               <ListSearch search={search} setSearch={setSearch} />
            </div>

            <div className={styles.upperPagination}>
               <ListPagination
                  boxContainer={container}
                  listToRender={listToRender}
                  pagination={pagination}
                  listPageMax={listPageMax}
                  increasePage={increasePage}
                  decreasePage={decreasePage}
                  toFirstPage={toFirstPage}
                  toLastPage={toLastPage}
               />
            </div>

            <div className={styles.list}>
               {
                  splitListInPages<Product>(listToRender, pagination, listPageMax)
                     .map((prod, idx) => {
                        const product = (prod as Book | EBook | AudioBook);
                        return (
                           <ListItem
                              key={product._id}
                              itemId={product._id}
                              item={product}
                              onDelete={deleteProduct}
                              itemType='product'
                              isFirstItem={!idx}
                              setItemToUpdate={setItemToUpdate}
                              allowedActions={{
                                 hasEdit: true,
                                 hasDelete: true
                              }}
                           >
                              <div className='LI-id'>
                                 {product._id}
                              </div>

                              <div className='LI-image'>
                                 <Link href={`/product/${product._id}`}><a>
                                    <img src={product.images[0]} />
                                 </a></Link>
                              </div>

                              <div className='LI-flex3'>
                                 <Link href={`/product/${product._id}`}><a className='LI-link'>
                                    <div>{product.name}</div>
                                    {product.subtitle && <div style={{ fontSize: '11pt', marginTop: '.25rem' }}>{product.subtitle}</div>}
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
                                 <div>CAD ${product.price.toFixed(2)}</div>
                              </div>
                           </ListItem>
                        )
                     })
               }
            </div>

            <div className={styles.listFooter}>
               <div>There are {listToRender.length} products</div>
               <ListPagination
                  boxContainer={container}
                  listToRender={listToRender}
                  pagination={pagination}
                  listPageMax={listPageMax}
                  increasePage={increasePage}
                  decreasePage={decreasePage}
                  toFirstPage={toFirstPage}
                  toLastPage={toLastPage}
                  doesScroll
               />
            </div>
         </Box>
      </div>
   )
}

export default withListState<ListWithState, Product>(ProductsOverview);