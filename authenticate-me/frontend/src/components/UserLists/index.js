import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getList } from '../../store/list';
import TaskList from "../TaskList";
import { getTasks } from "../../store/task";

function ListOfTasks() {
    const dispatch = useDispatch();
    const lists = useSelector(state => Object.values(state.lists));
    console.log(lists);

    const [selectedList, setSelectedList] = useState(1);

    useEffect(() => {
        dispatch(getList());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTasks(selectedList))
    }, [dispatch, selectedList])

    const listElements = () => {
        return lists.map(list => {
            return (
                <option value={list.id} key={list.id}>{list.title}</option>
            )
        })
    }

    if (!lists.length) {
        return (
            <h1>No Lists created yet!</h1>
        )
    }

    return (
        <div>
            <ul>
                <h1>Here are your lists:</h1>
                <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
                    {listElements()}
                </select>
            </ul>
            <TaskList />
        </div>
    )
}

export default ListOfTasks;
