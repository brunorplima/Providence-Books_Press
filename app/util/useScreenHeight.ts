import { useEffect, useState } from "react";

const useScreenHeight = () => {
   const [height, setHeight] = useState<number | null>(null);

   useEffect(() => {
      setHeight(screen.availHeight);
   }, [])

   useEffect(() => {
      const assignHeight = () => {
         setHeight(screen.availHeight);
      }
      window.addEventListener('resize', assignHeight, { once: true })

      return () => window.removeEventListener('resize', assignHeight)
   }, [height])

   return height;
}

export default useScreenHeight;
