import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/list";

function CreateList() {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const currUserId = useSelector(state => state.session.user.id)


  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.makeList({ userId: currUserId, title }))
      .then(() => {
        history.push('/me');
      })
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
        <button className='listBtn' type='submit'>
          Create List
        </button>
      </form>
    </div>
  )
}

export default CreateList;