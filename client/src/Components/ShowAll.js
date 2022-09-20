import React, { useState, useEffect }  from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import moment from 'moment';

const ShowAll = (props) => {
    const {toDoList, setToDoList} = props;

    useEffect( () => {
        axios.get("http://localhost:8000/api/planner")
        .then( (res) => {
            console.log(res.data);
            setToDoList(res.data);
        })
        .catch( (err) => console.log(err) );
    }, []);

    const handleCompleted = (list) => {

      list.markedComplete = !list.markedComplete;
      setToDoList([...toDoList]);
    };
  
    const styled = (markedComplete) => {
      if (markedComplete === true) {
        return "completed";
      } else {
        return "notCompleted";
      }
    };

    // added delete task to homePage, tested and worked in my desktop- JB
    const deleteItem = (taskId) => {
      axios.delete(`http://localhost:8000/api/planner/${taskId}`)
      .then((res) =>{
          console.log(res.data);
          const newTask = toDoList.filter(( task, index ) => task._id !== taskId )
          setToDoList(newTask);
      })
      .catch((err) => console.log("Error of newToDoList", err));
  };

  return (
    <div className='container'>
      <div>
        <h1>All Tasks</h1>

        <div>
          <ul className='NavBar'>
            <li><button><Link to={"/"}>Home Page</Link></button></li>
            <li><button><Link to={"/toDoList/today"}>Today</Link></button></li>
            <li><button><Link to={"/toDoList/week"}>Week</Link></button></li>
            <li><button><Link to={"/toDoList/month"}>Month</Link></button></li>
          </ul>
        </div>
 {/* added a table structure needs to be CSSd to be in place- JB */}

        <div className='table_container'>
        <table className="tableData">
            <thead>
              <tr>
                <th>Task</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
                </thead>
                <tbody>
                  { toDoList.map((list, index) => {
                    return(
                      <tr className={styled(list.markedComplete)} key={list._id}>
                        <td>
                          <input id = "checkbox" type="checkbox" onChange={(e) => handleCompleted(list)} />
                          {list.task}
                        </td>

                        <td>{moment(list.dueDate).add(1,'days').format("MM-DD-YYYY")}</td>
                        <td>
                          {/* modified Link route below trying to get edit page to work */}
                          <Link className="Link" to= {`/toDoList/edit/${list._id}`}>Edit</Link> | 
                          <button className='delete-button' onClick = {() => deleteItem(list._id)}>Delete </button>
                        </td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
        </div>
    </div>
  </div>
  )
}

export default ShowAll