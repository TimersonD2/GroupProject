import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

const EditPage = () => {

    const {id} = useParams();
    const [errors, setErrors] = useState({});
    const [task, setTask] = useState("");
    const [dueDate, setDueDate] = useState("");
    const navigate = useNavigate();

    useEffect( () => {
        axios.get(`http://localhost:8000/api/planner/${id}`)
        .then( (res) => {
            console.log(res.data);
            setTask(res.data.task);
            setDueDate(res.data.dueDate);
        })
        .catch( (err) => console.log(err) );
    }, [id]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
    
        axios.put(`http://localhost:8000/api/planner/${id}`, {
            task,
          // Having Trouble getting dueDate to work on post request. ERROR dueDate not defined
          // wasn't set as a useState - JB
            dueDate
        })
        .then((res) => {
            console.log(res);
            navigate("/toDoList/all");
    
        })
        .catch((err) => {
            console.log(err);
            setErrors(err.response.data.errors)
        })
    }
    

    return (
        <div className='container'>
            <div>
                <h1>Hello Friends</h1>

            {/*Don't forget to use branches when pushing in order to prevent merge conflicts */}
                <div>
                    <ul className='NavBar'>
                        <li><button><Link to={"/toDoList/all"}>Show All</Link></button></li>
                        <li><button><Link to={"/toDoList/today"}>Today</Link></button></li>
                        <li><button><Link to={"/toDoList/week"}>Week</Link></button></li>
                        <li><button><Link to={"/toDoList/month"}>Month</Link></button></li>
                    </ul>
                </div>
        {/* Use built in date function to create time zone when tasks
        need to be completed. Example: let date = new Date(year, month, day, hours minutes, seconds, milliseconds)*/}
                <div className='create_form_container'>
                    <form onSubmit={onSubmitHandler}>
                        <label>Edit Plan:</label>
                        <br/>
                        <textarea cols={60} rows={15} name="task" value={task}
                        onChange={(e) => setTask(e.target.value)}/>

                        {errors.task ? <p>{errors.task.message}</p>
                        : null }
                        <br/>
                        <label>Due Date:</label>
                        <br/>
                        <input type={"date"}
                        name="dueDate" value={dueDate.slice(0,10)}
                        onChange={(e) => setDueDate(e.target.value)}/>
                        <br/>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPage