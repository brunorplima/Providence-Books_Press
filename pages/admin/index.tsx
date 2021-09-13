import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AdminArticles from '../../app/components/modules/admin-user/AdminArticles';
import AdminContent from '../../app/components/modules/admin-user/AdminContent';
import AdminDashboard from '../../app/components/modules/admin-user/AdminDashboard';
import AdminProducts from '../../app/components/modules/admin-user/AdminProducts';
import AdminSettings from '../../app/components/modules/admin-user/AdminSettings';
import Section from '../../app/components/modules/admin-user/Section';
import Sidebar from '../../app/components/modules/admin-user/Sidebar';
import { Article, Order, SectionType } from '../../app/interfaces-objects/interfaces';
import Product from '../../app/interfaces-objects/Product';
import styles from '../../app/styles/admin-user/Admin.module.css';
import { useAuth } from '../../app/components/contexts/AuthProvider';
import { RiArticleLine, RiCurrencyLine, RiDashboardLine, RiSettings3Line } from 'react-icons/ri';
import { GiBlackBook } from 'react-icons/gi';
import { FiUsers } from 'react-icons/fi';
import { BsLayoutTextWindowReverse } from 'react-icons/bs';
import { redirectUnauthorizedAdmin } from '../../app/util/authRouting';
import AdminOrders from '../../app/components/modules/admin-user/AdminOrders';
import { fetchDocs } from '../../app/firebase/fetch';

const sections: SectionType[] = [
   {
      name: 'Dashboard',
      Icon: RiDashboardLine
   },
   {
      name: 'Products',
      Icon: GiBlackBook
   },
   {
      name: 'Articles',
      Icon: RiArticleLine
   },
   {
      name: 'Users',
      Icon: FiUsers
   },
   {
      name: 'Orders',
      Icon: RiCurrencyLine
   },
   {
      name: 'Content',
      Icon: BsLayoutTextWindowReverse
   },
   {
      name: 'Settings',
      Icon: RiSettings3Line
   }
];

interface Props {
   readonly products: Product[];
   readonly articles: Article[];
}

const AdminPage: React.FC<Props> = ({ products, articles }) => {
   const [currentSection, setCurrentSection] = useState<string>(sections[0].name)
   const { firebaseUser, providenceUser } = useAuth()

   function setSection(index: number) {
      if (currentSection !== sections[index].name) {
         setCurrentSection(sections[index].name);
      }
   }

   if (redirectUnauthorizedAdmin(firebaseUser)) return null
   return (
      <>
         {
            providenceUser?.role === 'admin' || providenceUser?.role === 'master admin' &&
            <div className={styles.container}>
               <Sidebar
                  sections={sections}
                  currentSection={currentSection}
                  setCurrentSection={setSection}
               />

               {
                  currentSection === sections[0].name &&
                  <Section title={currentSection}>
                     <AdminDashboard admin={providenceUser} />
                  </Section>
               }

               {
                  currentSection === sections[1].name &&
                  <Section title={currentSection} tabs>
                     <AdminProducts
                        list={products}
                        tabs={['Overview', 'Add', 'Update']}
                     />
                  </Section>
               }

               {
                  currentSection === sections[2].name &&
                  <Section title={currentSection} tabs>
                     <AdminArticles
                        list={articles}
                        tabs={['Overview', 'Add', 'Update']}
                     />
                  </Section>
               }

               {
                  currentSection === sections[3].name &&
                  <Section title={currentSection}>

                  </Section>
               }

               {
                  currentSection === sections[4].name &&
                  <Section title={currentSection} tabs>
                     <AdminOrders
                        tabs={['Overview', 'Create Billing', 'Update Billing']}
                     />
                  </Section>
               }

               {
                  currentSection === sections[5].name &&
                  <Section title={currentSection}>
                     <AdminContent />
                  </Section>
               }

               {
                  currentSection === sections[6].name &&
                  <Section title={currentSection}>
                     <AdminSettings />
                  </Section>
               }
            </div>
         }
      </>
   )
}

const mapStateToProps = ({ products, articles }) => ({ products, articles })

export default connect(mapStateToProps)(AdminPage);
