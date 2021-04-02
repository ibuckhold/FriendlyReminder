import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/list";

function CreateList() {
  const dispatch = useDispatch();
  // const newList = useSelector((state) => state.lists);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.makeList({ userId, title }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });

  };

  return (
    <div className='createListDiv'>
      <div className='createListTitle' align='center' >Sign Up</div>
      <form className='createListForm' onSubmit={handleSubmit} >
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className='titleInput' >
          <input
            placeholder='Title'
            className='title'
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder='UserId'
            className='userid'
            type='integer'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <button className='listBtn' type='submit'>
          Create List
        </button>
      </form>
    </div>
  )
}

export default CreateList;