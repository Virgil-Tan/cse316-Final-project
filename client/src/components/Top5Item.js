import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    let {item,index} = props;

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            // store.currentList.items[index]=text;
            store.updateCurrentItem(index,text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let itemElement =
        <Typography
            onClick={handleToggleEdit} 
            id="edit-items-text" 
            style={{fontSize:'34pt'
        }}>{item}</Typography>

    if (editActive) {
        itemElement =
            <div id="edit-items-field">
                <TextField
                    fullWidth
                    size="large"
                    sx={{bgcolor: 'yellow' }}
                    inputProps={{style: {fontSize: 23}}}
                    InputLabelProps={{style: {fontSize: 10}}}
                    onKeyPress={handleKeyPress}
                    onChange={handleUpdateText}
                    defaultValue={item}
                    autoFocus
                />
            </div>
    }

    return (
        itemElement
    )
}

export default Top5Item;