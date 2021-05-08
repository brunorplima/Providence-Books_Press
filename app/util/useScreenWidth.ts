import { useEffect, useState } from 'react'

const useScreenWidth = () => {
   const [width, setWidth] = useState<number | null>(null);

   useEffect(() => {
      setWidth(window.innerWidth)
   }, [])

   useEffect(() => {
      const assignWidth = () => {
         setWidth(window.innerWidth)
      }
      window.addEventListener('resize', assignWidth, { once: true })
   }, [width])

   return width;
}

export default useScreenWidth;

export const numberItemsHorizontalList = (screenWidth: number) => {
   if (screenWidth <= 450) return 1;
   if (screenWidth <= 670) return 2;
   if (screenWidth <= 767) return 3;
   if (screenWidth <= 950) return 2;
   if (screenWidth <= 1150) return 3;
   return 4;
}

export const numberItemsHorizontalScrollablelList = (screenWidth: number) => {
   if (screenWidth <= 600) return 1;
   if (screenWidth <= 830) return 2;
   if (screenWidth <= 1000) return 3;
   return 4;
}

export const numberItemsArticlesList = (screenWidth: number) => {
   if (screenWidth <= 450) return 1;
   if (screenWidth <= 650) return 2;
   if (screenWidth <= 820) return 3;
   if (screenWidth <= 1000) return 4;
   return 5;
}