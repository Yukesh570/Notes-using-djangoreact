import React,{useState,useEffect} from 'react'
import { useNavigate, useMatch } from 'react-router-dom';
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'



const NotePage = (match,navigate)=>{
        navigate =useNavigate();
        match =useMatch('get_data/:id');
        let noteId=match.params.id;
        console.log(noteId); // This will log the value of `id`

    

    let [note,setNote] = useState(null)

    useEffect(()=>{
        getnote()

    },[noteId])

    let getnote=async()=>{
        if (noteId ==='new')return
        let response=await fetch(`/api/get_data/${noteId}/`)
        let data = await response.json()
        setNote(data)
    }

    let updateNote = async()=>{
        fetch(`/api/get_data/${noteId}/update`,{

            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(note)
        })
            
    }

    let addnote=async()=>{
        fetch('/api/get_data/add_data/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(note)
        })
    }
    let handleadd=()=>{
        addnote()
        navigate('/')
        window.location.reload(); // Reload the website

    }

    let deletenote =async()=>{
        fetch(`/api/get_data/${noteId}/delete`,{   
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(note)
        })
    }
    let handledelete =()=>{
        deletenote()
        navigate('/')
        window.location.reload(); // Reload the website

    }

    let handlesubmit =()=>{
        if(noteId !=='new'&& !note.body)
         {   deletenote()
         }else if (noteId !=='new'){
            updateNote()
         }
        navigate('/')
        window.location.reload(); // Reload the website

    }

  return (
    <div>
        
        {/* <h1>Single notes{noteId}</h1> */}
        <div className='note'>
            <div className='note-header'>
                <h3> 
                    
                    <ArrowLeft onClick={handlesubmit}/>
                    
                </h3>
                {noteId !=='new'?(
                    <button onClick={handledelete}>delete</button>
                ):(
                    <button onClick={handleadd} >Done</button>
                )
            }
            </div>
            <textarea onChange={(e)=>{setNote({...note,'body':e.target.value})}} value={note?.body}></textarea>
            
        </div>
    
    </div>
  )
}

export default NotePage
