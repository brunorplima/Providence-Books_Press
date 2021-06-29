import React, { useEffect } from 'react';
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

   useEffect(() => {
      setCurrentTab(tabs[0])
   }, []);

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
                     list={list}
                  />
                  : <Loading />
               : null
         }
      </>
   )
}

export default withTabState<Props>(AdminArticles);
