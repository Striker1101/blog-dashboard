import React,{useRef, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchGetAuth } from './post'
import postAuth from './post'
import Textarea from './components/Textarea'

export default function AddPost({index, setIndex}) {
    const form = useRef();
    const [post,  setPost] = useState(undefined)
    
    const navigate = useNavigate()
  function add_update(content){
    const title = document.getElementById('title').value
    const summary = document.getElementById('summary').value
    const publish = document.getElementById('publish').checked

    console.log(typeof content)
    if(post){
      var date = post.date
    }
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
    form.current.reset()
        setIndex(null)
        navigate('/')
        
    });
  }

  function getPost(){
     // fetch all post data 
    fetchGetAuth(
      `${
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_DEV_MODE
          : process.env.REACT_APP_PRO_MODE
      }/all`
    ).then((data) =>
     setPost(data.json.posts[index]));
  }
   function cleanup(){
    setIndex(null)
   }

    useEffect(()=>{
      getPost()
      return(
        cleanup()
      )
    },[])

  return (
    <div style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'wheat',
        borderRadius:'20px',
        paddingTop:'10px'
    }}>
  {    /*<Helmet>
         <script src={`https://cdn.tiny.cloud/1/${REACT_TINY_API}/tinymce/6/tinymce.min.js`} referrerpolicy="origin"></script>
  </Helmet> */}
        <form 
        onSubmit={(e)=>{e.preventDefault(); add_update()}}
        ref={form} action="#" method="post"
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
            <label htmlFor="publish">
                DO YOU WISH TO PUBLISH:

                  <input type="checkbox" name="publish" id="publish" defaultChecked={post?post.publish:false } />
            </label>
            <Textarea submit={add_update} />
        </form>
      
    </div>
  )
}

