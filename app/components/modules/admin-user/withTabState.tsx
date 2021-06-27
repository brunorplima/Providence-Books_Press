import React from 'react';

interface State {
   readonly currentTab: string;
}

const withTabState = <P extends {}>(
   Component: React.ComponentType<P>
) => class WithTabState extends React.Component<P, State> {

   constructor(props) {
      super(props);
      this.state = {
         currentTab: ''
      }

      this.setCurrentTab = this.setCurrentTab.bind(this);
   }

   setCurrentTab (tab: string) {
      const { currentTab } = this.state;
      if (currentTab !== tab) {
         this.setState({ currentTab: tab });
      }
   }

   render() {
      return (
         <Component
            {...this.props}
            currentTab={this.state.currentTab}
            setCurrentTab={this.setCurrentTab}
         />
      )
   }
}

export default withTabState;
