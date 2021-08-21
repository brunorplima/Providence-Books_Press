import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminArticles from '../../app/components/modules/admin-user/AdminArticles';
import AdminContent from '../../app/components/modules/admin-user/AdminContent';
import AdminDashboard from '../../app/components/modules/admin-user/AdminDashboard';
import AdminProducts from '../../app/components/modules/admin-user/AdminProducts';
import AdminSettings from '../../app/components/modules/admin-user/AdminSettings';
import Section from '../../app/components/modules/admin-user/Section';
import Sidebar from '../../app/components/modules/admin-user/Sidebar';
import { Article } from '../../app/interfaces-objects/interfaces';
import Product from '../../app/interfaces-objects/Product';
import styles from '../../app/styles/admin-user/Admin.module.css';

const sections = ['Dashboard', 'Products', 'Articles', 'Users', 'Orders', 'Content', 'Settings'];

interface State {
   readonly currentSection: string;
}

interface Props {
   readonly products: Product[];
   readonly articles: Article[];
}
export class AdminPage extends Component<Props, State> {

   constructor(props) {
      super(props);
      this.state = {
         currentSection: sections[0]
      }

      this.setCurrentSection = this.setCurrentSection.bind(this);
   }

   setCurrentSection(index: number) {
      const { currentSection } = this.state;
      if (currentSection !== sections[index]) {
         this.setState({ currentSection: sections[index] });
      }
   }

   render() {
      const { currentSection } = this.state;
      const { products, articles } = this.props;
      return (
         <div className={styles.container}>
            <Sidebar
               sections={sections}
               currentSection={currentSection}
               setCurrentSection={this.setCurrentSection}
            />

            {
               currentSection === sections[0] &&
               <Section title={currentSection}>
                  <AdminDashboard />
               </Section>
            }

            {
               currentSection === sections[1] &&
               <Section title={currentSection} tabs>
                  <AdminProducts
                     list={products}
                     tabs={['Overview', 'Add', 'Update']}
                  />
               </Section>
            }

            {
               currentSection === sections[2] &&
               <Section title={currentSection} tabs>
                  <AdminArticles
                     list={articles}
                     tabs={['Overview', 'Add', 'Update']}
                  />
               </Section>
            }

            {
               currentSection === sections[3] &&
               <Section title={currentSection}>

               </Section>
            }

            {
               currentSection === sections[4] &&
               <Section title={currentSection}>

               </Section>
            }

            {
               currentSection === sections[5] &&
               <Section title={currentSection}>
                  <AdminContent />
               </Section>
            }

            {
               currentSection === sections[6] &&
               <Section title={currentSection}>
                  <AdminSettings />
               </Section>
            }
         </div>
      )
   }
}

const mapStateToProps = ({ products, articles }) => ({ products, articles })

export default connect(mapStateToProps)(AdminPage);
