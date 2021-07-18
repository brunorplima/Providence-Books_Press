import React, { Component } from 'react';
import AdminArticles from '../../app/components/modules/admin-user/AdminArticles';
import AdminContent from '../../app/components/modules/admin-user/AdminContent';
import AdminDashboard from '../../app/components/modules/admin-user/AdminDashboard';
import AdminProducts from '../../app/components/modules/admin-user/AdminProducts';
import AdminSettings from '../../app/components/modules/admin-user/AdminSettings';
import Section from '../../app/components/modules/admin-user/Section';
import Sidebar from '../../app/components/modules/admin-user/Sidebar';
import { firestore } from '../../app/firebase/firebase';
import { Article } from '../../app/interfaces-objects/interfaces';
import Product from '../../app/interfaces-objects/Product';
import styles from '../../app/styles/admin-user/Admin.module.css';

const sections = ['Dashboard', 'Products', 'Articles', 'Users', 'Orders', 'Content', 'Data', 'Settings'];

interface State {
   readonly currentSection: string;
   readonly products: Product[];
   readonly articles: Article[];
}

export class AdminPage extends Component<{}, State> {

   productsUnsubscriber = () => {};
   articlesUnsubscriber = () => {};

   constructor(props) {
      super(props);
      this.state = {
         currentSection: sections[0],
         products: [],
         articles: [],
      }

      this.setCurrentSection = this.setCurrentSection.bind(this);
      this.setProducts = this.setProducts.bind(this);
   }

   componentDidUpdate() {
      const { currentSection, products, articles } = this.state;
      if (currentSection === sections[1] && !products.length) this.fetchProducts();
      if (currentSection === sections[2] && !articles.length) this.fetchArticles();
   }

   componentWillUnmount() {
      this.productsUnsubscriber();
      this.articlesUnsubscriber();
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

   setArticles(articles: Article[]) {
      if (JSON.stringify(articles) !== JSON.stringify(this.state.articles)) {
         this.setState({ articles });
      }
   }

   async fetchProducts() {
      const fetchProducts = await fetch('/api/products');
      const products: Product[] = await fetchProducts.json();
      this.setState({ products });
   }

   async fetchArticles() {
      const fetched = await fetch('/api/articles');
      const articles: Article[] = await fetched.json();
      this.setState({ articles });
   }

   render() {
      const { currentSection, products, articles } = this.state;
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

               </Section>
            }

            {
               currentSection === sections[7] &&
               <Section title={currentSection}>
                  <AdminSettings />
               </Section>
            }
         </div>
      )
   }
}

export default AdminPage;
