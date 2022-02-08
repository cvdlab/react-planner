import React, { useEffect } from "react"

export const Context = React.createContext();

export default function ContextProvider(props) {

    const [data, setData] = React.useState({})
    const [select,setSelect] = React.useState(null)
    const [open,setOpen] = React.useState(false)

    useEffect(()=>{
      document.addEventListener('contextmenu', e => {
        e.preventDefault();
      });

      document.addEventListener("keydown",e=>{
        if(e.keyCode === 27)
          setOpen(false)
      })

      const temp = localStorage.getItem("data")
      if(temp){
        setData(JSON.parse(temp))
      }
    },[])
  
    return (
      <Context.Provider value={{data:{data,setData},popup:{open,setOpen},select:{select,setSelect}}}>
          {props.children}
      </Context.Provider>
    );
}