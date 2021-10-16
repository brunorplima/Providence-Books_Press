import React, { useEffect, useState } from 'react'
import { User } from '../../../interfaces-objects/interfaces'
import formStyles from '../../../styles/admin-user/OrdersForm.module.css'
import Box from './Box'
import styles from '../../../styles/admin-user/UserInformation.module.css'
import sharedStyles from '../../../styles/admin-user/shared.module.css'
import NameInitials from '../../elements/name-initials/NameInitials'
import { RiImageAddFill, RiSave3Fill, RiDeleteBin6Line } from 'react-icons/ri'
import Button from '../../elements/button/Button'
import { MdClose } from 'react-icons/md'
import { deleteAll, putInStorage } from '../../../firebase/storage'
import { useAuth } from '../../contexts/AuthProvider'
import { updateUser } from '../../../firebase/update'
import Loading from '../loading/Loading'

interface Props {
   readonly currentUser: User
   readonly setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const UserInformation: React.FC<Props> = ({ currentUser, setIsEdit }) => {
   const [img, setImg] = useState<FileList>(null)
   const [fileName, setFileName] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState<string>(null)
   const { providenceUser } = useAuth()

   useEffect(() => {
      if (img) setFileName(img.item(0).name.substr(0, 8) + '...')
      else setFileName('')
   }, [img, fileName])

   if (!currentUser) return null

   function getFullName() {
      return `${currentUser.firstName} ${currentUser.lastName}`
   }

   async function saveImage() {
      const file = img.item(0)
      const partialPath = `users/${providenceUser._id}`, fullPath = partialPath + '/' + file.name
      try {
         setIsLoading(true)
         await deleteAll(partialPath)
         const imageStorageData = await putInStorage(fullPath, file)
         const doc = await updateUser(providenceUser._id, { photoURL: imageStorageData.url })
         if (doc) setImg(null)
         setIsLoading(false)
      }
      catch (error) {
         console.error(error)
         setError(error.message)
      }
   }

   async function deleteImage() {
      try {
         setIsLoading(true)
         await deleteAll(`users/${providenceUser._id}`)
         const docRef = await updateUser(providenceUser._id, { photoURL: '' })
         setIsLoading(false)
      }
      catch (error) {
         console.error(error)
         setError(error.message)
      }
   }

   const getInfo = value => value ? value : '--'

   return (
      <Box title='YOUR PERSONAL INFORMATION' paddingVertical>
         <div>
            <div className={formStyles.form}>
               {
                  error &&
                  <div>
                     {error}
                  </div>
               }

               <div className={styles.mainUserInfo}>
                  <div className={styles.muiPhoto}>
                     <div>
                        {
                           currentUser.photoURL ?
                              <img src={currentUser.photoURL} alt={getFullName()} /> :
                              <NameInitials name={getFullName()} size={70} fontSize='24pt' />
                        }
                     </div>
                  </div>

                  <div className={styles.muiName}>
                     <h4>{getFullName()}</h4>
                  </div>
               </div>


               <div className={styles.photoInput}>
                  {
                     !isLoading &&
                     <label className={styles.fileInput}>
                        <input type="file" onChange={e => { setImg(null); setImg(e.target.files) }} accept="image/png, image/gif, image/jpeg" />
                        <div><RiImageAddFill size={20} /></div>
                        {!fileName && <div>{currentUser.photoURL ? 'Change' : 'Add'} Photo</div>}
                        {fileName && <div>{fileName}</div>}
                     </label>
                  }

                  {
                     !img && !isLoading && currentUser.photoURL &&
                     <div
                        className={styles.fileInput}
                        onClick={deleteImage}
                     >
                        <div><RiDeleteBin6Line fontSize={20} /></div>
                        <div>Delete Photo</div>
                     </div>
                  }

                  {
                     img && !isLoading &&
                     <>
                        <div
                           className={styles.fileInput}
                           onClick={saveImage}
                        >
                           <RiSave3Fill fontSize={20} />
                        </div>

                        <div
                           className={styles.fileInput}
                           onClick={() => {
                              setImg(null)
                              setFileName('')
                           }}
                        >
                           <MdClose fontSize={20} />
                        </div>
                     </>
                  }

                  {
                     isLoading && <Loading size={3} localIsLoading />
                  }
               </div>

               <div className={formStyles.inputs}>
                  <div className={formStyles.leftSide}>
                     <div className={formStyles.formController}>
                        <div className={formStyles.inputField}>
                           <label className={styles.label}>Email</label>
                           <div>{getInfo(currentUser?.email)}</div>
                        </div>
                     </div>

                     <br />

                     <div className={formStyles.formController}>
                        <div className={formStyles.inputField}>
                           <label className={styles.label}>Main Phone #</label>
                           <div>{getInfo(currentUser?.primaryContactNumber)}</div>
                        </div>
                     </div>

                     {
                        currentUser.secondaryContactNumber &&
                        <>
                           <br />

                           <div className={formStyles.formController}>
                              <div className={formStyles.inputField}>
                                 <label className={styles.label}>Secondary Phone #</label>
                                 <div>{currentUser.secondaryContactNumber}</div>
                              </div>
                           </div>
                        </>
                     }

                     {
                        currentUser.gender &&
                        <>
                           <br />

                           <div className={formStyles.formController}>
                              <div className={formStyles.inputField}>
                                 <label className={styles.label}>Sex</label>
                                 <div>{currentUser.gender}</div>
                              </div>
                           </div>
                        </>
                     }

                     <br />

                     <div className={formStyles.formController}>
                        <div className={formStyles.inputField}>
                           <label className={styles.label}>Date of Birth</label>
                           <div>{getInfo(currentUser?.dateOfBirth)}</div>
                        </div>
                     </div>
                  </div>

                  <div className={formStyles.rightSide}>
                     <div className={formStyles.formController}>
                        <div className={formStyles.inputField}>
                           <label className={styles.label}>Street Address</label>
                           <div>{getInfo(currentUser?.address.main)}</div>
                        </div>
                     </div>

                     {
                        currentUser?.address.secondary &&
                        <>
                           <br />

                           <div className={formStyles.formController}>
                              <div className={formStyles.inputField}>
                                 <label className={styles.label}>Address Complement</label>
                                 <div>{currentUser?.address.secondary}</div>
                              </div>
                           </div>
                        </>
                     }

                     <br />

                     <div className={formStyles.formController}>
                        <div className={formStyles.inputField}>
                           <label className={styles.label}>City</label>
                           <div>{getInfo(currentUser?.address.city)}</div>
                        </div>
                     </div>

                     <br />

                     <div className={formStyles.formController}>
                        <div className={formStyles.inputField}>
                           <label className={styles.label}>Province / State</label>
                           <div>{getInfo(currentUser?.address.stateProvince)}</div>
                        </div>
                     </div>

                     <br />

                     <div className={formStyles.formController}>
                        <div className={formStyles.inputField}>
                           <label className={styles.label}>Country</label>
                           <div>{getInfo(currentUser?.address.country)}</div>
                        </div>
                     </div>

                     <br />

                     <div className={formStyles.formController}>
                        <div className={formStyles.inputField}>
                           <label className={styles.label}>Zip Code</label>
                           <div>{getInfo(currentUser?.address.zipCode)}</div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className={styles.editButton}>
                  <div 
                     className={sharedStyles.yellowButton}
                     onClick={() => setIsEdit(true)}
                  >
                     EDIT
                  </div>
               </div>
            </div>
         </div>
      </Box>
   )
}

export default UserInformation
