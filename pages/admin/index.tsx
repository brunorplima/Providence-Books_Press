import React, { Component } from 'react';
import AdminDashboard from '../../app/components/modules/admin-user/AdminDashboard';
import AdminProducts from '../../app/components/modules/admin-user/AdminProducts';
import Section from '../../app/components/modules/admin-user/Section';
import Sidebar from '../../app/components/modules/admin-user/Sidebar';
import { firestore } from '../../app/firebase/firebase';
import Product from '../../app/interfaces-objects/Product';
import styles from '../../app/styles/admin-user/Admin.module.css';

const sections = ['Dashboard', 'Products', 'Articles', 'Users', 'Orders', 'Content', 'Data', 'Settings'];

interface State {
   readonly currentSection: string;
   readonly products: Product[];
}

export class AdminPage extends Component<{}, State> {

   productsUnsubscriber: () => void;

   constructor(props) {
      super(props);
      this.state = {
         currentSection: sections[0],
         products: []
      }

      this.setCurrentSection = this.setCurrentSection.bind(this);
      this.setProducts = this.setProducts.bind(this);
   }

   componentDidMount() {
      this.listenForProducts();
   }

   componentWillUnmount() {
      this.productsUnsubscriber();
   }

   setCurrentSection(index: number) {
      const { currentSection } = this.state;
      if (currentSection !== sections[index]) {
         this.setState({ currentSection: sections[index] });
      }
   }

   setProducts(products: Product[]) {
      if (JSON.stringify(this.state.products) !== JSON.stringify(products)) {
         this.setState({ products });
      }
   }

   listenForProducts() {
      this.productsUnsubscriber = firestore.collection('products').orderBy('name').onSnapshot(snapshot => {
         const prods: Product[] = [];
         snapshot.forEach(doc => {
            prods.push(doc.data() as Product);
         })
         this.setProducts(prods);
      }, error => {
         window.alert(`A ${error.name} error occurred: ${error.message}`)
      })
   }

   render() {
      const { currentSection, products } = this.state;
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
                  
               </Section>
            }

            {
               currentSection === sections[6] &&
               <Section title={currentSection}>
                  
               </Section>
            }

            {
               currentSection === sections[7] &&
               <Section title={currentSection}>
                  
               </Section>
            }
         </div>
      )
   }
}

export default AdminPage;
