import React, { useContext, useEffect ,useState} from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import ListCard from './ListCard.js'
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import FunctionsIcon from '@mui/icons-material/Functions';
import HomeIcon from '@mui/icons-material/Home';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Top5Item from './Top5Item.js'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isMenuOpen, setisMenuOpen] = useState(false);
    const [isChanged, setisChanged] = useState(false);
    const [text, setText] = useState("");
    const [nameText, setNameText] = useState("");
    const divRef = React.useRef();
    const handleSortByNewDate = () => {
        let arr=store.idNamePairs;
        arr.sort(function(a, b){
            return a.published > b.published
        });
        handleMenuClose();
    };

    const handleSortByOldDate = () => {
        let arr=store.idNamePairs;
        arr.sort(function(a, b){return b.published > a.published});
        handleMenuClose();
    };

    const handleSortByViews = () => {
        let arr=store.idNamePairs;
        arr.sort(function(a, b){return b.views - a.views});
        handleMenuClose();
    };

    const handleSortByLikes = () => {
        let arr=store.idNamePairs;
        arr.sort(function(a, b){return b.likes - a.likes});
        handleMenuClose();
    };

    const handleSortByDislikes = () => {
        let arr=store.idNamePairs;
        arr.sort(function(a, b){return b.dislikes - a.dislikes});
        handleMenuClose();
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setisMenuOpen(false);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(divRef.current);
        setisMenuOpen(true);
    };

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleHome() {
        store.isHomePage();
    }

    function handleUser() {
        store.isUserPage();
    }

    function handleList() {
        store.isAllListPage();
    }

    function handleComunity() {
        store.isCommunityPage();
    }

    function handleClose(){
        store.unmarkListForDeletion();
    };

    function DeleteList(){
        store.deleteMarkedList();
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.searchByListOrUserName(text);
            setText("");
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleCloseEdit() {
        store.closeCurrentList();
    }

    function handleChangeName(event) {
        if (event.code === "Enter"&&isChanged) {
            store.currentList.name=nameText;
            // store.updateItem(store.currentList._id,store.currentList);
            store.updateCurrentList();
            setisChanged(false);
        }
    }

    function handleUpdateName(event) {
        setisChanged(true);
        setNameText(event.target.value);
    }

    function handleCanPublish() {
        var myDate = new Date();
        let date = myDate.toLocaleDateString();
        store.currentList.published=date;
        store.currentList.ispublished=true;
        store.updatePublishlist(store.currentList._id,store.currentList);
        handleCloseEdit();
    }

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#bbbbbb' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            
            </List>;
    }

    const theme = createTheme({
        palette: {
          neutral: {
            main: '#bbbbbb',
            contrastText: 'black',
          },
        },
    });

    let editItems = "";
    if (store.currentList) {
        editItems = 
            store.currentList.items.map((item, index) => (
                <Top5Item 
                    key={'top5-item-' + (index+1)}
                    item={item}
                    index={index}
                />
                
        ))
        
    }

    if(store.currentList){
        let canPublish=store.currentList.items[0] !== ""&&store.currentList.items[1] !== ""&&store.currentList.items[2] !== ""&&store.currentList.items[3] !== ""&&store.currentList.items[4] !== ""
        listCard=
            <div id="workspace-edit">
                <div className="list-name">
                    <TextField
                            fullWidth
                            size="small"
                            sx={{bgcolor: 'background.paper' }}
                            inputProps={{style: {fontSize: 10}}}
                            InputLabelProps={{style: {fontSize: 10}}}
                            onKeyPress={handleChangeName}
                            onChange={handleUpdateName}
                            defaultValue={store.currentList.name}
                    />
                </div>
                
                <div id="work-edit">
                    <div id="edit-list">
                        <div className="edit-item-number"><Typography variant="h3">1.</Typography></div>
                        <div className="edit-item-number"><Typography variant="h3">2.</Typography></div>
                        <div className="edit-item-number"><Typography variant="h3">3.</Typography></div>
                        <div className="edit-item-number"><Typography variant="h3">4.</Typography></div>
                        <div className="edit-item-number"><Typography variant="h3">5.</Typography></div>
                    </div>
                    {
                        editItems
                    }
                </div>

                <div id="edit-save-button">
                    <ThemeProvider theme={theme}>
                        <Box sx={{ p: 1, flexGrow: 1 }}>
                            <Button 
                                onClick={handleCloseEdit} 
                                color="neutral" 
                                size="large" 
                                variant="contained"
                            >
                                Save</Button>
                        </Box>
                    </ThemeProvider>
                </div>
                <div id="edit-publish-button">
                    <ThemeProvider theme={theme}>
                        <Box sx={{ p: 1, flexGrow: 1 }}>
                            <Button 
                                disabled={!canPublish}
                                onClick={handleCanPublish} 
                                color="neutral" 
                                size="large" 
                                variant="contained"
                            >
                                Publish</Button>
                        </Box>
                    </ThemeProvider>
                </div>
            </div>
    }
    return (
        <div id="top5-list-selector">
            <div id="top-button" position="static" sx={{ flexGrow: 1 }}>
                <IconButton
                    size="large"
                    color="inherit"
                    disabled={auth.guess}
                    id="left-button"
                    onClick={handleHome}
                >
                    <HomeIcon />
                </IconButton>
                <IconButton 
                    size="large"
                    color="inherit"
                    id="left-button"
                    onClick={handleList}
                >
                    <PeopleOutlineIcon />
                </IconButton>
                <IconButton 
                    size="large"
                    color="inherit"
                    id="left-button"
                    onClick={handleUser}
                >
                    <PermIdentityIcon />
                </IconButton>
                <IconButton 
                    size="large"
                    color="inherit"
                    id="left-button"
                    onClick={handleComunity}
                >
                    <FunctionsIcon />
                </IconButton>

                <TextField
                    sx={{bgcolor: 'background.paper' }}
                    className='search'
                    inputProps={{style: {fontSize: 20}}}
                    InputLabelProps={{style: {fontSize: 15}}}
                    onKeyPress={handleKeyPress}
                    onChange={handleUpdateText}
                    value={text}
                    placeholder="Search"
                />

                <IconButton 
                    ref={divRef}
                    size="large"
                    color="inherit"
                    id="right-button"
                    onClick={handleProfileMenuOpen}
                >
                    <SortIcon />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleSortByNewDate}>Publish Date(Newest)</MenuItem>
                    <MenuItem onClick={handleSortByOldDate}>Publish Date(Oldest)</MenuItem>
                    <MenuItem onClick={handleSortByViews}>Views</MenuItem>
                    <MenuItem onClick={handleSortByLikes}>Likes</MenuItem>
                    <MenuItem onClick={handleSortByDislikes}>Dislikes</MenuItem>
                </Menu>

                <Box id="right-text">SORT BY</Box>

            </div>

            <div id="list-selector-list">
                {
                    listCard
                }
            </div>

            <Modal
                open={store.deleteActive}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">Warning</h2>
                    <Alert severity="warning">Do you want to delete {store.deleteName}</Alert>
                    <Button onClick={DeleteList}>YES</Button>
                    <Button onClick={handleClose}>NO</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default HomeScreen;