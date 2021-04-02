import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setList } from "../../store/list";
// import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/task";

function CreateTask() {
  const dispatch = useDispatch();
  const [listId, setListId] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.createTasks({ listId, body }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className='createTaskDiv'>
      <div className='createTaskTitle' align='center' >Create Task for your List</div>
      <form className='createTaskForm' onSubmit={handleSubmit} >
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className='taskInput' >
          <input
            placeholder='Task'
            className='body'
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <input
            placeholder="List ID"
            className="listId"
            type='integer'
            value={listId}
            onChange={(e) => setListId(e.target.value)}
            required
          />
        </div>
        <button className='taskBtn' type='submit'>
          Create Task
        </button>
      </form>
    </div>
  )
}

export default CreateTask;