import { useContext } from "react";
import { MyContext } from "../MyContext";
// import { FaTimes } from "react-icons/fa";

type TaskProps = {
  task: {
    text: string;
  };
};

const Task = ({ task }: TaskProps) => {
  //3. use context
  const user = useContext(MyContext);
  return (
    <div className="task">
      <h3>
        {user} buys {task.text}
        {/* <FaTimes onClick={() => handler(task.id)} /> */}
      </h3>
    </div>
  );
};

export default Task;
