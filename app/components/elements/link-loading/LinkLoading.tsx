import Link from 'next/link';
import React, { CSSProperties } from 'react';

interface Props {
   readonly href: string;
   readonly className?: string;
   readonly style?: CSSProperties;
}

const LinkLoading: React.FC<Props> = ({ href, className, style, children }) => {
   
   return (
      <Link href={href}>
         <a 
            className={className}
            style={style}
         >
            {children}
         </a>
      </Link>
   )
}

export default LinkLoading
