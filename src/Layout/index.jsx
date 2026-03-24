import "../Styles/style.scss";
import Styles from "./style.module.scss";
import {NavBar} from "../Components";
import { Divider } from "@mui/material";
import {Todo} from '../Components';
import {InProgress} from '../Components';
import {InReview} from '../Components';
import {Completed} from '../Components';
import { useDispatch, useSelector } from "react-redux";
import { DndContext } from "@dnd-kit/core";
import { updateTasks } from "../Redux/taskSlice";
import { useState } from "react";

const Layout = () => {

  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  const dragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newColumn = over.id;

    const task = tasks.find((t) => t.id === taskId);

    if (task && task.colmn !== newColumn) {
      dispatch(
        updateTasks({
          ...task,
          colmn: newColumn,
        })
      );
    }
  };

  return (
     <DndContext onDragEnd={dragEnd}>
      {/* App Nav bar */}
        <NavBar search={search} setSearch={setSearch} />
        <Divider />
        {/* Tasks Container */}
        <div className={Styles.taskCont}>
              <div>
                {/* ToDo Tasks */}
              <div>
                <Todo search={search} />
              </div>
              {/* In Progress Tasks */}
              <div>
                <InProgress search={search} />
              </div>
              </div>
              
              <div>
                {/* In Review Tasks */}
              <div>
                <InReview search={search} />
              </div>
              {/* Completed Tasks */}
              <div>
                <Completed search={search} />
              </div>
              </div>
        </div>
    </DndContext>
  )
}

export default Layout;