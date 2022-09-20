import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './Components/HomePage';
import ShowAll from './Components/ShowAll';
import EditPage from './Components/EditPage';
import ShowToday from './Components/ShowToday';
import ShowWeek from './Components/ShowWeek';
import ShowMonth from './Components/ShowMonth';

function App() {
  {/*We will use this toDoList state for each Separate page... All, Today, Week
and month. Remember to use props when bringing state down to the child class.*/}
  const [toDoList, setToDoList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/planner")
    .then((getList) => {
        console.log(getList);
        console.log(getList.data);
        setToDoList(getList.data);
    })
    .catch((err) => console.log("Error grabbing ToDo list",err))
}, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/toDoList/all' element={<ShowAll toDoList = {toDoList} setToDoList = {setToDoList}/>} />
          {/* Added route for edit page */}
          <Route path='/toDoList/edit/:id' element={<EditPage />} />
          {/* Added route for today page */}
          <Route path='/toDoList/today' element={<ShowToday toDoList = {toDoList} setToDoList = {setToDoList}/>} />
          {/* Added route for month page */}
          <Route path='/toDoList/month' element={<ShowMonth toDoList = {toDoList} setToDoList = {setToDoList}/>} />
          {/* Added route for week page */}
          <Route path='/toDoList/week' element={<ShowWeek toDoList = {toDoList} setToDoList = {setToDoList}/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
