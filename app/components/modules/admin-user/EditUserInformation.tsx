import { Formik, FormikErrors, FormikProps, FormikTouched, useFormikContext } from 'formik'
import React, { CSSProperties, useState } from 'react'
import Box from './Box'
import styles from '../../../styles/admin-user/OrdersForm.module.css'
import sharedStyles from '../../../styles/admin-user/shared.module.css'
import { canadianProvinces, countryList, usaStates } from '../../../util/addressHelper'
import * as Yup from 'yup'
import { updateUser } from '../../../firebase/update'
import { User, Address, Gender } from '../../../interfaces-objects/interfaces'
import Loading from '../loading/Loading'
import * as R from 'ramda'

interface FormikData {
   readonly firstName: string
   readonly lastName: string
   readonly email: string
   readonly primaryContactNumber: string
   readonly secondaryContactNumber: string
   readonly mainAddress: string
   readonly secondaryAddress: string
   readonly city: string
   readonly stateProvince: string
   readonly country: string
   readonly zipCode: string
   readonly gender: string
   readonly dateOfBirth: string | Date
}

interface Props {
   readonly currentUser: User
   readonly setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const UserInformation: React.FC<Props> = ({ currentUser, setIsEdit }) => {
   const [isLoading, setIsLoading] = useState(false)

   const getFormattedDate = (date: Date) => {
      const month = date.getMonth() <= 8 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      const formatted = `${date.getFullYear()}-${month}-${date.getDate()}`
      return formatted
   }

   const initialValues: FormikData = {
      firstName: currentUser.firstName ? currentUser.firstName : '',
      lastName: currentUser.lastName ? currentUser.lastName : '',
      email: currentUser.email ? currentUser.email : '',
      primaryContactNumber: currentUser.primaryContactNumber ? currentUser.primaryContactNumber : '',
      secondaryContactNumber: currentUser.secondaryContactNumber ? currentUser.secondaryContactNumber : '',
      mainAddress: currentUser.address?.main ? currentUser.address.main : '',
      secondaryAddress: currentUser.address?.secondary ? currentUser.address.secondary : '',
      city: currentUser.address?.city ? currentUser.address.city : '',
      stateProvince: currentUser.address?.stateProvince ? currentUser.address.stateProvince : '',
      country: currentUser.address?.country ? currentUser.address.country : '',
      zipCode: currentUser.address?.zipCode ? currentUser.address.zipCode : '',
      gender: currentUser.gender ? currentUser.gender : '',
      dateOfBirth: currentUser.dateOfBirth ? getFormattedDate(currentUser.dateOfBirth as Date) : ''
   }

   const validationSchema = Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email().required('required'),
      primaryContactNumber: Yup.string().nullable(),
      secondaryContactNumber: Yup.string().nullable(),
      mainAddress: Yup.string().nullable(),
      secondaryAddress: Yup.string().nullable(),
      city: Yup.string().nullable(),
      stateProvince: Yup.string().nullable(),
      country: Yup.string().nullable(),
      zipCode: Yup.string().nullable(),
      gender: Yup.string().oneOf(['Male', 'Female'], 'Sex must be either male or female').nullable(),
      dateOfBirth: Yup.date().nullable(),
      photoURL: Yup.string().url().nullable()
   })

   async function onSubmit(values: FormikData) {
      setIsLoading(true)
      const { city, country, dateOfBirth, firstName, gender,
         lastName, primaryContactNumber,
         secondaryContactNumber, stateProvince, zipCode } = values
      const address: Address = {
         main: values.mainAddress,
         secondary: values.secondaryAddress,
         city,
         stateProvince,
         country,
         zipCode
      }
      const user: Partial<User> = {}
      if (address) user.address = address
      if (firstName) user.firstName = firstName
      if (lastName) user.lastName = lastName
      if (primaryContactNumber) user.primaryContactNumber = primaryContactNumber
      if (secondaryContactNumber) user.secondaryContactNumber = secondaryContactNumber
      if (dateOfBirth) {
         const info: string[] = R.split('-')(dateOfBirth as string)
         const infoInt = info.map(inf => parseInt(inf))
         user.dateOfBirth = new Date(infoInt[0], infoInt[1] - 1, infoInt[2]).toString()
      }
      if (gender) user.gender = gender as Gender
      try {
         await updateUser(currentUser._id, user)
         setIsEdit(false)
         setIsLoading(false)
      }
      catch (error) {
         console.error(error.message)
      }
   }

   return (
      <div>
         <Box title='EDIT YOUR PERSONAL INFORMATION' paddingVertical>
            <Formik
               {...{ initialValues, validationSchema }}
               onSubmit={async props => await onSubmit(props)}
            >
               {
                  props => <UserInformationForm {...{ props, initialValues, setIsEdit, isLoading }} />
               }
            </Formik>
         </Box>
      </div>
   )
}


interface FormProps {
   readonly setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
   readonly isLoading: boolean
}

const UserInformationForm: React.FC<FormProps & { props: FormikProps<FormikData> }> = ({
   props,
   setIsEdit,
   isLoading
}) => {
   const provStates = [...canadianProvinces, ...usaStates]

   function errorStyle(
      formikError: string | string[] | FormikErrors<any> | FormikErrors<any>[],
      touched: boolean | FormikTouched<any> | FormikTouched<any>[] | string
   ) {
      const style: CSSProperties = {}
      if (formikError && touched)
         style.borderColor = '#c00'
      else if (!formikError)
         style.borderColor = 'var(--lightGray)'
      return style
   }

   return (
      <form className={styles.form} onSubmit={props.handleSubmit}>
         <div className={styles.inputs}>
            <div className={styles.leftSide}>
               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='firstName'>First Name *</label>
                     <input
                        id='firstName'
                        name='firstName'
                        type='text'
                        value={props.values.firstName}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.firstName, props.touched.firstName)}
                     />
                     {
                        props.errors.firstName && props.touched.firstName &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.firstName}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='lastName'>Last Name *</label>
                     <input
                        id='lastName'
                        name='lastName'
                        type='text'
                        value={props.values.lastName}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.lastName, props.touched.lastName)}
                     />
                     {
                        props.errors.lastName && props.touched.lastName &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.lastName}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='email'>Email</label>
                     <input
                        id='email'
                        name='email'
                        type='text'
                        value={props.values.email}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.email, props.touched.email)}
                        disabled
                     />
                     {
                        props.errors.email && props.touched.email &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.email}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='primaryContactNumber'>Main Phone #</label>
                     <input
                        id='primaryContactNumber'
                        name='primaryContactNumber'
                        type='text'
                        value={props.values.primaryContactNumber}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.primaryContactNumber, props.touched.primaryContactNumber)}
                     />
                     {
                        props.errors.primaryContactNumber && props.touched.primaryContactNumber &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.primaryContactNumber}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='secondaryContactNumber'>Secondary Phone #</label>
                     <input
                        id='secondaryContactNumber'
                        name='secondaryContactNumber'
                        type='text'
                        value={props.values.secondaryContactNumber}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.secondaryContactNumber, props.touched.secondaryContactNumber)}
                     />
                     {
                        props.errors.lastName && props.touched.lastName &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.lastName}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='gender'>Sex</label>
                     <select
                        id='gender'
                        name='gender'
                        value={props.values.gender}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.gender, props.touched.gender)}
                     >
                        <option></option>
                        <option>Male</option>
                        <option>Female</option>
                     </select>
                     {
                        props.errors.gender && props.touched.gender &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.gender}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='dateOfBirth'>Date of Birth</label>
                     <input
                        id='dateOfBirth'
                        name='dateOfBirth'
                        type='date'
                        value={props.values.dateOfBirth as string}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.dateOfBirth, props.touched.dateOfBirth)}
                     />
                     {
                        props.errors.dateOfBirth && props.touched.dateOfBirth &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.dateOfBirth}</strong>
                        </div>
                     }
                  </div>
               </div>
            </div>

            <div className={styles.rightSide}>
               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='mainAddress'>Street Address</label>
                     <input
                        id='mainAddress'
                        name='mainAddress'
                        type='text'
                        value={props.values.mainAddress}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.mainAddress, props.touched.mainAddress)}
                     />
                     {
                        props.errors.mainAddress && props.touched.mainAddress &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.mainAddress}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='secondaryAddress'>Address Complement</label>
                     <input
                        id='secondaryAddress'
                        name='secondaryAddress'
                        type='text'
                        value={props.values.secondaryAddress}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.secondaryAddress, props.touched.secondaryAddress)}
                     />
                     {
                        props.errors.secondaryAddress && props.touched.secondaryAddress &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.secondaryAddress}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='city'>City</label>
                     <input
                        id='city'
                        name='city'
                        type='text'
                        value={props.values.city}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.city, props.touched.city)}
                     />
                     {
                        props.errors.city && props.touched.city &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.city}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='stateProvince'>Province / State</label>
                     <select
                        id='stateProvince'
                        name='stateProvince'
                        value={props.values.stateProvince}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.stateProvince, props.touched.stateProvince)}
                     >
                        <option value=""></option>
                        {
                           provStates.map(ps => <option key={ps} value={ps}>{ps}</option>)
                        }
                     </select>
                     {
                        props.errors.stateProvince && props.touched.stateProvince &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.stateProvince}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='country'>Country</label>
                     <select
                        id='country'
                        name='country'
                        value={props.values.country}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.country, props.touched.country)}
                     >
                        <option value=''></option>
                        {
                           countryList.map(c => <option key={c} value={c}>{c}</option>)
                        }
                     </select>
                     {
                        props.errors.country && props.touched.country &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.country}</strong>
                        </div>
                     }
                  </div>
               </div>

               <br />

               <div className={styles.formController}>
                  <div className={styles.inputField}>
                     <label htmlFor='zipCode'>Zip Code</label>
                     <input
                        id='zipCode'
                        name='zipCode'
                        type='text'
                        value={props.values.zipCode}
                        onChange={props.handleChange}
                        style={errorStyle(props.errors.zipCode, props.touched.zipCode)}
                     />
                     {
                        props.errors.zipCode && props.touched.zipCode &&
                        <div className={styles.errorMessage}>
                           <strong>{props.errors.zipCode}</strong>
                        </div>
                     }
                  </div>
               </div>
            </div>
         </div>

         <br />

         <div className={styles.submit}>
            {
               isLoading ?
               <div><Loading localIsLoading size={4}/></div> :
               <>
                  <button
                     className={sharedStyles.yellowButton}
                     onClick={() => setIsEdit(false)}
                     style={{ width: '120px' }}
                     type='button'
                  >
                     CANCEL
                  </button>

                  <button
                     className={sharedStyles.yellowButton}
                     onClick={e => props.handleSubmit()}
                     style={{ width: '120px' }}
                     type='button'
                  >
                     SAVE
                  </button>
               </>
            }
         </div>
      </form>
   )
}

export default UserInformation
