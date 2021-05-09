
/**
 * Provides the option numbers for the pagination controllers
 * 
 * @param pagination The current page number
 * @param maxPage The maximum number of pages for a given list
 * @returns An array with the numbers
 */
const getPaginationOptions = (pagination: number, maxPage: number): number[] => {

   if (maxPage >= 4) {
      if (pagination > 1 && pagination < maxPage - 1) {
         return [pagination - 1, pagination, pagination + 1, maxPage];
      }
      else if (pagination === 1) {
         return [1, 2, 3, maxPage];
      } else if (pagination >= maxPage - 1) {
         return [maxPage - 2, maxPage - 1, maxPage];
      }
   } else {
      const options: number[] = [];

      for (let i = 1; i <= maxPage; i++) {
         options.push(i);
      }
      return options;
   }
}

export default getPaginationOptions;