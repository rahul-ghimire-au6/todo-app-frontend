import { Fragment, useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Card from './components/card';

function App() {
  const [todoData, setTodoData] = useState([])
  const [completedTodo, setCompletedTodo] = useState([])
  const [inCompletedTodo, setInCompletedTodo] = useState([])
  const [todoId, setTodoId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [keyword, setKeyword] = useState('')


  const handleTitleOnChange = (event) => {
    event.preventDefault();
    setTitle(event.target.value)
  }

  const handleDescriptionOnChange = (event) => {
    event.preventDefault();
    setDescription(event.target.value)
  }

  const handleKeywordOnChange = (event) => {
    event.preventDefault();
    setKeyword(event.target.value)
  }

  const fetchTodoData = async () => {
    try {
      let fetchTodoData = await axios.get(`http://localhost:8080/fetchAllTodo`);
      if (fetchTodoData.data.success) {
        let temp = fetchTodoData.data.data
        let completed = [];
        let incompleted = [];
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].isCompleted) {
            completed.push(temp[i])
          } else {
            incompleted.push(temp[i])
          }
        }
        setTodoData(temp);
        setCompletedTodo(completed)
        setInCompletedTodo(incompleted)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const createTodo = async (e) => {
    try {
      e.preventDefault();
      if (!isUpdate) {
        let addTodo = await axios.post(`http://localhost:8080/createTodo`, {
          title: title,
          description: description
        });
        if (addTodo.data.success) {
          setTitle("")
          setDescription("")
          fetchTodoData()
        }
      } else {
        let updateTodo = await axios.put(`http://localhost:8080/updateTodo/${todoId}`, {
          title: title,
          description: description
        });
        if (updateTodo.data.success) {
          setTodoId("")
          setTitle("")
          setDescription("")
          setIsUpdate(false)
          fetchTodoData()
        }
      }

    } catch (err) {
      console.log(err)
    }
  }

  const deleteTodo = async (e, todoId) => {
    try {
      e.preventDefault()
      let deleteTodo = await axios.delete(`http://localhost:8080/deleteTodo/${todoId}`);
      if (deleteTodo.data.success) {
        fetchTodoData()
      }
    } catch (error) {
      console.log(err)
    }
  }

  const toggleTodo = async (e, todoId) => {
    try {
      e.preventDefault();
      console.log(todoId)
      let toggleTodoData = await axios.patch(`http://localhost:8080/toggleTaskStatus/${todoId}`);
      if (toggleTodoData.data.success) {
        fetchTodoData()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const editTodo = async (e, todoId) => {
    try {
      e.preventDefault();
      let singleTodoData = todoData.find(element => element._id === todoId)
      setTodoId(singleTodoData._id)
      setTitle(singleTodoData.title)
      setDescription(singleTodoData.description)
      setIsUpdate(true)
    } catch (error) {
      console.log(error)
    }
  }

  const searchTodoByKeyword = async (e) => {
    try {
      e.preventDefault();
      const fetchTodoByKeyword = await axios.get(`http://localhost:8080/searchByKeyword?keyword=${keyword}`)
      if (fetchTodoByKeyword.data.success) {
        let temp = fetchTodoByKeyword.data.data
        let completed = [];
        let incompleted = [];
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].isCompleted) {
            completed.push(temp[i])
          } else {
            incompleted.push(temp[i])
          }
        }
        setTodoData(temp);
        setCompletedTodo(completed)
        setInCompletedTodo(incompleted)
      }

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchTodoData()
  }, [])

  return (
    <Fragment>
      <div className='customContainer'>
        <div className='createTodoContainer'>
          <div className='createTodoDiv createTodoDiv1'>
            <div className='formDiv'>
              <form onSubmit={createTodo}>
                <h5>Create / Update Todo</h5>
                <input type="text" onChange={handleTitleOnChange} value={title} placeholder='Enter Title' /><br />
                <input type="text" onChange={handleDescriptionOnChange} value={description} placeholder='Enter Description' /><br />
                <input type="submit" />
              </form>
            </div>
          </div>
          <div className='createTodoDiv createTodoDiv2'>
            <div className='formDiv'>
              <form onSubmit={searchTodoByKeyword}>
                <h5>Search Todo By Keyword</h5><br />
                <input type="text" onChange={handleKeywordOnChange} value={keyword} placeholder='Enter Keyword' /><br />
                <input type="submit" value="search" />
              </form>
            </div>
          </div>

        </div>
        <div className='bodyDiv'>
          {/* left card */}
          <div className='leftContainer'>
            <div className='miniheading'><h4>Inprogress - Total:&nbsp;<b>{inCompletedTodo.length}</b></h4></div>
            <div className='cardContainer159'>
              {inCompletedTodo.map(element => (
                <div key={element._id}>
                  <Card deleteTodo={deleteTodo} editTodo={editTodo} toggleTodo={toggleTodo} id={element._id} title={element.title} description={element.description} isCompleted={element.isCompleted} />
                </div>
              ))}
            </div>
          </div>
          {/* divider */}
          <div className='divider'></div>
          {/* right card */}
          <div className='leftContainer'>
            <div className='miniheading'><h4>Done - Total:&nbsp;<b>{completedTodo.length}</b></h4></div>
            <div className='cardContainer159'>
              {completedTodo.map(element => (
                <div key={element._id}>
                  <Card deleteTodo={deleteTodo} editTodo={editTodo} toggleTodo={toggleTodo} id={element._id} title={element.title} description={element.description} isCompleted={element.isCompleted} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Fragment>
  )
}

export default App
