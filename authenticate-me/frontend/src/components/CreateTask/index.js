import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../../store/list";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/task";

function CreateTask() {
  const dispatch = useDispatch();
  const [listId, setListId] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const lists = useSelector(state => Object.values(state.lists));
  const [selectedList, setSelectedList] = useState(1);

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.createTasks({ listId, body }))
      .then(() => {
        history.push('/');
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const dropdownLists = () => {
    return lists.map(list => {
      return (
        <option value={list.id} key={list.id}>{list.title}</option>
      )
    })
  }

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
          <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
            {dropdownLists()}
          </select>
        </div>
        <button className='taskBtn' type='submit'>
          Create Task
        </button>
      </form>
    </div>
  )
}

export default CreateTask;