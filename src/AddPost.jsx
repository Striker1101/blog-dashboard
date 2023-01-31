import React,{useRef, useEffect} from 'react'
import postAuth from './post'
export default function AddPost() {
    const form = useRef()
    useEffect(()=>{
        form.current.addEventListener('submit', (e)=>{
            e.preventDefault()
            const title = document.getElementById('title').value
            const summary = document.getElementById('summary').value
            const content = document.getElementById('summary').value
            const publish = document.getElementById('publish').checked

            postAuth(`${process.env.NODE_ENV === 'development' ?
            process.env.REACT_APP_DEV_MODE 
            : process.env.REACT_APP_PRO_MODE}/posts`, { title, summary, content, publish })
           .then((data) => { 
            if(data.json.message === "ok"){
                form.current.reset()
            }
            });
           
        })
       
    },[])
  return (
    <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'90vh'
    }}>
        <form ref={form} action="#" method="post"
        style={{display:'flex', flexDirection:"column",}}
        >
            <label htmlFor="title">
                TITLE: 
                <input required type="text" name="title" id="title" />
            </label><br />
            <label htmlFor="SUMMARY">
                SUMMARY:
                <textarea required name="summary" id="summary" cols="30" rows="10"></textarea>
            </label><br />
            <label htmlFor="content">
                CONTENT:
                <textarea required name="comment" id="content" cols="30" rows="10"></textarea>
            </label><br />
            <label htmlFor="publish">
                DO YOU WISH TO PUBLISH:
                <input type="checkbox" name="publish" id="publish" />
            </label>
            <button type="submit">SUBMIT</button>
        </form>
      
    </div>
  )
}
