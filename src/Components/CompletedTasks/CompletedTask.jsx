import Styles from "./style.module.scss";
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import { HiDotsHorizontal } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { RiEditFill } from "react-icons/ri";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import Chip from '@mui/material/Chip';
import { useState } from "react";
import { remvTask, updateTasks } from "../../ReduxContainer/taskSlice";
import { useDispatch } from "react-redux";
import { useDraggable } from "@dnd-kit/core";
import { RiDragMove2Line } from "react-icons/ri";

/* taskTitle_Field */
const TaskTitleField = styled(TextField)({
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
const TaskInfoField = styled(TextField)({
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

/* Task Priority - High */
function High(){
  return <Chip 
                sx={{
                  background:"#f0d2d2",
                  color: '#d05955',
                  fontWeight:"700",
                  fontFamily: "monospace",
                  fontSize:"14px",
                  textTransform:"uppercase",
                  borderRadius: "10px"
                }}
                label="high" />
}

/* Task Priority - Medium */
function Medium(){
  return <Chip 
                sx={{
                  background:"#f5e6d2",
                  color: '#de994d',
                  fontWeight:"700",
                  fontFamily: "monospace",
                  fontSize:"14px",
                  textTransform:"uppercase",
                  borderRadius: "10px"
                }}
                label="medium" />
}

/* Task Priority - Low */
function Low(){
  return <Chip 
                sx={{
                  background:"#cfcfcf",
                  color: '#707780',
                  fontWeight:"700",
                  fontFamily: "monospace",
                  fontSize:"14px",
                  textTransform:"uppercase",
                  borderRadius: "10px"
                }}
                label="low" />
}

const CompletedTask = ({task}) => {

/* task inputs state */
const [tskTitle, setTskTitle] = useState(task.title);
const [tskInfo, setTskInfo] = useState(task.description);

/* toggle show inputs state */
const [shEdit, setEdit] = useState(false);
/* toggle show task actions */
const [anchorEl, setAnchorEl] = useState(null);

/* Open Task Action */
const Open = Boolean(anchorEl);
const id = Open ? 'simple-popover' : undefined;

  const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
  
  /* Close Task Action */
  const handleClose = () => {
        setAnchorEl(null);
      };
      
  /* show task inputs */
  const onEdit = () => {
    setEdit(true);
  }

  /* update tasks */
  const onUpdate = () => {
    dispatch(updateTasks({
      id: task.id,
      title: tskTitle,
      description: tskInfo,
      priority: task.priority,
      column: task.column
    }));
    setEdit(false);
  }

const dispatch = useDispatch();

const { attributes, listeners, setNodeRef, transform } = useDraggable({
  id: task.id,
});

const style = {
  transform: transform
    ? `translate(${transform.x}px, ${transform.y}px)`
    : undefined,
};

  return (
    <div ref={setNodeRef} style={style}>
          <div className={Styles.taskCard} style={{position: "relative"}}>
            <div>
              <div className={Styles.taskTitle}>
                {shEdit ? (<div style={{width:"100%"}}>
          <TaskTitleField
            fullWidth
            value={tskTitle}
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
                onChange={(e) => setTskTitle(e.target.value)}
                type="text"
                />
          </div>) : (<h4>{`${tskTitle}`}</h4>)}
              </div>
              <div className={Styles.taskDesc}>
                {shEdit ? (
                  <div style={{width:"100%"}}>
          <TaskInfoField
            fullWidth
            value={tskInfo}
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
                '&::placeholder': {
                        color: '#000',
                        opacity: 1
                      }
                },
                }}
                placeholder={"Task Description"}
                onChange={(e) => setTskInfo(e.target.value)}
                type="text"
                />
          </div>
                ) : (<p>{`${tskInfo}`}</p>)}
              </div>
              <div className={Styles.taskFooter}>
                {/* Task Priority */}
              <div>
                {(task.priority === "Medium") ? (<Medium />) : ("")}
                {(task.priority === "Low") ? (<Low />) : ("")}
                {(task.priority === "High") ? (<High />) : ("")}
              </div>
              {/* Update Task */}
              <div>
                {shEdit? (
                  <Button
                  disableRipple={true} 
                  startIcon={<RxUpdate style={{fontSize:"12px", color:"#000"}} />}
                  sx={{
                      background:"#E0E0E0",
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: "12px",
                      textTransform: "capitalize",
                      '&:hover':{
                          background:"#E0E0E0"
                      }
                  }}
                  onClick={() => onUpdate()}
                  >
                      Update
                  </Button>
                ) : ("")}
              </div>
              </div>
            </div>
            {/* Task Action */}
            <div style={{position:"relative", zIndex:"1000"}}>
              <IconButton
              aria-describedby={id}
              onClick={handleClick}
              size="small"
              disableRipple={true}
              sx={{
                zIndex: 1000,
              }}
              >
              <HiDotsHorizontal className="text-dotbg text-2xl font-bold" />
              <div
              {...listeners}
              {...attributes}
              style={{ cursor: "grab", marginLeft:"1em" }}
              >
                <RiDragMove2Line />
              </div>
              </IconButton>
              <Popover
                id={id}
                open={Open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
                }}
                sx={{
                    '& .MuiPopover-paper': {
                      backgroundColor: '#E0E0E0',
                      zIndex: 1100,
                      position: 'absolute'
                    },
                  }}
                >
            <div className={Styles.actionBtns}>
            {/* Edit Button */}
            <Button
            disableRipple={true} 
            startIcon={<RiEditFill style={{fontSize:"14px", color:"#000"}} />}
            sx={{
                background:"#E0E0E0",
                color: "#000",
                fontWeight: "bold",
                fontSize: "14px",
                textTransform: "capitalize",
                '&:hover':{
                    background:"#E0E0E0"
                }
            }}
            onClick={() => onEdit()}
            >
                Edit
            </Button>
            <hr />
            {/* Delete Button */}
            <Button
            disableRipple={true} 
            startIcon={<MdDelete style={{fontSize:"14px", color:"#d05955"}} />}
            sx={{
                background:"#E0E0E0",
                color: "#d05955",
                fontWeight: "bold",
                fontSize: "14px",
                textTransform: "capitalize",
                '&:hover':{
                    background:"#E0E0E0"
                }
            }}
            onClick={() => dispatch(remvTask(task.id))}
            >
                Delete
            </Button>
            </div>
        </Popover>
            </div>
          </div>
      </div>
  )
}

export default CompletedTask;