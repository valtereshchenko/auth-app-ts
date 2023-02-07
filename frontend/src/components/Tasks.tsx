import Task from "./Task";

type TasksProps = {
  tasks: {
    text: string;
  }[];
};
const Tasks = ({ tasks }: TasksProps) => {
  return (
    <>
      {tasks.map((task) => (
        <Task task={task} />
      ))}
    </>
  );
};

export default Tasks;
