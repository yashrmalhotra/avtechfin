
import { useEffect, useState, useRef } from "react"
import Navbar from "../components/Navbar"
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from "../../context/AuthProvider";
const Dashboard = ()=>{
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [showFinished, setShowFinished] = useState(false)
    const {login,logOut,isLoggedIn} = useAuth()
    const saveToLs = () => {
        localStorage.setItem("todos", JSON.stringify(todos))


    }
    useEffect(() => {
        let todoString = localStorage.getItem("todos")

        if (todoString !== null) {
            let todos = JSON.parse(localStorage.getItem("todos"))
            setTodos(todos)
        }


    }, [])

    const toggleFinished = () => {
        setShowFinished(!showFinished)

    }


    const handleAdd = () => {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
        setTodo("")
        saveToLs()


    }
    const handleChange = (e) => {
        setTodo(e.target.value)

    }
    const handleDelete = (e, id) => {
        let newTodos = todos.filter(item => {
            return item.id !== id
        })

        setTodos(newTodos)
        saveToLs()

    }
    const handleEdit = (e, id) => {
        let t = todos.filter(i => i.id === id)
        setTodo(t[0].todo)
        let newTodos = todos.filter(item => {
            return item.id !== id
        })

        setTodos(newTodos)



    }

    const handleCheck = (e) => {
        let id = e.target.name

        let index = todos.findIndex(item => {
            return item.id === id
        })

        let newTodos = [...todos]

        newTodos[index].isCompleted = !newTodos[index].isCompleted
        setTodos(newTodos)
        saveToLs()
    }


    return (
        <>
            <Navbar logOut={logOut}/>
            <div className="mx-3 md:container bg-violet-200 md:mx-auto my-5 w-full md:w-1/2 p-5 min-h-[80vh]">
                <h1 className="text-4xl text-center">iTask - Manage your todos at one place</h1>
                <div className="addTodo flex flex-col gap-4">
                    <h2 className="text-lg font-bold">Add a Todo</h2>
                    <div className="flex h-10 items-center">
                        <input onChange={handleChange} value={todo} type="text" className="w-full rounded-lg px-5" />
                        <button onClick={handleAdd} disabled={todo.length <= 3} className="bg-violet-800 hover:bg-violet-800 p-3  py-1 rounded-md m-5 mx-2 text-sm text-white font-bold disabled:bg-violet-950">Add</button>
                    </div>
                </div>
                <input type="checkbox" name="" id="" checked={showFinished} onChange={toggleFinished} /> Show Finished
                <div className="h-[1px] bg-black opacity-15 mx-auto w-[90%] my-3"></div> 
                <div>
                    <h2 className="text-lg font-bold">Your Todo</h2>
                    <div className="todos">
                        {todos.length === 0 && <div>No Todos to display</div>}
                        {todos.map(item => {


                            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-3 justify-between items-center" >
                                <div className="flex gap-5">
                                    <input onChange={handleCheck} type="checkbox" name={item.id} checked={item.isCompleted} id="" />
                                    <div className={`${item.isCompleted ? "line-through" : ""} w-32 break-words`}>{item.todo}</div>
                                </div>
                                <div className="buttons flex h-full m-2">
                                    <button onClick={e => { handleEdit(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 rounded-md mx-1 text-sm text-white font-bold"><FaEdit />
                                    </button>
                                    <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 rounded-md mx-1 text-sm text-white font-bold"><AiFillDelete /></button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>


        </>
    )

}

export default Dashboard