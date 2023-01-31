import React, { useRef, useState } from 'react';

import deleteCom from '../assets/delete.svg'
import edit from '../assets/edit.svg'
import {comment_update} from '../post'
export default function Comments({postID, comments, setComments}) {
  const [toggle, setToggle] = useState(true) 

    // update text on click
   function change(e, commentID, prev, current){
    e.preventDefault()

    const text = document.querySelector('.textField').value
    comment_update(process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_MODE
    : process.env.REACT_APP_PRO_MODE,postID,commentID,{text})
    .then((data)=>{
        setComments(data.json.comments)
    })
    setToggle(true)
    // const empthy = document.querySelector('empthy')
    // empthy.style.display='none'
    current.remove()
    prev.style.display = 'block'
   }
   //display input on click
  function editComment(e){
    if(toggle){
        setToggle(false)
        const comment = e.currentTarget.parentElement.parentElement.parentElement
        const text = comment.children[1]
        const inputHolder= comment.children[2]
        text.style.display= 'none'
        const form = document.createElement('form')
        form.classList.add('formComment')
        inputHolder.appendChild(form)
        const input = document.createElement('input')
        input.classList.add('textField')
        input.setAttribute('value', text.textContent)
        input.setAttribute('required', true)
        input.style.width = '90%'
        form.appendChild(input)
        const submit = document.createElement('input')
        submit.setAttribute('type', 'submit')
        form.appendChild(submit)
        const commentID = comment.getAttribute('data-id')
        form.addEventListener('submit', (e)=>{change(e, commentID, text, form)})
    } 
  }
  //delete text on click
  function deleteComment(e){
    const comment = e.currentTarget.parentElement.parentElement.parentElement
    console.log(comment)
    const commentID = comment.getAttribute('data-id')
    
  }

return (
    <div className='commentsContainer'>
        <div className='comments'>
            {
                comments.map((comment, i)=>{
                    return(
                        <div key={i}
                        data-id={`${comment._id}`}
                        style={{
                            backgroundColor:'wheat',
                            borderRadius:'10px',
                            marginTop:'10px',
                            paddingLeft:'10px',
                            paddingBottom:'5px',
                            width:'100%',
                            wordBreak:'break-all',
                        }}
                        >
                            <div style={{
                                display:'flex',
                                paddingRight:'5px',
                                width:'100%',
                                justifyContent:'space-between'
                            }}>
                            <h3>{comment.username}</h3>
                            <div style={{float:"left" }}>
                                <img  onClick={(e)=>{deleteComment(e)}} style={{cursor:'pointer', width:'20px', height:'20px'}} src={deleteCom} alt="" />
                                <img  onClick={(e)=>{editComment(e)}} style={{cursor:'pointer', width:'20px', height:'20px'}} src={edit} alt="" />
                            </div>
                            </div>
                         
                        <p style={{}}>{comment.text}</p>
                        <div></div>
                        <p style={{float:'right',position:'relative', bottom:'30px'}}>{new Date(comment.createdAt).toDateString()}</p>
                        </div>
                        
                    )
                })
            }
        </div>
      </div>
  )
}
