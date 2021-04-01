import { useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { getTasks } from '../../store/task';

function TaskList() {
    // const dispatch = useDispatch();
    const tasks = useSelector(state => Object.values(state.tasks));
    console.log(tasks);

    // useEffect(() => {
    //     dispatch(getTasks());
    // }, [dispatch]);

    const renderTasks = () => {
        return tasks.map(task => {
            return (
                <div key={task.id}>
                    <li>{task.body}</li>
                </div>
            )
        })
    }
    if (!tasks.length) {
        return (
            <h1>No tasks created yet!</h1>
        )
    }

    return (
        <ul>
            <h1>Here are your tasks:</h1>
            {renderTasks()}
        </ul>
    )
}

export default TaskList;
