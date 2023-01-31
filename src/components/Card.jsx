import React from 'react'
import edit from'../assets/edit.svg'
import deltepost from '../assets/delete.svg'
import { Link } from 'react-router-dom'
export default function Card({post, toggle}) {
const date = new Date(post.date)

  return (
    <div 
    data-id={post._id}
    style={{display:'flex',
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'whitesmoke',
       width:'80vw',
        flexDirection:'column',
        borderRadius:'15px'
        }}>
          <div>
            <img style={{width:'30px'}} src={deltepost} alt="" />
            <img style={{width:'30px'}} src={edit} alt="" />
          </div>
          <Link  to={`/${post._id}`}>
      <h2 style={{textAlign:'center'}}>{post.title}</h2>
        <hr style={{width:'70vw'}}></hr>
        </Link>
      <div>
      <p>{post.publish ? "PUBLISHED" : "UNPUBLISHED"}</p>
      <button onClick={(e)=>{ toggle(e)}}>{post.publish ? "unpublish": "publish"}</button>
      </div>
      <div style={{ width:'100%'}}>
      <h5 style={{float:'right', marginRight:'5px'}}>uploaded on {date.toDateString()}</h5>
      </div>
       

    </div>
  )
}
