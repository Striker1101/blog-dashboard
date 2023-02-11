import React, {useState } from 'react';
import { Image_Container, PackOne,PackTwo } from './styles/Comment.styled';
import deleteCom from '../assets/delete.svg'
import edit from '../assets/edit.svg'
import {comment_update, comment_delete} from '../post'
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
    const commentID = comment.getAttribute('data-id')
    const choice = prompt(' Are you sure about this, your cant get Comment back. type yes to continue')
    if(choice.toUpperCase() === 'YES'){
     if(toggle){
        setToggle(false)
        comment_delete(process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_DEV_MODE
        : process.env.REACT_APP_PRO_MODE,postID,commentID)
        .then((data)=>{
            setComments(data.json.comments);
            setToggle(true)
        })
     }
        
    }
  }

return (
    <div >
        <div >
            {
                comments.map((comment, i)=>{
                    return(
                        <PackOne key={i}
                        data-id={`${comment._id}`}

                        >
                            <PackTwo>
                            <h3>{comment.username}</h3>
                            <Image_Container>
                                <img  onClick={(e)=>{deleteComment(e)}} style={{cursor:'pointer', width:'20px', height:'20px'}} src={deleteCom} alt="" />
                                <img  onClick={(e)=>{editComment(e)}} style={{cursor:'pointer', width:'20px', height:'20px'}} src={edit} alt="" />
                            </Image_Container>
                            </PackTwo>
                         
                        <p>{comment.text}</p>
                        <div></div>
                        <h6>{new Date(comment.createdAt).toDateString()}</h6>
                        </PackOne>
                        
                    )
                })
            }
        </div>
      </div>
  )
}
