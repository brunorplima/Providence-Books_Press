import React, { createRef } from 'react';
import { Article } from '../../../interfaces-objects/interfaces';
import Box from './Box';
import withListState, { ListWithState } from './withListState';
import styles from '../../../styles/admin-user/BoxContent.module.css';
import ListSearch from './ListSearch';
import ListPagination from './ListPagination';
import splitListInPages from '../../../util/splitListInPages';
import ListItem from './ListItem';
import Link from 'next/link';
import { shortMonths } from '../../../util/months';

const ArticlesOverview: React.FC<ListWithState> = ({
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

   let listToRender: Article[] = list;
   if (search) {
      const regexp = new RegExp(search, 'i');
      listToRender = listToRender.filter(item => item.title.match(regexp) || item.subtitle?.match(regexp));
   }

   return (
      <div ref={container}>
         <Box title='ARTICLES' paddingVertical>
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
                  splitListInPages<Article>(listToRender, pagination, listPageMax)
                     .map((article, idx) => {
                        const datePosted = new Date(article.datePosted);
                        return (
                           <ListItem 
                              key={article._id}
                              itemId={article._id}
                              firestorePath='articles'
                              itemType='article'
                              isFirstItem={!idx}
                           >
                              <div className='LI-id'>
                                 {article._id}
                              </div>

                              <div className='LI-image'>
                                 <Link href={`/articles/${article._id}`}><a>
                                    <img src={article.image} />
                                 </a></Link>
                              </div>

                              <div className='LI-flex3'>
                                 <Link href={`/articles/${article._id}`}><a className='LI-link'>
                                    <div className={styles.productName}>{article.title}</div>
                                    {article.subtitle && <div style={{ fontSize: '11pt', marginTop: '.25rem' }}>{article.subtitle}</div>}
                                 </a></Link>
                              </div>

                              <div className='LI-flex2'>
                                 <div>{article.author.credential} {article.author.name}</div>
                                 <div>{article.category}</div>
                                 <div>Posted on {shortMonths[datePosted.getMonth()]} {datePosted.getDate()}, {datePosted.getFullYear()}</div>
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

export default withListState<ListWithState, Article>(ArticlesOverview);
