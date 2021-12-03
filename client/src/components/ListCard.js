import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import AuthContext from '../auth';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [expandActive, setExpandActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;

    function handleLoadList(event, id) {
        event.stopPropagation();
        if (!event.target.disabled) {
            store.setCurrentList(id);
        }
    }

    function handleToggleExapand(event) {
        event.stopPropagation();
        toggleExapand();
    }

    function toggleExapand() {
        let newActive = !expandActive;
        if (newActive) {
            let num=idNamePair.views;
            idNamePair.views=num+1;
            store.updateItem(idNamePair._id,idNamePair);
            store.setIsListNameEditActive();
        }
        setExpandActive(newActive);
    }

    function handLikes() {

        let num=idNamePair.likes;
        idNamePair.likes=num+1;
        
        store.updateItem(idNamePair._id,idNamePair);
        
    }

    function handDislikes() {
        let num=idNamePair.dislikes;
        idNamePair.dislikes=num+1;
        
        store.updateItem(idNamePair._id,idNamePair);
        
    }

    function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id,idNamePair.name);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            
            let comment=idNamePair.comment;
            
            comment.push(text);
            idNamePair.comment=comment;
           
            store.updateItem(idNamePair._id,idNamePair);
            setText("");
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let dateOrEdit= <Box sx={{ p: 1, flexGrow: 1 }}>
                        <Typography style={{fontSize:'8pt'}}>{"Published:"+idNamePair.published}</Typography>
                    </Box>

    if(store.homePage&&!auth.guess&&!idNamePair.ispublished){
        dateOrEdit = <Button onClick={(event) => {
            handleLoadList(event, idNamePair._id)
        }}>Edit</Button>
    }

    let voteOne = <div></div>
    if(store.communityPage){
        voteOne=<div className="item-vote">{"("+idNamePair.votes[0]+" Votes)"}</div>
    }

    let voteTwo = <div></div>
    if(store.communityPage){
        voteTwo=<div className="item-vote">{"("+idNamePair.votes[1]+" Votes)"}</div>
    }

    let voteThree = <div></div>
    if(store.communityPage){
        voteThree=<div className="item-vote">{"("+idNamePair.votes[2]+" Votes)"}</div>
    }

    let voteFour = <div></div>
    if(store.communityPage){
        voteFour=<div className="item-vote">{"("+idNamePair.votes[3]+" Votes)"}</div>
    }

    let voteFive = <div></div>
    if(store.communityPage){
        voteFive=<div className="item-vote">{"("+idNamePair.votes[4]+" Votes)"}</div>
    }

    let deleteButton = <div></div>
    if(store.homePage){
        deleteButton=<IconButton onClick={(event) => {
            handleDeleteList(event, idNamePair._id)
        }} aria-label='delete'>
            <DeleteIcon style={{fontSize:'20pt'}} />
        </IconButton>
    }


    let cardElement =
        <ListItem
            className="listItem"
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '5px', display: 'flex', p: 1 ,border: 2,borderRadius: 5,bgcolor: 'background.paper'}}
            style={{
                height: '120px',
                width: '100%'
            }}
        >
                <div id="left-item-button">
                    <Box sx={{ p: 1, flexGrow: 1 }}>
                        <Typography style={{fontSize:'15pt'}}>{idNamePair.name}</Typography>
                        <Typography style={{fontSize:'8pt'}}>{"By: "+idNamePair.author}</Typography>
                    </Box>
                </div>
                <div id="right-item-button">
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={handLikes} aria-label='like'>
                            <ThumbUpIcon style={{fontSize:'20pt'}} />
                            <Typography style={{fontSize:'10pt'}}>{idNamePair.likes}</Typography>
                        </IconButton>

                        <IconButton onClick={handDislikes} aria-label='dislike'>
                            <ThumbDownIcon style={{fontSize:'20pt'}} />
                            <Typography style={{fontSize:'10pt'}}>{idNamePair.dislikes}</Typography>
                        </IconButton>
                        {deleteButton}
                        
                    </Box>
                </div>
                <div id="leftDown-item-text">
                    {dateOrEdit}          
                </div>
                <div id="rightDown-item-text">
                    <Box sx={{ p: 1, flexGrow: 1 }}>
                        <Typography style={{fontSize:'8pt'}}>{"Views:"+idNamePair.views}</Typography>
                    </Box>
                </div>
                <div id="rightDown-item-samll-button">
                    <Box sx={{ p: 1, flexGrow: 1 }}>
                    <IconButton onClick={(event) => {
                            handleToggleExapand(event, idNamePair._id)
                        }} aria-label='delete'>
                            <ExpandMoreIcon style={{fontSize:'20pt'}} />
                    </IconButton>
                    </Box>
                </div>
        </ListItem>

    if (expandActive) {
        cardElement =
        <ListItem
            className="listItem"
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '5px', display: 'flex', p: 1 ,border: 2,borderRadius: 5,bgcolor: 'background.paper'}}
            style={{
                height: '400px',
                width: '100%'
            }}
        >
                <div id="left-item-button">
                    <Box sx={{ p: 1, flexGrow: 1 }}>
                        <Typography style={{fontSize:'15pt'}}>{idNamePair.name}</Typography>
                        <Typography style={{fontSize:'8pt'}}>{"By: "+idNamePair.author}</Typography>
                    </Box>
                </div>
                <div id="right-item-button">
                    <Box sx={{ p: 1 }}>
                        <IconButton onClick={handLikes} aria-label='like'>
                            <ThumbUpIcon style={{fontSize:'20pt'}} />
                            <Typography style={{fontSize:'10pt'}}>{idNamePair.likes}</Typography>
                        </IconButton>

                        <IconButton onClick={handDislikes} aria-label='dislike'>
                            <ThumbDownIcon style={{fontSize:'20pt'}} />
                            <Typography style={{fontSize:'10pt'}}>{idNamePair.dislikes}</Typography>
                        </IconButton>
                
                        {deleteButton}
                    </Box>
                </div>
                <div id="edit-numbering">
                    <Typography className="item-number">
                        <div className="item-text">
                            {"1."+idNamePair.items[0]}
                            {voteOne}
                        </div>
                    </Typography>
                    <Typography className="item-number">
                        <div className="item-text">
                            {"2."+idNamePair.items[1]}
                            {voteTwo}
                        </div>
                    </Typography>
                    <Typography className="item-number">
                        <div className="item-text">
                            {"3."+idNamePair.items[2]}
                            {voteThree}
                        </div>
                    </Typography>
                    <Typography className="item-number">
                        <div className="item-text">
                            {"4."+idNamePair.items[3]}
                            {voteFour}
                        </div>
                    </Typography>
                    <Typography className="item-number">
                        <div className="item-text">
                            {"5."+idNamePair.items[4]}
                            {voteFive}
                        </div>
                    </Typography>
                </div>
                
                <List id="comment">
                    {
                        idNamePair.comment.map((pair) => (
                            <ListItem className="item-comment" >
                            <Typography className="comment-text" variant="h6">{pair}</Typography>
                            </ListItem>
                        ))
                    }
                </List>

                <div id='add-comment'>
                    <TextField
                        fullWidth
                        sx={{bgcolor: 'background.paper' }}
                        inputProps={{style: {fontSize: 9}}}
                        InputLabelProps={{style: {fontSize: 30}}}
                        onKeyPress={handleKeyPress}
                        onChange={handleUpdateText}
                        value={text}
                        placeholder="Add Comment"
                    />
                </div>

                <div id="leftDown-item-text">
                    <Box sx={{ p: 1, flexGrow: 1 }}>
                        <Typography style={{fontSize:'10pt'}}>{"Published:"+idNamePair.published}</Typography>
                    </Box>
                </div>

                <div id="rightDown-item-text">
                    <Box sx={{ p: 1, flexGrow: 1 }}>
                        <Typography style={{fontSize:'10pt'}}>{"Views:"+idNamePair.views}</Typography>
                    </Box>
                </div>
                <div id="rightDown-item-button">
                    <Box sx={{ p: 1, flexGrow: 1 }}>
                    <IconButton onClick={(event) => {
                            handleToggleExapand(event, idNamePair._id)
                        }} aria-label='delete'>
                            <ExpandLessIcon style={{fontSize:'20pt'}} />
                        </IconButton>
                    </Box>
                </div>
                </ListItem>
    }

    if(!idNamePair.ispublished){
        if(store.userPage||store.allListPage||store.communityPage||auth.guess){
            cardElement=null;
        }
    }
    
    return (
        cardElement
    );
}

export default ListCard;