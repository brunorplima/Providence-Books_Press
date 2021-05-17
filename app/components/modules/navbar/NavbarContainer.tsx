import { NextRouter, useRouter } from 'next/router';
import React, { Component } from 'react';
import useScreenWidth from '../../../util/useScreenWidth';
import useScrollPosition from '../../../util/useScrollPosition';
import Navbar from './Navbar';

const NavbarContainer: React.FC = () => {
   const scrollPosition = useScrollPosition();
   const screenWidth = useScreenWidth();
   const router = useRouter();

   return (
      <NavbarWrapper
         scrollPosition={scrollPosition}
         screenWidth={screenWidth}
         router={router}
      />
   )
}

const specialNavbarPathnames = [
   '/',
   '/about-us',
   '/articles/[_id]'
]

interface Props {
   readonly scrollPosition: number;
   readonly screenWidth: number;
   readonly router: NextRouter;
}

interface State {
   searchField: string;
   isMenuHidden: boolean | null;
}

class NavbarWrapper extends Component<Props, State> {

   constructor(props) {
      super(props);
      this.state = {
         searchField: '',
         isMenuHidden: null
      }

      this.setSearch = this.setSearch.bind(this);
      this.setIsMenuHidden = this.setIsMenuHidden.bind(this);
      this.search = this.search.bind(this);
   }

   componentDidMount() {
      const { screenWidth } = this.props;
      if (screenWidth <= 900) {
         this.setState({ isMenuHidden: true });
      }
   }

   componentDidUpdate() {
      const { screenWidth } = this.props;
      if (screenWidth > 900 && this.state.isMenuHidden !== null) {
         this.setState({ isMenuHidden: null });
      } else if (screenWidth <= 900 && this.state.isMenuHidden === null) {
         this.setState({ isMenuHidden: true });
      }
   }

   setSearch(e: React.ChangeEvent<HTMLInputElement>) {
      e.preventDefault();
      this.setState({
         searchField: e.target.value
      })
   }

   setIsMenuHidden() {
      this.setState({ isMenuHidden: !this.state.isMenuHidden });
   }

   search(value: string) {
      // Not yet implemented!!!
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
            isMenuHidden={this.state.isMenuHidden}
            setIsMenuHidden={this.setIsMenuHidden}
         />
      )
   }
}

export default NavbarContainer;
