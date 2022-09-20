import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link, useNavigate } from "react-router-dom";

const ShowMonth = (props) => {
    const {toDoList, setToDoList} = props;
    const navigate = useNavigate();

    // build a formatted string for todays date
    let currentDate = new Date();
    let month = currentDate.getMonth(); //Be careful! January is 0 not 1
    month = month + 1;
    let monthStr = month.toString();
    if (monthStr.length < 2) {
        monthStr = "0" + monthStr;
    }

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

    // filter the toDoList array recieved from props for dueDate = this month
    const filterArr = toDoList.filter(( task, index ) => 
        moment(task.dueDate).format("MM") === monthStr );
    // console.log("Filtered Array = ", filterArr);

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
            <h1>Tasks Due This Month</h1>
            <div>
                <ul className='NavBar'>
                    <li><button><Link to={"/"}>Home Page</Link></button></li>
                    <li><button><Link to={"/toDoList/all"}>Show All</Link></button></li>
                    <li><button><Link to={"/toDoList/today"}>Today</Link></button></li>
                    <li><button><Link to={"/toDoList/week"}>Week</Link></button></li>
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
                        { filterArr.map((list, index) => {
                            {
                                if(moment(list.dueDate).add(1, 'days').format("MM") === monthStr )
                            
                            return(
                            <tr className={styled(list.markedComplete)} key={list._id}>
                            <td>
                                <input id = "checkbox"  type="checkbox" onChange={(e) => handleCompleted(list)} />
                                {list.task}
                            </td>                                
                            <td>{moment(list.dueDate).add(1,'days').format("MM-DD-YYYY")}</td>
                                <td>
                                {/* modified Link route below trying to get edit page to work */}
                                    <Link className="Link" to= {`/toDoList/edit/${list._id}`}>Edit</Link> | 
                                    <button className='delete-button' onClick = {() => deleteItem(list._id)}>Delete </button>
                                </td>
                            </tr>
                            )}
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

export default ShowMonth