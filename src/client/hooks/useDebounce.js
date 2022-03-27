import { useEffect, useState } from "react";

 const useDebounce = (value, delay) => {
   const [state, setState] = useState({
       debounceValue:value
   })

   useEffect(() => {
     const timeOutId = setTimeout(() => {
       setState(state => ({...state, debounceValue:value}))
     }, delay)

      return () => {
          clearTimeout(timeOutId)
        }
   },[value, delay])

   return state.debounceValue
}

export default useDebounce;