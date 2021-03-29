import React from 'react'
import Button from '../../elements/button/Button'
import styles from '../../../styles/bookshelf/BookshelfControllers.module.css'

interface Props {
   removeItems: () => void,
   emptyShelf: () => void
}

const BookshelfControllers: React.FC<Props> = ({ removeItems, emptyShelf }) => {
   return (
      <div className={styles.container}>
         <div>
            <Button label='EMPTY SHELF' clickHandler={emptyShelf} style={{width: 130}}/>
         </div>

         <div>
            <Button label='DELETE' clickHandler={removeItems} style={{width: 130}}/>
         </div>
      </div>
   )
}

export default BookshelfControllers
