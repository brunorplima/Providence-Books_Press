import React from 'react'
import { Article } from '../../../interfaces-objects/interfaces'
import styles from '../../../styles/articles/ArticlesList.module.css'
import getPaginationOptions from '../../../util/paginationService'
import ArticleCard from '../../elements/article-card/ArticleCard'
import Pagination from '../../elements/pagination/Pagination'
import useScreenWidth, { numberItemsArticlesList } from '../../../util/useScreenWidth'
import ArticleCardRow from './ArticleCardRow'
import articles from '../../../../pages/api/articles'

interface WarpperProps {
   readonly articles: Article[],
   readonly category: string,
   readonly showFirst: boolean
}

const ArticlesListWrapper: React.FC<WarpperProps> = ({ articles, category, showFirst }) => {
   const screenWidth = useScreenWidth();

   return (
      <ArticlesList
         articles={articles}
         category={category}
         showFirst={showFirst}
         itemsNumber={numberItemsArticlesList(screenWidth)}
      />
   )
}


interface Props {
   readonly articles: Article[],
   readonly category: string,
   readonly showFirst: boolean,
   readonly itemsNumber: number,
}

interface State {
   pagination: number,
}

class ArticlesList extends React.Component<Props, State> {
   isMounted = false;

   constructor(props) {
      super(props);

      this.state = {
         pagination: 1,

      }

      this.setPagination = this.setPagination.bind(this);
   }

   componentDidMount() {
      this.isMounted = true;
   }

   componentDidUpdate() {
      if (this.state.pagination > this.getMaxPageNumber() && this.isMounted)
         this.setState({ pagination: this.getMaxPageNumber() })
   }

   componentWillUnmount() {
      this.isMounted = false
   }

   setPagination(pageNumber: number): void {
      if (this.state.pagination !== pageNumber)
         this.setState({ pagination: pageNumber });
   }



   getPaginatedArticles(): Article[] {
      const { articles, itemsNumber, showFirst } = this.props;
      const { pagination } = this.state;
      const start = pagination * itemsNumber - itemsNumber;
      const end = pagination * itemsNumber < articles.length ? start + itemsNumber : start + (articles.length - start)
      let slice;
      if (showFirst)
         slice = articles.slice(start, end);
      else
         slice = articles.filter((a, i) => i !== 0).slice(start, end);
      return slice;
   }

   getMaxPageNumber() {
      const max = Math.ceil(this.props.articles.length / this.props.itemsNumber)
      return max;
   }

   render() {
      const { category } = this.props;

      

      return (
         <div className={styles.container}>
            <h3>{category}</h3>

            <div className={styles.list}>
               <ArticleCardRow
                  articles={this.getPaginatedArticles()}
               />
            </div>

            <div className={styles.pagination}>
               <Pagination
                  pagination={this.state.pagination}
                  options={getPaginationOptions(this.state.pagination, this.getMaxPageNumber())}
                  setPagination={this.setPagination}
                  noScroll
               />
            </div>
         </div>
      )
   }
}

export default ArticlesListWrapper
