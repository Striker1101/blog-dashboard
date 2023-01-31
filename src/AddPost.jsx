import React,{useRef, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchGetAuth } from './post'
import postAuth from './post'
export default function AddPost({index}) {
    const form = useRef();
    const [post,  setPost] = useState(undefined)
    
    const navigate = useNavigate()
  function add_update(e){
    e.preventDefault()
    const title = document.getElementById('title').value
    const summary = document.getElementById('summary').value
    const content = document.getElementById('summary').value
    const publish = document.getElementById('publish').checked

    if(post){
      var date = post.date
    }
    console.log(post)
    postAuth(`${process.env.NODE_ENV === 'development' ?
    process.env.REACT_APP_DEV_MODE 
    : process.env.REACT_APP_PRO_MODE}/posts/${post? post._id : ''}`,
     { 
      title,
       summary,
        content,
       publish: post ? post.publish : publish,
       date: post ? date : '' 
      })
   .then((data) => { 
    console.log(form.current)
    form.current.reset()
        navigate('/')
        
    });
  }

   

    useEffect(()=>{
       // fetch all post data 
    fetchGetAuth(
      `${
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEV_MODE
          : process.env.REACT_APP_PRO_MODE
      }/all`
    ).then((data) =>
     setPost(data.json.posts[index]));

      //toggle betwenn update and add
       setTimeout(()=>{
        form.current.addEventListener('submit',(e)=>{add_update(e)})
       }, 2000)
       return(
        form.current.removeEventListener('submit',(e)=>{add_update(e)})
       )
        
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
                <input required type="text" name="title" id="title" title='Importance of inheritance' defaultValue={post ? post.title : ""}/>
            </label><br />
            <label htmlFor="summary">
                SUMMARY:
                <textarea required name="summary" id="summary" cols="30" rows="10" defaultValue={post ? post.summary : ""}></textarea>
            </label><br />
            <label htmlFor="content">
                CONTENT:
                <textarea required name="comment" id="content" cols="30" rows="10" defaultValue={post ? post.content : ""}></textarea>
            </label><br />
            <label htmlFor="publish">
                DO YOU WISH TO PUBLISH:

                  <input type="checkbox" name="publish" id="publish" defaultChecked={post?post.publish:false } />
            </label>
            <button type="submit">{post ? "UPDATE" : "ADD"}</button>
        </form>
      
    </div>
  )
}
