import { CSSProperties } from 'react'
import React from 'react'

// export interface ColumnData {
//    readonly data: string[]
//    readonly style: CSSProperties
// }

// interface Props {
//    readonly content: ColumnData[]
// }

const AccountList: React.FC = ({ children }) => {
   return (
      <div>
         {children}
      </div>
   )
}

export default AccountList
