import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    HOME_PAGE:"HOME_PAGE",
    USERS_PAGE:"USERS_PAGE",
    ALL_LIST_PAGE:"ALL_LIST_PAGE",
    COMMUNITY_PAGE:"COMMUNITY_PAGE",
    USER_NAME:"USER_NAME",
    LIST_NAME:"LIST_NAME",
    LOG_OUT:"LOG_OUT",
    AFTER_SEARCH:"AFTER_SEARCH_PAGE"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        itemActive: false,
        listMarkedForDeletion: null,
        deleteActive:false,
        deleteName:null,
        homePage:false,
        userPage:false,
        allListPage:false,
        communityPage:false,
        userName:null,
        listName:null,
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.top5List,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    deleteActive:false,
                    deleteName:null,

                    homePage:store.homePage,
                    userPage:store.userPage,
                    allListPage:store.allListPage,
                    communityPage:store.communityPage,
                    userName:store.userName,
                    listName:store.listName,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    deleteActive:false,
                    deleteName:null,

                    homePage:store.homePage,
                    userPage:store.userPage,
                    allListPage:store.allListPage,
                    communityPage:store.communityPage,
                    userName:store.userName,
                    listName:store.listName,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    deleteActive:false,
                    deleteName:null,

                    homePage:store.homePage,
                    userPage:store.userPage,
                    allListPage:store.allListPage,
                    communityPage:store.communityPage,
                    userName:store.userName,
                    listName:store.listName,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    deleteActive:false,
                    deleteName:null,

                    homePage:store.homePage,
                    userPage:store.userPage,
                    allListPage:store.allListPage,
                    communityPage:store.communityPage,
                    userName:store.userName,
                    listName:store.listName,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: payload.listMarkedForDeletion,
                    deleteActive:true,
                    deleteName:payload.deleteName,

                    homePage:store.homePage,
                    userPage:store.userPage,
                    allListPage:store.allListPage,
                    communityPage:store.communityPage,
                    userName:store.userName,
                    listName:store.listName,
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    deleteActive:false,
                    deleteName:null,

                    homePage:store.homePage,
                    userPage:store.userPage,
                    allListPage:store.allListPage,
                    communityPage:store.communityPage,
                    userName:store.userName,
                    listName:store.listName,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    deleteActive:false,
                    deleteName:null,

                    homePage:store.homePage,
                    userPage:store.userPage,
                    allListPage:store.allListPage,
                    communityPage:store.communityPage,
                    userName:store.userName,
                    listName:store.listName,
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: true,
                    listMarkedForDeletion: null,
                    deleteActive:false,
                    deleteName:null,

                    homePage:store.homePage,
                    userPage:store.userPage,
                    allListPage:store.allListPage,
                    communityPage:store.communityPage,
                    userName:store.userName,
                    listName:store.listName,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    deleteActive:false,
                    deleteName:null,

                    homePage:store.homePage,
                    userPage:store.userPage,
                    allListPage:store.allListPage,
                    communityPage:store.communityPage,
                    userName:store.userName,
                    listName:store.listName,
                });
            }

            case GlobalStoreActionType.HOME_PAGE: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    deleteActive:false,
                    deleteName:null,

                    homePage:true,
                    userPage:false,
                    allListPage:false,
                    communityPage:false,
                    userName:null,
                    listName:null,
                });
            }

            case GlobalStoreActionType.USERS_PAGE: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    deleteActive:false,
                    deleteName:null,

                    homePage:false,
                    userPage:true,
                    allListPage:false,
                    communityPage:false,
                    userName:null,
                    listName:"Users List",
                });
            }

            case GlobalStoreActionType.ALL_LIST_PAGE: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    deleteActive:false,
                    deleteName:null,

                    homePage:false,
                    userPage:false,
                    allListPage:true,
                    communityPage:false,
                    userName:null,
                    listName:"All List",
                });
            }

            case GlobalStoreActionType.COMMUNITY_PAGE: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    deleteActive:false,
                    deleteName:null,

                    homePage:false,
                    userPage:false,
                    allListPage:false,
                    communityPage:true,
                    userName:null,
                    listName:"Community List",
                });
            }

            case GlobalStoreActionType.AFTER_SEARCH: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null,
                    deleteActive:false,
                    deleteName:null,

                    homePage:store.homePage,
                    userPage:store.userPage,
                    allListPage:store.allListPage,
                    communityPage:store.communityPage,
                    userName:store.userName,
                    listName:payload.listName,
                });
            }

            case GlobalStoreActionType.LOG_OUT: {
                return setStore({
                    idNamePairs: [],
                    currentList: null,
                    newListCounter: 0,
                    listNameActive: false,
                    itemActive: false,
                    listMarkedForDeletion: null,
                    deleteActive:false,
                    deleteName:null,
                    homePage:false,
                    userPage:false,
                    allListPage:false,
                    communityPage:false,
                    userName:null,
                    listName:null,
                });
            }
            
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs(top5List) {
                        response = await api.getTop5ListPairs(auth.user.email);
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: pairsArray,
                                    top5List: top5List
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = async function () {
        let response = await api.getTop5ListPairs(auth.user.email);
        if (response.data.success) {
            let listArray=response.data.list;
            storeReducer({
                type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
                payload: listArray
            });
        }
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["", "", "", "", ""],
            likes:0,
            dislikes:0,
            views:0,
            author:auth.user.firstName+" "+auth.user.lastName,
            published:"NO",
            ispublished:false,
            comment: [],
            votes: [0,0,0,0,0],
            ownerEmail: auth.user.email
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () {
        let response=null;
        if(!store.homePage||auth.guess){
            response = await api.getAllTop5Lists();
        }else{
            response = await api.getTop5ListPairs(auth.user.email);
        }
        if (response.data.success) {
            let listArray=response.data.list;
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: listArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = async function (id,deleteName) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: {
                    deleteName: deleteName,
                    listMarkedForDeletion: top5List
                }
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadIdNamePairs();
            history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: top5List
            });
        }
    }

    store.moveItem = function (start, end) {
        start -= 1;
        end -= 1;
        if (start < end) {
            let temp = store.currentList.items[start];
            for (let i = start; i < end; i++) {
                store.currentList.items[i] = store.currentList.items[i + 1];
            }
            store.currentList.items[end] = temp;
        }
        else if (start > end) {
            let temp = store.currentList.items[start];
            for (let i = start; i > end; i--) {
                store.currentList.items[i] = store.currentList.items[i - 1];
            }
            store.currentList.items[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }

    store.updateCurrentItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        store.updateCurrentList();
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
        }
        console.log(tps.hasTransactionToUndo());
        console.log(tps.hasTransactionToRedo());
    }

    store.undo = function () {
        tps.undoTransaction();
    }

    store.redo = function () {
        tps.doTransaction();
    }

    store.canUndo = function() {
        return tps.hasTransactionToUndo();
    }

    store.canRedo = function() {
        return tps.hasTransactionToRedo();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: null
        });
    }

    store.isHomePage = async function () {
        let response = await api.getTop5ListPairs(auth.user.email);
        if (response.data.success) {
            let listArray=response.data.list;
            storeReducer({
                type: GlobalStoreActionType.HOME_PAGE,
                payload: listArray
            });
        }
    }

    store.isUserPage = async function () {
        let response = await api.getPublishedTop5List();
        if (response.data.success) {
            let listArray=response.data.list;
            listArray.sort(function(a, b){
                return b.published > a.published
            });
            storeReducer({
                type: GlobalStoreActionType.USERS_PAGE,
                payload: listArray
            });
        }
    }

    store.isAllListPage = async function () {
        let response = await api.getPublishedTop5List();
        if (response.data.success) {
            let listArray=response.data.list;
            listArray.sort(function(a, b){
                return b.published > a.published
            });
            storeReducer({
                type: GlobalStoreActionType.ALL_LIST_PAGE,
                payload: listArray
            });
        }
    }


    store.isCommunityPage = async function () {
        let response = await api.getPublishedTop5List();
        if (response.data.success) {
            let listArray=response.data.list;

            listArray.sort(function(a, b){
                return b.name > a.name
            });
            let preName = ""
            let myMap = new Map();
            let len=listArray.length;
            for(let i=0;i<len;i++){
                if(listArray[i].name === preName){
                    for(let j=0;j<5;j++){
                        let key=listArray[i].items[j];
                        if(myMap.has(key)){
                            myMap.set(key,myMap.get(key)+(5-j));
                        }else{
                            myMap.set(key,5-j);
                        }
                    }
                    listArray[i-1].votes[0]=0;
                    listArray[i-1].votes[1]=0;
                    listArray[i-1].votes[2]=0;
                    listArray[i-1].votes[3]=0;
                    listArray[i-1].votes[4]=0;
                
                }else{
                    if(i !== 0){
                        console.log(i);
                        var arrayObj=Array.from(myMap);
                        arrayObj.sort(function(a,b){return b[1]-a[1]});
                        console.log(i);
                        listArray[i-1].items[0]=arrayObj[0][0];
                        listArray[i-1].votes[0]=arrayObj[0][1];
                        listArray[i-1].items[1]=arrayObj[1][0];
                        listArray[i-1].votes[1]=arrayObj[1][1];
                        listArray[i-1].items[2]=arrayObj[2][0];
                        listArray[i-1].votes[2]=arrayObj[2][1];
                        listArray[i-1].items[3]=arrayObj[3][0];
                        listArray[i-1].votes[3]=arrayObj[3][1];
                        listArray[i-1].items[4]=arrayObj[4][0];
                        listArray[i-1].votes[4]=arrayObj[4][1];
                    }
                    

                    
                    myMap = new Map();
                    for(let j=0;j<5;j++){
                        let key=listArray[i].items[j];
                        myMap.set(key,5-j);
                    }
                    preName=listArray[i].name;
                }
            }
            var arrayObj=Array.from(myMap);
            arrayObj.sort(function(a,b){return b[1]-a[1]});
        

            listArray[len-1].items[0]=arrayObj[0][0];
            listArray[len-1].votes[0]=arrayObj[0][1];
            listArray[len-1].items[1]=arrayObj[1][0];
            listArray[len-1].votes[1]=arrayObj[1][1];
            listArray[len-1].items[2]=arrayObj[2][0];
            listArray[len-1].votes[2]=arrayObj[2][1];
            listArray[len-1].items[3]=arrayObj[3][0];
            listArray[len-1].votes[3]=arrayObj[3][1];
            listArray[len-1].items[4]=arrayObj[4][0];
            listArray[len-1].votes[4]=arrayObj[4][1];

            storeReducer({
                type: GlobalStoreActionType.COMMUNITY_PAGE,
                payload: listArray
            });
        }
    }

    store.updateItem = async function (id,body) {
        const response = await api.updateTop5ListById(id, body);
        if (response.data.success) {
            let listArray=response.data.list;
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: listArray
            });
        }
    }

    store.updatePublishlist = async function (id,body) {
        let response = await api.updateTop5ListById(id, body);
        if (response.data.success) {
            let top5List = response.data.top5List;
            async function getListPairs(top5List) {
                response = await api.getTop5ListPairs(auth.user.email);
                if (response.data.success) {
                    let pairsArray = response.data.list;
                    storeReducer({
                        type: GlobalStoreActionType.CHANGE_LIST_NAME,
                        payload: {
                            idNamePairs: pairsArray,
                            top5List: top5List
                        }
                    });
                }
            }
            getListPairs(top5List);
        }
    }

    store.searchByListOrUserName = async function (name) {
        let response = null;
        if(store.userPage){
            response = await api.getTop5ListByUserName(name);
        }else{
            response = await api.getTop5ListByListName(name);
        }
        if (response.data.success) {
            if(store.userPage||store.allListPage){
                let listArray=response.data.list;
                storeReducer({
                    type: GlobalStoreActionType.AFTER_SEARCH,
                    payload: {
                        idNamePairs:listArray,
                        listName:name
                    }
                });
            }else{
                let listArray=response.data.list;
                if(store.homePage){
                    listArray=listArray.filter(function (item) {
                        return item.ownerEmail===auth.user.email; 
                    });
                    console.log(listArray);
                }
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: listArray
                });
            }
            
        }
        else {
            if(store.userPage||store.allListPage){
                storeReducer({
                    type: GlobalStoreActionType.AFTER_SEARCH,
                    payload: {
                        idNamePairs:null,
                        listName:name
                    }
                });
            }
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    store.publishedTop5List = async function () {
        let response = await api.getPublishedTop5List();
        if (response.data.success) {
            let listArray=response.data.list;
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: listArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }


    store.logOut= async function () {
        storeReducer({
            type: GlobalStoreActionType.LOG_OUT,
            payload: null
        });
    }


    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };