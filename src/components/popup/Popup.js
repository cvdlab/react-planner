import * as React from 'react';
import {Context} from "../../Context/Context"
import {Button,Dialog,DialogContent,DialogActions,DialogTitle,Slide,TextField} from "@mui/material"


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Popup() {

  const context = React.useContext(Context)

  const [data,setData] = React.useState([])

  React.useEffect(()=>{
    if(context.select.select){
      if(context.data.data[context.select.select.id]){
        setData(context.data.data[context.select.select.id])
      }
      else{
        setData([])
      }
    }
    
  },[context.popup.open])

  const handleChange = (e,name,index)=>{
    const {value} = e.target
    if(e.target.value !== null){
      setData(prevValue=>{
        var temp = JSON.parse(JSON.stringify(prevValue))
        if(name === "name"){
          temp[index].name = value
        }
        else if(name === "value"){
          temp[index].value = value
        }
        return temp
      })
    }
    
  }

  const addProperties = ()=>{
    setData(prevValue=>[...prevValue,{name:"",value:""}])
  }

  const Save =()=>{
    if(context.select.select){
      context.data.setData(prevValue=>{
        const temp = prevValue
        temp[context.select.select.id] = data
        localStorage.setItem("data",JSON.stringify(temp))
        return temp
      })
    }
    context.popup.setOpen(false)
  }

  return (
    <Dialog
        open={context.popup.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>context.popup.setOpen(false)}
      >
        <DialogTitle>{context.select.select && ("id: " + context.select.select.id)}</DialogTitle>
        <DialogContent>
          {context.select.select && <div>
              {data.map((item,index)=>(<div key={index} style={{marginTop:"15px",display:"flex",alignItems:"center"}}><span style={{fontSize:"1.8em",marginRight:"10px"}}>{index+1}.</span><TextField style={{marginRight:"10px"}} value={item.name} onChange={(e)=>handleChange(e,"name",index)} label="Name" variant="outlined" /><TextField value={item.value} onChange={(e)=>handleChange(e,"value",index)} label="Value" variant="outlined" /></div>))}
              <Button style={{marginTop:"10px"}} onClick={addProperties}>Add Properties</Button>
            </div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>context.popup.setOpen(false)}>Cancel</Button>
          <Button onClick={Save}>Save</Button>
        </DialogActions>
    </Dialog>
  );
}
