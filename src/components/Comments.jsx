import React, { useState } from 'react';

import deleteCom from '../assets/delete.svg'
import edit from '../assets/edit.svg'
export default function Comments({postID, comments, setComments}) {
  const [toggle, setToggle] = useState(false) 

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
                            marginTop:'20px',
                            paddingLeft:'10px',
                            paddingBottom:'5px'
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
                                <img style={{cursor:'pointer', width:'20px', height:'20px'}} src={deleteCom} alt="" />
                                <img style={{cursor:'pointer', width:'20px', height:'20px'}} src={edit} alt="" />
                            </div>
                            
                            
                            </div>
                        
                        <p style={{width:''}}>{comment.text}</p>
                        <p style={{float:'right'}}>{new Date(comment.createdAt).toDateString()}</p>
                        </div>
                        
                    )
                })
            }
        </div>
      </div>
  )
}
