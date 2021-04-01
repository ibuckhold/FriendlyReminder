import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getList } from '../../store/list';

function ListOfTasks() {
    const dispatch = useDispatch();
    const lists = useSelector(state => Object.values(state.lists));
    console.log(lists);

    useEffect(() => {
        dispatch(getList());
    }, [dispatch]);

    const listElements = () => {
        return lists.map(list => {
            return (
                <div key={list.id}>
                    <li>{list.title}</li>
                </div>
            )
        })
    }

    if (!lists.length) {
        return (
            <h1>No Lists created yet!</h1>
        )
    }

    return (
        <ul>
            <h1>Here are your lists:</h1>
            {listElements()}
        </ul>
    )
}

export default ListOfTasks;
