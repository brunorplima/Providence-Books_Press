import { NextRouter, useRouter } from 'next/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Unsubscribe } from 'redux';
import createSearchAction from '../../../redux/actions/searchAction';
import { ReduxState } from '../../../redux/reducers/rootReducer';
import { store } from '../../../redux/store/store';
import useScreenWidth from '../../../util/useScreenWidth';
import useScrollPosition from '../../../util/useScrollPosition';
import Navbar from './Navbar';

interface WrapperProps {
   readonly totalBookshelfItems: number;
}

const NavbarContainer: React.FC<WrapperProps> = ({ totalBookshelfItems }) => {
   const scrollPosition = useScrollPosition();
   const screenWidth = useScreenWidth();
   const router = useRouter();

   return (
      <NavbarWrapper
         scrollPosition={specialNavbarPathnames.includes(router.pathname) ? scrollPosition : null}
         screenWidth={screenWidth}
         router={router}
         totalBookshelfItems={totalBookshelfItems}
      />
   )
}

const specialNavbarPathnames = [
   '/',
   '/about-us',
   '/articles/[_id]'
]

interface Props {
   readonly scrollPosition?: number;
   readonly screenWidth: number;
   readonly router: NextRouter;
   readonly totalBookshelfItems: number;
}

export type MenuHidden = {
   isIt: boolean;
   useAnimation: boolean;
}

interface State {
   readonly searchField: string;
   readonly menuHidden: MenuHidden | null;
}

class NavbarWrapper extends Component<Props, State> {

   unsubscriber: Unsubscribe;

   constructor(props) {
      super(props);
      this.state = {
         searchField: '',
         menuHidden: null
      }

      this.setSearch = this.setSearch.bind(this);
      this.setMenuHidden = this.setMenuHidden.bind(this);
      this.search = this.search.bind(this);
   }

   componentDidMount() {
      const { screenWidth } = this.props;
      if (screenWidth <= 900) {
         this.setState({
            menuHidden: {
               isIt: true,
               useAnimation: false
            }
         });
      }
   }

   componentDidUpdate() {
      const { screenWidth } = this.props;
      if (screenWidth > 900 && this.state.menuHidden !== null) {
         this.setState({ menuHidden: null });
      } else if (screenWidth <= 900 && this.state.menuHidden === null) {
         this.setState({
            menuHidden: {
               isIt: true,
               useAnimation: false
            }
         });
      }
   }


   setSearch(e: React.ChangeEvent<HTMLInputElement>) {
      e.preventDefault();
      this.setState({
         searchField: e.target.value
      })
   }

   setMenuHidden() {
      this.setState({
         menuHidden: {
            isIt: !this.state.menuHidden.isIt,
            useAnimation: true
         }
      });
   }

   search(value: string) {
      store.dispatch(createSearchAction(value));
   }

   isPrimaryNavbar() {
      const { scrollPosition, router } = this.props;
      const isNotInPathnames = !specialNavbarPathnames.includes(router.pathname);
      const isScrolled = scrollPosition >= 440;
      return isNotInPathnames || isScrolled;
   }

   isSecondaryStyleOwnPage() {
      const { router } = this.props;
      return !specialNavbarPathnames.includes(router.pathname);
   }

   render() {
      return (
         <Navbar
            searchField={this.state.searchField}
            setSearch={this.setSearch}
            search={this.search}
            primary={this.isPrimaryNavbar()}
            secondaryStyleOwnPage={this.isSecondaryStyleOwnPage()}
            menuHidden={this.state.menuHidden}
            setMenuHidden={this.setMenuHidden}
            totalBookshelfItems={this.props.totalBookshelfItems}
         />
      )
   }
}

const mapStateToProps = (state: ReduxState) => {
   const totalBookshelfItems = state.bookshelf.reduce((acc, current) => acc + current.quantity, 0)
   return {
      totalBookshelfItems
   }
}

export default connect(mapStateToProps)(NavbarContainer);
