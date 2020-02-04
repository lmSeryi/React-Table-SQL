import React, { useState, useEffect } from 'react'

import { Loader } from './components/loader'
import { LoadTable } from './components/loadingTable'

export const App = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [search, setSearch] = useState('')
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [loading3, setLoading3] = useState(false)
    const [table, setTable] = useState(true)

    const handleTitle = (event) =>{
        setTitle(event.target.value)
    }

    const handleDescription = (event) =>{
        setDescription(event.target.value)
    }

    const handleSearch = (ev) =>{
        setSearch(ev.target.value)
    }

    const handleTask = async () =>{
        await fetch(`/Hi/${search}`, {
            method: 'get',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        searchTask()
    }

    const addTask = async (ev) => {
        ev.preventDefault()
        if(title.length < 1 || description.length < 1){
            M.toast({html:'Please type the task and its description'}) 
        }
        else{
            setLoading(true)
            await fetch('/Hi', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    description
                }),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            setLoading(false)
            setTitle('')
            setDescription('')
            M.toast({html:'Task saved'}) 
            fetchTask()
        }
        
    }

    const removeTask = async (id) =>{
        if (confirm('Are you sure you want to remove the task?')){
            setLoading2(true)
            await fetch(`/Hi/${id}`, {
                method: 'delete',
                body: JSON.stringify({id}),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            setLoading2(false)
            M.toast({html:'Task removed'}) 
            fetchTask()
        }
}

    const editTask = async (id) =>{
        if(title.length < 1 || description.length < 1){
            M.toast({html:'Please type the task and its description'}) 
        }
        else{
            setLoading3(true)
            await fetch(`/Hi/${id}`, {
                method: 'put',
                body: JSON.stringify(
                        {
                            title,
                            description
                        }
                    ),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            setLoading3(false)
            M.toast({html:'Task edited'}) 
            fetchTask()          
        }
    }

    const searchTask = async () =>{
        const apiCall = await fetch(`/Hi/${search}`)
        const setTask = await apiCall.json()
        setTasks(setTask)
    }
    
    const fetchTask = async () =>{
        const apiCall = await fetch('/Hi/')
        const setTask = await apiCall.json()
        setTasks(setTask)
        setTable(false)
    }

    useEffect(()=>{
        fetchTask()
    },[tasks.title])

    return(        
        <div>
            {/* NAVIGATION */}
            <nav className='light-blue darken-4'>               
                <div className='container'>
                    <a href="/" className='brand-logo'>Mern Stack</a>
                </div>
            </nav>

            {/*Container*/}
            <div className="container">
            
                <div className="row">
                    <div className="col s4 card">
                    
                        <form onSubmit={addTask} className="card-content">
                            <div className="row">
                                <input 
                                    value = {title} 
                                    onChange={handleTitle} 
                                    type='text' 
                                    className="input-field cik s12" 
                                    name='title' 
                                    placeholder='Title' 
                                />
                            </div>
                            <div className="row">
                                <textarea 
                                    value={description} 
                                    onChange={handleDescription} 
                                    placeholder='Description'
                                    className='materialize-textarea' 
                                    name="description"
                                />
                                <button type='submit' className='btn light-blue darken-4'>Send</button>
                            </div>
                        </form>
                        { loading ? <Loader/> : false }
                    </div>
                    { table ?  <div className="col " style = {{transform: 'scale(2,2)', marginLeft: '30%', marginTop: '10%' }}> <div className="row"> <LoadTable/> </div></div>: 
                    <div className="col s7 offset-s1">
                    
                        <div className="row">
                            <input 
                                value = {search} 
                                onChange={handleSearch} 
                                onKeyUp = { handleTask }
                                type='text' 
                                className="input-field" 
                                name='title' 
                                placeholder='Search task'
                            />
                            <i className="material-icons offset-s6">
                                search
                            </i>
                        </div> 
                        
                        <table>
                        
                            <thead>
                                <tr>
                               
                                    <th>Title</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tasks.map(task => {
                                        return(
                                            <tr key={task._id}>
                                                <td>{task.Tasks}</td>
                                                <td>{task.Description}</td>                                                
                                                <td>
                                                    <button className='btn light-blue darken-4'>
                                                        <i  className="material-icons" 
                                                            onClick = {() => removeTask(task._id)}>
                                                                remove
                                                        </i>
                                                    </button>
                                                    <button style={{margin:'4px'}} onClick = {() => editTask(task._id)} className='btn light-blue darken-4'>
                                                        <i className="material-icons">
                                                            edit
                                                        </i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        
                        
                        { loading2 || loading3 ? <Loader/> : false }
                        
                    </div>
                    }
                </div>
            
            </div>
        </div>
    )
}
