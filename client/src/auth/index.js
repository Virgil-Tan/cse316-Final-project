import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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


const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOG_OUT_USER:"LOG_OUT_USER",
    Guess:"Guess"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        guess:false
    });
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [warning, setwarning] = React.useState("");

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {

            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    guess:false
                });
            }

            case AuthActionType.Guess: {
                return setAuth({
                    user: null,
                    loggedIn: true,
                    guess:true
                })
            }

            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    guess:false
                })
            }

            case AuthActionType.LOG_OUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    guess:false
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
            
        }
    }

    auth.getGuess = async function (store) {
        const response = await api.guess();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.Guess,
                payload: {
                    loggedIn: true,
                    user: null
                }
            });
            store.loadIdNamePairs();
        }
    }

    auth.registerUser = async function(userData, store) {
        console.log("cnm")
        const response = await api.registerUser(userData);      
        if(response.status === 202){
            setwarning(response.data.errorMessage);
            handleOpen();
        }else{
            if (response.status === 200) {
                console.log("cnm")
                history.replace('/login');
                
            }
        }
    }

    auth.loginUser = async function(userData, store) {
        const response = await api.loginUser(userData);
        if(response.status === 202){
            setwarning(response.data.errorMessage);
            handleOpen();
        }else{
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
                store.isHomePage();
            }
        }
    }

    auth.logoutUser = async function(userData, store) {
        const response = await api.logoutUser(userData);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOG_OUT_USER,
                payload: null
            })
            history.push("/");
            //store.loadIdNamePairs();
        }
    }

    const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        {/* ################################### */}
        <Modal
            open={open}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 400 }}>
                <h2 id="parent-modal-title">Warning</h2>
                <Alert severity="warning">{warning}</Alert>
                <Button onClick={handleClose}>Close Child Modal</Button>
            </Box>
        </Modal>
        {/* ################################### */}
        </AuthContext.Provider>
        
    );
}

export default AuthContext;
export { AuthContextProvider };