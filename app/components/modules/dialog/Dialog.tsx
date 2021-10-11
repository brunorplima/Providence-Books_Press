import React, { SyntheticEvent } from 'react';
import Button, { ButtonProps } from '../../elements/button/Button';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import styles from '../../../styles/dialog/Dialog.module.css';
import { connect } from 'react-redux';
import { closeDialog } from '../../../redux/actions/openedDialogNameAction';
import { AiFillWarning, AiFillInfoCircle } from 'react-icons/ai'

interface Props {
   readonly name: string;
   readonly buttonsOptions: ButtonProps[];
   readonly message: string | string[];
   readonly openedDialogName?: string;
   readonly dialogType?: 'warning' | 'info';
}

const Dialog: React.FC<Props> = ({
   name,
   openedDialogName,
   buttonsOptions,
   message,
   dialogType
}) => {
   if (name !== openedDialogName) return null;

   function backgroundCloseDialog(e: SyntheticEvent) {
      if (e.currentTarget === e.target) {
         closeDialog();
      }
   }

   return createPortal(
      <div className={styles.container} onClick={backgroundCloseDialog}>
         <div className={styles.dialog}>
            <div className={styles.closeIcon}>
               <IoMdClose fontSize={28} onClick={closeDialog} />
            </div>

            <div className={styles.body}>
               {
                  dialogType === 'warning' ?
                     <div className={styles.dialogType}>
                        <AiFillWarning fontSize={28} />
                     </div> :
                     dialogType === 'info' ?
                        <div className={styles.dialogType}>
                           <  AiFillInfoCircle fontSize={28} />
                        </div> :
                        null
               }
               {
                  typeof message === 'string' ?
                     message :
                     (message as string[]).map(msg => <p key={msg}>{msg}</p>)
               }
            </div>

            <div className={styles.buttons}>
               {
                  buttonsOptions.map((button, idx) => {
                     return (
                        <Button
                           key={idx}
                           label={button.label}
                           clickHandler={button.clickHandler}
                           secondaryStyle={button.secondaryStyle}
                           style={button.style ? button.style : { width: 90 }}
                        />
                     )
                  })
               }
            </div>
         </div>
      </div>,
      document.getElementById('dialog-modal')
   )
}

const mapStateToProps = (state) => {
   return {
      openedDialogName: state.openedDialogName
   }
}

export default connect(mapStateToProps)(Dialog);
