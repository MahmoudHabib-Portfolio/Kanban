import Styles from "./style.module.scss";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { IoGridOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

function AppTitle(){
  return(
    <span className={Styles.mHead}>kanban board</span>
  )
}

function TaskBar(){
  return(
    <span className={Styles.taskBar}>{10} tasks</span>
  )
}

/* search_Field */
const SearchField = styled(TextField)({
  '& .MuiInput-underline:after': {
    borderBottomColor: '#e6e6eb',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: "8px"
    },
    '&:hover fieldset': {
      borderColor: '#e6e6eb',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#e6e6eb',
      borderWidth: '0rem'
    }
  },
});

const NavBar = ({search, setSearch}) => {


  return (
    <nav className={Styles.mNav}>
      {/* App Logo */}
      <div>
        <ListItem style={{padding: "0px"}}>
        <ListItemAvatar style={{
           fontSize:"1.5em",
           minWidth:"35px",
           textAlign: "center",
           background:"#3c64d7",
           color: "#fff",
           padding:"0.4em 0.5em 0.3em 0.5em",
           borderRadius:"25%",
           marginRight:"0.5em"}}>
          <IoGridOutline />
        </ListItemAvatar>
        <ListItemText primary={<AppTitle />} secondary={<TaskBar />} />
      </ListItem>
      </div>
      {/* Search Bar */}
      <div className={Styles.searchBox}>
        {/* search_Icon */}
          <div style={{color:"#626a75", fontSize:"18px", lineHeight:"40px"}}>
            <FiSearch />
          </div>
          {/* Search_Field */}
          <div style={{width:"100%"}}>
          <SearchField
            fullWidth
            value={search}
            sx={{
                "& .MuiOutlinedInput-root":{
                "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "0rem",
                    borderStyle: "solid",
                    borderColor: '#e6e6eb',
                    borderRadius: "8px"
                },
                '&.Mui-focused fieldset': {
                    borderColor: "#e6e6eb"
                },
                }
            }}
            inputProps={{
                sx: {
                color: '#7C7C8D',
                fontSize: '14px',
                fontWeight: '600',
                backgroundColor:'#e6e6eb',
                padding:'8px 6px',
                borderRadius: "8px",
                '&::placeholder': {
                        color: '#7C7C8D',
                        opacity: 1
                      }
                },
                }}
                placeholder={"Search Tasks..."}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                />
          </div>
        </div>
    </nav>
  )
}

export default NavBar;