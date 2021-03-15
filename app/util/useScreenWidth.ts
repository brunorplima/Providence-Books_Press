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