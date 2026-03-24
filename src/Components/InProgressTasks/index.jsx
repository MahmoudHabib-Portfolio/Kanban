import Styles from './style.module.scss';
import Chip from '@mui/material/Chip';
import { useState, useEffect } from 'react';
import { GoDotFill } from "react-icons/go";
import { Button } from "@mui/material";
import { MdAddTask } from "react-icons/md";
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from "@mui/material/styles";
import { addTask } from '../../Redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import {fetchTasks} from "../../Redux/taskSlice";
import InProgTasks from './InProgTasks';
import { useDroppable } from '@dnd-kit/core';

/* taskTitle_Field */
const TskTitle = styled(TextField)({
  '& .MuiInput-underline:after': {
    borderBottomColor: '#000',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: "8px"
    },
    '&:hover fieldset': {
      borderColor: '#000',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000',
      borderWidth: '1px'
    }
  },
});

/* taskInfo_Field */
const TskInfo = styled(TextField)({
  '& .MuiInput-underline:after': {
    borderBottomColor: '#000',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: "8px"
    },
    '&:hover fieldset': {
      borderColor: '#000',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000',
      borderWidth: '1px'
    }
  },
});

/* Add Task Modal Style */
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35%',
  bgcolor: '#fff',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius: 2,
  p: 1,
};

const InProgress = ({search = ""}) => {

  /* Add task title & info states */
  const [title, setTaskTitle] = useState("");
  const [description, setTaskInfo] = useState("");
  /* Task_priority_state */
  const [priority, setTaskPriot] = useState("");
  /* Task_Column */
  const [colmn, setColumn] = useState("");

  /* open modal toggle */
  const [open, setOpen] = useState(false);

  /* open & close model handlers */
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const dispatch = useDispatch();

  /* fetch_Tasks */
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  /* tasks_State */
  const {tasks, loading, error} = useSelector((state) => state.tasks);

  /* getting tasks count */
  const progTasks = tasks.filter((t) => {
  const matchesColumn = t.colmn === "inProgress";

  const matchesSearch =
    search.trim() === "" ||
    t.title?.toLowerCase().includes(search.toLowerCase()) ||
    t.description?.toLowerCase().includes(search.toLowerCase());

  return matchesColumn && matchesSearch;
});

  const progtaskLength = progTasks.length;

  /* Submit Task */
  const submitTask = (e) => {
    e.preventDefault();

    dispatch(addTask({title, description, priority, colmn}));

    /* Reset_task_Fields */
    setTaskTitle("");
    setTaskInfo("");
    setTaskPriot("");
    setColumn("");
    /* close_task_modal */
    closeModal();
  }

  // MUST match column name
  const { setNodeRef } = useDroppable({
    id: "inProgress",
  });

  return (
    <div ref={setNodeRef} className={Styles.todoCont}>
      {/* Task Head */}
      <div>
        {/* Task Title */}
        <div>
          <Chip
         sx={{
          background:"none"
         }} 
         icon={<GoDotFill style={{color:"#de994d", fontSize:"1.6em"}}/>}
         label={<span className={Styles.todo}>In Progress</span>}
         />
        </div>
        {/* Tasks Count */}
        <div className={Styles.taskCount}>
          {progtaskLength}
        </div>
      </div>
      {/* Task Body */}
      {progTasks?.map((task) => (
        <InProgTasks key={task.id} task={task} />
      ))}

      {/* Add Task Input */}
         <div>
            <Button
            fullWidth
            sx={{
              width:"100%",
              color: "#757d86",
              textTransform: "capitalize",
              fontWeight:"600",
              border:"1px dashed #979797"
            }}
            onClick={() => openModal()}
            >
              + Add Task
            </Button>
         </div>
         {/* Add Task Modal */}
         <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <div className={Styles.addTask}>
            {/* Add task Head */}
            <div>
                <Chip
                  sx={{
                    background:"none"
                  }} 
                  icon={<MdAddTask style={{color:"#419673", fontSize:"2em"}}/>}
                  label={<span className={Styles.taskHead}>Add New Task</span>}
                  />
            </div>
            {/* Add task Body */}
            <div>
              <form onSubmit={submitTask}>
                <div className={Styles.taskBody}>
                  {/* task_title_Head */}
                  <div style={{width:"100%"}}>
                    
                  <TskTitle
                    fullWidth
                    value={title}
                    sx={{
                        "& .MuiOutlinedInput-root":{
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: '#000',
                            borderRadius: "8px"
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: "#000"
                        },
                        }
                    }}
                    inputProps={{
                        sx: {
                        color: '#000',
                        fontSize: '14px',
                        fontWeight: '600',
                        backgroundColor:'none',
                        padding:'8px 6px',
                        borderRadius: "8px",
                        borderColor: "#000",
                        '&::placeholder': {
                                color: '#000',
                                opacity: 1
                              }
                        },
                        }}
                        placeholder={"Task Title"}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        type="text"
                        required
                        />
          
                  </div>
                  {/* task_Description */}
                  <div style={{width:"100%"}}>
                    <TskInfo
                    fullWidth
                    value={description}
                    sx={{
                        "& .MuiOutlinedInput-root":{
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: '#000',
                            borderRadius: "8px"
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: "#000"
                        },
                        }
                    }}
                    inputProps={{
                        sx: {
                        color: '#000',
                        fontSize: '14px',
                        fontWeight: '600',
                        backgroundColor:'none',
                        padding:'8px 6px',
                        borderRadius: "8px",
                        borderColor: "#000",
                        '&::placeholder': {
                                color: '#000',
                                opacity: 1
                              }
                        },
                        }}
                        placeholder={"Task Info"}
                        onChange={(e) => setTaskInfo(e.target.value)}
                        type="text"
                        required
                        />
                  </div>
                  {/* column_select */}
                  <div style={{width:"100%"}}>
                    <span className={Styles.taskTitle}><b>Task Status</b></span>
                    <br />
                      <Select
                      value={colmn}
                      onChange={(e) => setColumn(e.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      MenuProps={{
                        PaperProps:{
                          sx:{
                            backgroundColor: '#fff',
                          }
                        }
                      }}
                      sx={{
                          fontSize: "15px",
                          padding: 0,
                          width:"100%",
                          color: "#000",
                          borderRadius: "12px",
                          fontWeight:"600",
                          background: "none",
                          letterSpacing: "1px",
                          '& .MuiSelect-select': {
                              padding: '6px 12px',
                              background: "#fff"
                          },
                          '& .MuiSelect-icon': {
                              color: '#000',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: '0px !important'
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            border: '0px !important'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: '0px !important'
                          }
                      }}
                      variant="outlined"
                      required
                      >
                      <MenuItem value={"todo"}>
                        <span style={{color:"#000"}}>todo</span>
                      </MenuItem>
                      <MenuItem value="inProgress">
                      <span style={{color:"#000"}}>inProgress</span>
                      </MenuItem>
                      <MenuItem value="inReview">
                        <span style={{color:"#000"}}>inReview</span>
                      </MenuItem>
                      <MenuItem value="completed">
                        <span style={{color:"#000"}}>completed</span>
                      </MenuItem>
                      </Select>
                  </div>
                  <hr />
                  {/* task_Priority_select */}
                  <div style={{width:"100%"}}>
                    <span className={Styles.taskTitle}><b>Task Priority</b></span>
                    <br />
                      <Select
                      value={priority}
                      onChange={(e) => setTaskPriot(e.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      MenuProps={{
                        PaperProps:{
                          sx:{
                            backgroundColor: '#fff',
                          }
                        }
                      }}
                      sx={{
                          fontSize: "15px",
                          padding: 0,
                          width:"100%",
                          color: "#000",
                          borderRadius: "12px",
                          fontWeight:"600",
                          background: "none",
                          letterSpacing: "1px",
                          '& .MuiSelect-select': {
                              padding: '6px 12px',
                              background: "#fff"
                          },
                          '& .MuiSelect-icon': {
                              color: '#000',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: '0px !important'
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            border: '0px !important'
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: '0px !important'
                          }
                      }}
                      variant="outlined"
                      required
                      >
                      <MenuItem value={"Low"}>
                        <span style={{color:"#707780"}}>Low</span>
                      </MenuItem>
                      <MenuItem value="Medium">
                      <span style={{color:"orange"}}>Medium</span>
                      </MenuItem>
                      <MenuItem value="High">
                        <span style={{color:"red"}}>High</span>
                      </MenuItem>
                      </Select>
                  </div>
                  <hr />
                  {/* task_Button_Submit */}
                  <div style={{width:"100%"}}>
                    <Button
                    fullWidth
                    sx={{
                      width:"100%",
                      color: "#fff",
                      textTransform: "capitalize",
                      background:"#419673",
                      fontWeight:"600",
                      border:"1px dashed #979797",
                      '&:hover':{
                        background:"#419673",
                      }
                    }}
                    type="submit"
                    >
                      + Add Task
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default InProgress;