import React,{useRef, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {postData} from './post'
export default function Login() {
    const form = useRef()
    const navigate = useNavigate()
    let message= useRef()
    let [toggle, setToggle] = useState(false)
    

    useEffect(()=>{
        form.current.addEventListener('submit', (e)=>{
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value
            postData(`${process.env.NODE_ENV === 'development' ?
            process.env.REACT_APP_DEV_MODE 
            : process.env.REACT_APP_PRO_MODE}/auth/log-in`, {email,password})
           .then((data) => {
            if(data.json.token){
              localStorage.setItem('token', data.json.token)
             return navigate('/')
            }else{
              message.current = data.json.info.message
              return setToggle(!toggle)
            }
            });
        })
    },[])
  return (
    <div>
        <div ></div>
        <form id='form'
        onSubmit={(e)=>{e.preventDefault()}}
        style={{
            display:'flex',
            flexDirection:'column',
            height:'100vh',
            width:'100vw',
            justifyContent:'center',
            alignItems:'center'
        }} 
         ref={form}>
            <div style={{
                backgroundColor:'wheat',
                padding:'20px',
                borderRadius:'10px'
            }}>

            <h4 style={{textAlign:'center', color:'red'}} >{message.current}</h4>

            <label htmlFor="email">
                EMAIL
                <input required type="email" name="email" id="email" />
            </label><br />
            <label htmlFor="password">
                PASSWORD
                <input required type="password" name="password" id="password" />
            </label><br />
            <button type="submit">Submit</button>
            </div> 
        </form>
    </div>
  )
}
