import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link, useNavigate } from "react-router-dom";


const ShowWeek = (props) => {
    const {toDoList, setToDoList} = props;
    const navigate = useNavigate();
        //For Tim, Remove .format('MM-DD-YYYY') from current date shown below.
    //This fixes the issue, as it fixed the issue for Josh.
    const currentDate = moment();
    console.log(currentDate);

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


    const deleteItem = (taskId) => {
        axios.delete(`http://localhost:8000/api/planner/${taskId}`)
        .then((res) =>{
            console.log(res.data);
            const newTask = toDoList.filter(( task, index ) => task._id !== taskId )
            setToDoList(newTask);
            navigate('/toDoList/all');
        })
        .catch((err) => console.log("Error of newToDoList", err));
    };

    return (
    <div className='container'>
        <div>
            <h1>Tasks Due Within 7 Days</h1>
            <div>
                <ul className='NavBar'>
                    <li><button><Link to={"/"}>Home Page</Link></button></li>
                    <li><button><Link to={"/toDoList/all"}>Show All</Link></button></li>
                    <li><button><Link to={"/toDoList/today"}>Today</Link></button></li>
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
            { 
                // Gives anytime within a Week other than actual due date to Complete a task given by current date
                //if task is on today list, it will not be on week list. 
                if(moment(list.dueDate).add(1,'days').format("MM-DD-YYYY") > moment(currentDate).add(0,'days').format('MM-DD-YYYY') &&
                moment(list.dueDate).add(1,'days').format("MM-DD-YYYY") < moment(currentDate).add(8,'days').format('MM-DD-YYYY') )
                return(
                      <tr className={styled(list.markedComplete)} key={list._id}>
                        <td>
                        <input id = "checkbox"  type="checkbox" onChange={(e) => handleCompleted(list)} />
                            {list.task}</td>
                        <td>{moment(list.dueDate).add(1,'days').format("MM-DD-YYYY")}</td>
                        {console.log(moment(currentDate).add(7,'days').format("MM-DD-YYYY"))}
                        <td>
                          {/* modified Link route below trying to get edit page to work */}
                          <Link className="Link" to= {`/toDoList/edit/${list._id}`}>Edit</Link> | 
                                    <button className='delete-button' onClick = {() => deleteItem(list._id)}>Delete </button>
                        </td>
                      </tr>
                    )
            }

                  })}
                    </tbody>
                </table>
            </div>
        </div>
    </div> 
    )

}

export default ShowWeek;