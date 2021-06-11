import React, { useState, useLayoutEffect } from 'react';

const useScrollPosition = () => {
   const [scrollPosition, setScrollPosition] = useState<number | null>(null);

   useLayoutEffect(() => {
      setScrollPosition(window.scrollY);
   }, [])

   useLayoutEffect(() => {
      const assignScrollPosition = () => {
         setScrollPosition(window.scrollY);
      }
      window.addEventListener('scroll', assignScrollPosition);

      return () => window.removeEventListener('scroll', assignScrollPosition);
   }, [scrollPosition])

   return scrollPosition;
}

export default useScrollPosition;