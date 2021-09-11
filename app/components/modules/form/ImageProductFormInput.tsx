import React, { CSSProperties, useState, useEffect } from 'react';
import { SMALL } from '../../../util/inputFormSizes';
import mainFormStyles from '../../../styles/form/MainForm.module.css';
import styles from '../../../styles/form//ImageFormInput.module.css';
import { ReactNode } from 'hoist-non-react-statics/node_modules/@types/react';
import { AiOutlineInfoCircle, AiTwotoneCrown } from 'react-icons/ai';
import Dialog from '../dialog/Dialog';
import { closeDialog, openDialog } from '../../../redux/actions/openedDialogNameAction';
import { MainIndex } from '../admin-user/ProductsForm';
import { TiDelete } from 'react-icons/ti';
import clsx from 'clsx';

interface Props {
   readonly setFiles: React.Dispatch<React.SetStateAction<File[]>>;
   readonly fileURLs: string[];
   readonly setFileURLs: React.Dispatch<React.SetStateAction<string[]>>;
   readonly mainIndex: MainIndex | null;
   readonly setMainIndex: React.Dispatch<React.SetStateAction<MainIndex | null>>;
   readonly inputClassName?: string;
   readonly size?: string;
   readonly isRequired?: boolean;
   readonly containerClassName?: string;
   readonly name?: string;
   readonly label?: string;
}

const ImageProductFormInput: React.FC<Props> = ({
   inputClassName,
   containerClassName,
   setFiles,
   fileURLs,
   setFileURLs,
   mainIndex,
   setMainIndex,
   size,
   isRequired,
   name,
   label
}) => {
   const [fileList, setFileList] = useState<FileList>(null)

   useEffect(() => {
      if (fileURLs.length) setMainIndex({ idx: 0, isOld: true })
   }, [])

   useEffect(() => {
      if (mainIndex !== null && fileList) setFiles(parseFiles(fileList))
   }, [mainIndex])

   const style: CSSProperties = {
      width: size ? size : SMALL,
   }

   function renderEachFile(func: (file: File, i?: number) => ReactNode) {
      const nodes: ReactNode[] = []
      for (let idx = 0; idx < fileList.length; idx++) {
         nodes.push(func(fileList.item(idx), idx))
      }
      return nodes
   }

   function parseFiles(f: FileList) {
      const fls: File[] = []
      for (let idx = 0; idx < f.length; idx++) {
         fls.push(f.item(idx))
      }
      return fls
   }

   function onChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.files.length + fileURLs.length > 5) {
         openDialog('LIMIT')
         return
      }
      setMainIndex(null)
      setFileList(e.target.files)
      setFiles(parseFiles(e.target.files))
   }

   return (
      <div className={containerClassName ? containerClassName : mainFormStyles.inputContainer}>
         <label htmlFor={name}>{label} {isRequired && '*'}</label>
         <input
            type='file'
            className={inputClassName ? inputClassName : mainFormStyles.inputField}
            onChange={e => onChange(e)}
            required={isRequired}
            style={style}
            accept=".jpg,.png,.gif, .jpeg"
            multiple
         />
         {
            fileList?.length ?
               <div className={styles.selectNotice} style={mainIndex !== null ? { color: 'var(--lightGray)' } : {}}>
                  <AiOutlineInfoCircle size={16} />
                  &nbsp;&nbsp;
                  <span>Select the main image</span>
               </div> : null
         }
         {
            fileList &&
            <div className={styles.imageListContainer}>
               {
                  renderEachFile((fileList, idx) => (
                     <div key={`${idx}/${fileList.name}/${fileList.size}`} className={styles.image}>
                        {mainIndex?.idx === idx && !mainIndex?.isOld && <div className={styles.icon}><AiTwotoneCrown /></div>}
                        <img
                           src={URL.createObjectURL(fileList)}
                           alt={fileList.name}
                           onClick={() => setMainIndex({ idx, isOld: false })}
                           className={mainIndex?.idx === idx && !mainIndex?.isOld ? styles.selectedImage : ''}
                        />
                     </div>
                  ))
               }
            </div>
         }

         {
            fileURLs.length ?
               <div className={styles.imageListContainer}>
                  {
                     fileURLs.map((url, idx) => (
                        <div key={url} className={styles.image}>
                           {
                              mainIndex?.idx === idx && mainIndex?.isOld &&
                              <div className={clsx(styles.icon, styles.crownIcon)}><AiTwotoneCrown /></div>
                           }

                           <div
                              className={clsx(styles.icon, styles.deleteIcon)}
                              onClick={() => setFileURLs(fileURLs.filter(urlStr => urlStr !== url))}
                           >
                              <div></div>
                              <span><TiDelete fontSize={24}/></span>
                           </div>

                           <img
                              src={url}
                              alt='Book cover'
                              onClick={() => setMainIndex({ idx, isOld: true })}
                              className={mainIndex?.idx === idx && mainIndex?.isOld ? styles.selectedImage : ''}
                           />
                        </div>
                     ))
                  }
               </div> : null
         }

         <Dialog
            name='LIMIT'
            message='You can only select up to 5 images.'
            dialogType='info'
            buttonsOptions={[{
               label: 'CLOSE',
               clickHandler: closeDialog,
               secondaryStyle: true
            }]}
         />
      </div>
   )
}

export default ImageProductFormInput;
