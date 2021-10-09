import clsx from 'clsx'
import React, { useState, useEffect } from 'react'
import { MdFavoriteBorder } from 'react-icons/md'
import { RiDashboardLine, RiFileUserLine, RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri'
import { useAuth } from '../../app/components/contexts/AuthProvider'
import Section from '../../app/components/modules/admin-user/Section'
import Sidebar from '../../app/components/modules/admin-user/Sidebar'
import UserDashboard from '../../app/components/modules/admin-user/UserDashboard'
import UserInformation from '../../app/components/modules/admin-user/UserInformation'
import { firestore } from '../../app/firebase/firebase'
import { SectionType, User } from '../../app/interfaces-objects/interfaces'
import styles from '../../app/styles/admin-user/Account.module.css'
import { redirectUnauthorizedUser } from '../../app/util/authRouting'
import useScreenWidth from '../../app/util/useScreenWidth'

const sections: SectionType[] = [
   {
      name: 'Dashboard',
      Icon: RiDashboardLine
   },
   // {
   //    name: 'Wish List',
   //    Icon: MdFavoriteBorder
   // },
   // {
   //    name: 'Favourite Articles',
   //    Icon: MdFavoriteBorder
   // },
   {
      name: 'User Information',
      Icon: RiFileUserLine
   }
]

const Account = () => {
   const [currentSection, setCurrentSection] = useState<string>(sections[0].name)
   const [currentUser, setCurrentUser] = useState<User>(null)
   const [isMenuHidden, setIsMenuHidden] = useState(true)
   const { firebaseUser, providenceUser } = useAuth()
   const screenWidth = useScreenWidth()

   useEffect(() => {
      const unsubscribe = firestore.doc(`users/${providenceUser._id}`).onSnapshot(snapshot => {
         setCurrentUser(snapshot.data() as User)
      })
      return unsubscribe
   }, [])

   useEffect(() => {
      if (!isMenuHidden) setIsMenuHidden(true)
   }, [currentSection])

   if (redirectUnauthorizedUser(firebaseUser)) return null

   function setSection(index: number) {
      setCurrentSection(sections[index].name)
   }

   return (
      <>
         {
            firebaseUser &&
            <div className={styles.container}>
               {
                  screenWidth < 900 &&
                  <>
                     <div
                        id={styles.sidebarOpen}
                        className={styles.sidebarIcon}
                        onClick={() => setIsMenuHidden(false)}
                     >
                        <RiMenuUnfoldLine />
                     </div>

                     <div className={clsx(styles.sidebar, isMenuHidden ? styles.hidSidebar : styles.shownSidebar)}>
                        <div
                           id={styles.sidebarClose}
                           className={styles.sidebarIcon}
                           onClick={() => setIsMenuHidden(true)}
                        >
                           <RiMenuFoldLine />
                        </div>

                        <Sidebar
                           sections={sections}
                           currentSection={currentSection}
                           setCurrentSection={setSection}
                        />
                     </div>

                     <div
                        className={clsx(styles.menuBackground, isMenuHidden ? styles.fadeOut : styles.fadiIn)}
                        onClick={() => setIsMenuHidden(true)}
                     ></div>
                  </>
               }

               {
                  screenWidth >= 900 &&
                  <Sidebar
                     sections={sections}
                     currentSection={currentSection}
                     setCurrentSection={setSection}
                  />
               }

               {
                  currentSection === sections[0].name &&
                  <Section title={currentSection}>
                     <UserDashboard user={providenceUser} />
                  </Section>
               }

               {/* {
                  currentSection === sections[1].name &&
                  <Section title={currentSection}>

                  </Section>
               }

               {
                  currentSection === sections[2].name &&
                  <Section title={currentSection}>

                  </Section>
               } */}

               {
                  currentSection === sections[1].name &&
                  <Section title={currentSection}>
                     <UserInformation {...{ currentUser }} />
                  </Section>
               }
            </div>
         }
      </>
   )
}

export default Account
