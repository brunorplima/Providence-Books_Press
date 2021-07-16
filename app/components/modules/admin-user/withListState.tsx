import React from 'react';

export interface ListWithState {
   readonly setItemToUpdate: Function;
   readonly list: any[];
   readonly processedList?: any[];
   readonly search?: string;
   readonly setSearch?: (search: string) => void;
   readonly pagination?: number;
   readonly listPageMax?: number;
   readonly increasePage?: (highestPage: number) => boolean;
   readonly decreasePage?: () => boolean;
   readonly toFirstPage?: () => boolean;
   readonly toLastPage?: (highestPage: number) => boolean;
}

interface State {
   readonly search: string;
   readonly pagination: number;
   readonly listPageMax: number;
}

interface Props {
   readonly setItemToUpdate: Function;
   readonly list: any[];
}

const withListState = <P extends Props, T>(
   Component: React.ComponentType<P>
) => class WithState extends React.Component<P, State> {

      constructor(props) {
         super(props);

         this.state = {
            search: '',
            pagination: 1,
            listPageMax: 10
         }

         this.setSearch = this.setSearch.bind(this);
         this.increasePage = this.increasePage.bind(this);
         this.decreasePage = this.decreasePage.bind(this);
         this.toFirstPage = this.toFirstPage.bind(this);
         this.toLastPage = this.toLastPage.bind(this);
      }

      setSearch(search: string) {
         if (search !== this.state.search) {
            this.setState({ search, pagination: 1 });
         }
      }

      setListPageMax(listPageMax: number) {
         if (listPageMax !== this.state.listPageMax) {
            this.setState({ listPageMax });
         }
      }

      increasePage(highestPage: number) {
         const { pagination } = this.state;
         if (pagination + 1 <= highestPage) {
            this.setState({ pagination: pagination + 1 });
            return true;
         }
         return false;
      }

      decreasePage() {
         const { pagination } = this.state;
         if (pagination - 1 >= 1) {
            this.setState({ pagination: pagination - 1 });
            return true;
         }
         return false;
      }

      toFirstPage() {
         const { pagination } = this.state;
         if (pagination !== 1) {
            this.setState({ pagination: 1 });
            return true;
         }
         return false;
      }

      toLastPage(highestPage: number) {
         const { pagination } = this.state;
         if (pagination !== highestPage) {
            this.setState({ pagination: highestPage });
            return true;
         }
         return false;
      }

      render() {

         return (
            <Component
               {...this.props}
               {...this.state}
               setSearch={this.setSearch}
               setListPageMax={this.setListPageMax}
               increasePage={this.increasePage}
               decreasePage={this.decreasePage}
               toFirstPage={this.toFirstPage}
               toLastPage={this.toLastPage}
            />
         )
      }
   }

export default withListState;
