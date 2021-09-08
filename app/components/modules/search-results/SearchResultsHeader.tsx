import React from 'react';
import { connect } from 'react-redux';
import styles from '../../../styles/search-results/SearchResultsHeader.module.css';
import { BiSearchAlt } from 'react-icons/bi';

export type ResultSelector = {
   readonly name: string;
   readonly amount: number;
}

interface Props {
   readonly view: string;
   readonly setView: (view: string) => void;
   readonly resultSelectors: ResultSelector[];
   readonly search?: string;
}

const SearchResultsHeader: React.FC<Props> = ({ view, resultSelectors, search, setView }) => {
   return (
      <div className={styles.container}>
         <div className={styles.search}>
            <div><BiSearchAlt/></div>
            {/* <div>{resultSelectors[0].amount} results found for <strong>"{search}"</strong></div> */}
            <div>{resultSelectors.reduce((a, b) => a + b.amount, 0)} results found for <strong>"{search}"</strong></div>
         </div>

         <div className={styles.selectors}>
            {
               resultSelectors.filter(selector => selector.name).map(selector => {
                  const isSelected = selector.name === view;
                  return (
                     <div
                        key={selector.name}
                        className={`${styles.selector} ${isSelected ? styles.selectorInView : ''}`}
                        onClick={() => setView(selector.name)}
                     >
                        <div>{selector.name} ({selector.amount})</div>
                     </div>
                  )
               })
            }
         </div>
      </div>
   )
}

const mapStateToProps = (state) => {
   return {
      search: state.search
   }
}

export default connect(mapStateToProps)(SearchResultsHeader);
