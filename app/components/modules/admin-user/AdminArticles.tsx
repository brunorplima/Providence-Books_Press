import React, { useEffect, useState } from 'react';
import { Article } from '../../../interfaces-objects/interfaces';
import Loading from '../loading/Loading';
import Tabs from './Tabs';
import withTabState from './withTabState';
import ArticlesOverview from './ArticlesOverview';
import ArticlesForm from './ArticlesForm';

interface Props {
   readonly list: Article[];
   readonly tabs: string[];
   readonly currentTab?: string;
   readonly setCurrentTab?: (tab: string) => void;
}

const AdminArticles: React.FC<Props> = ({ list, tabs, currentTab, setCurrentTab }) => {
   const [selectedArticle, setSelectedArticle] = useState<Article>(null)

   useEffect(() => {
      setCurrentTab(tabs[0])
   }, []);

   useEffect(() => {
      if (selectedArticle) setCurrentTab(tabs[2])
   }, [selectedArticle])

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
                     setItemToUpdate={setSelectedArticle}
                     list={list}
                  />
                  : <Loading localIsLoading/>
               : null
         }

         {
            currentTab === tabs[1] && <ArticlesForm {...{ currentTab, tabs }} />
         }

         {
            currentTab === tabs[2] &&
            <ArticlesForm
               {...{ currentTab, tabs, setCurrentTab, setSelectedArticle }}
               article={selectedArticle}
            />
         }
      </>
   )
}

export default withTabState<Props>(AdminArticles);
