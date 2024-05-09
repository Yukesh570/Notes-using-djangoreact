import React from 'react'
import {Link} from 'react-router-dom'



let getTime=(note)=>{
  return new Date(note.updated).toLocaleDateString()

}
let gettitle =(note)=>{
  let title=note.body.split('\n')[0]
  if (title.length>45){
    return title.slice(0,25)
  }
  return title
}

let getContent=(note)=>{
  let title =gettitle(note)
  let content=note .body.replaceAll('\n','')
  content=content.replaceAll(title,'')
  if(content.length>45){
    return content.slice(0,45) +'...'
  }
  else{
    return content
  }
}

const listitem = ({note}) => {
  return (
    <Link to={`/get_data/${note.id}`} >
      <div className='notes-list-item'>
    <h3>{gettitle(note)}</h3>
    <p><span>{getTime(note)}</span>{getContent(note)}</p>
    </div>
    </Link>
  )
}


export default listitem 
