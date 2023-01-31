import React from 'react'
import edit from'../assets/edit.svg'
import deltepost from '../assets/delete.svg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {fetchGet_ID_delete} from '../post'
export default function Card({setPosts, post,index,setIndex, toggle}) {
const date = new Date(post.date)
const navigate = useNavigate()
 
// edit on click
function editClick(e){
  let card = e.currentTarget.parentElement.parentElement
  const index = card.getAttribute('data-index')
  setIndex(index)
  navigate('/add-post')
 }

 function deleteClick(e){
  const card = e.currentTarget.parentElement.parentElement
  const id = card.getAttribute('data-id')
  const name = card.children[1].children[0].textContent
  const choice = prompt(`Are you sure you want to delete, this is permanent, type (${name}) to continous `)
  if(choice === name){
    //delete
    fetchGet_ID_delete(
       process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_MODE
    : process.env.REACT_APP_PRO_MODE,
  id).then((data) => setPosts(data.json.posts));
  }
 }
  return (
    <div 
    data-index = {index}
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
            <img onClick={(e)=>{deleteClick(e)}}  style={{width:'30px'}} src={deltepost} alt="" />
            <img onClick={(e)=>{editClick(e)}} style={{width:'30px'}} src={edit} alt="" />
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
