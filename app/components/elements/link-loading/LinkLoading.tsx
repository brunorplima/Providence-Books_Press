import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { CSSProperties, useEffect } from 'react';
import createLoadingAction from '../../../redux/actions/loadingAction';
import { store } from '../../../redux/store/store';

interface Props {
   readonly href: string;
   readonly className?: string;
   readonly style?: CSSProperties;
}

const LinkLoading: React.FC<Props> = ({ href, className, style, children }) => {
   const router = useRouter();
   useEffect(() => {
      router.events.on('routeChangeStart', activateLoading);
      router.events.on('routeChangeComplete', deactivateLoading);
      return () => {
         router.events.off('routeChangeStart', activateLoading);
         router.events.off('routeChangeComplete', deactivateLoading);
      }
   }, []);
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

const activateLoading = (url, { shallow }) => {
   store.dispatch(createLoadingAction(true));
}

const deactivateLoading = (url, { shallow }) => {
   store.dispatch(createLoadingAction(false));
}

export default LinkLoading
