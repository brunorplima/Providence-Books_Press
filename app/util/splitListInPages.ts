
function splitListIntoPages <T>(list: T[], pagination: number, listPageMax: number) {
   return list.filter((prod, idx) => {
      const max = pagination * listPageMax - 1;
      const min = pagination * listPageMax - listPageMax - 1;
      return idx > min && idx <= max;
   })
}

export default splitListIntoPages;