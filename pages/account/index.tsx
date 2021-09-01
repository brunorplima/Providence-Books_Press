import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { RiDashboardLine, RiDatabase2Line } from 'react-icons/ri'
import { useAuth } from '../../app/components/contexts/AuthProvider'
import Section from '../../app/components/modules/admin-user/Section'
import Sidebar from '../../app/components/modules/admin-user/Sidebar'
import UserDashboard from '../../app/components/modules/admin-user/UserDashboard'
import { auth } from '../../app/firebase/firebase'
import { SectionType } from '../../app/interfaces-objects/interfaces'
import styles from '../../app/styles/admin-user/Admin.module.css'
import { redirectUnauthorizedUser } from '../../app/util/authRouting'

const sections: SectionType[] = [
   {
      name: 'Dashboard',
      Icon: RiDashboardLine
   },
   {
      name: 'Account Data',
      Icon: RiDatabase2Line
   }
]

const Account = () => {
   const { firebaseUser, providenceUser } = useAuth()
   const [currentSection, setCurrentSection] = useState<string>(sections[0].name)

   if (redirectUnauthorizedUser(firebaseUser)) return null

   function setSection(index: number) {
      setCurrentSection(sections[index].name)
   }

   return (
      <>
         {
            firebaseUser &&
            <div className={styles.container}>
               <Sidebar
                  sections={sections}
                  currentSection={currentSection}
                  setCurrentSection={setSection}
               />

               {
                  currentSection === sections[0].name &&
                  <Section title={currentSection}>
                     <UserDashboard user={providenceUser}/>
                  </Section>
               }

               {
                  currentSection === sections[1].name &&
                  <Section title={currentSection}>
                     
                  </Section>
               }
            </div>
         }
      </>
   )
}

export default Account
