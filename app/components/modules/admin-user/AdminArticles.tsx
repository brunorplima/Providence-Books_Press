import React, { useEffect, useState } from 'react';
import { Article } from '../../../interfaces-objects/interfaces';
import Loading from '../loading/Loading';
import Tabs from './Tabs';
import withTabState from './withTabState';
import ArticlesOverview from './ArticlesOverview';

interface Props {
   readonly list: Article[];
   readonly tabs: string[];
   readonly currentTab?: string;
   readonly setCurrentTab?: (tab: string) => void;
}

const AdminArticles: React.FC<Props> = ({ list, tabs, currentTab, setCurrentTab }) => {
   const [articleSelected, setArticleSelected] = useState<Article>(null)

   useEffect(() => {
      setCurrentTab(tabs[0])
   }, []);

   useEffect(() => {
      if (articleSelected) setCurrentTab(tabs[2])
   }, [articleSelected])

   return (
      <>
         <Tabs
            tabs={tabs}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
         />

         {
            currentTab === tabs[0] ?
               list.length ?
                  <ArticlesOverview
                     setItemToUpdate={setArticleSelected}
                     list={list}
                  />
                  : <Loading />
               : null
         }
      </>
   )
}

export default withTabState<Props>(AdminArticles);
