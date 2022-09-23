
export default function joinString(Arr) {
   const strArr = Arr.map((obj) => obj.email)
   const newStr = strArr.join('-')
   return newStr;
}
