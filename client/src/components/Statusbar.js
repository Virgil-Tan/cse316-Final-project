import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material'
import AuthContext from '../auth'
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/

function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    function handleCreateNewList() {
        store.createNewList();
    }
    if(auth.loggedIn){
        if (store.currentList){
            return (
                <div id="top5-statusbar">
                    <Typography variant="h4">{store.currentList.name}</Typography>
                </div>
            );
        }else if(store.homePage){
            return (
                <div id="top5-statusbar">
                <Fab 
                    aria-label="add"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                    <Typography variant="h2">Your Lists</Typography>
                </div> 
            );
        }else{
            return(
                <div id="top5-statusbar">
                    <Typography variant="h4">{store.listName}</Typography>
                </div>
            );
        }
    }else {
        return(
            <div>
            </div>
        );
    }
}

export default Statusbar;