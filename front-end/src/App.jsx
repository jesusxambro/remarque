import {useEffect, useState} from 'react'

import './App.css'
import ResponsiveAppBar from "./components/navigation/ResponsiveAppBar.jsx";
import Splash from "./components/Splash.jsx";
import axios from 'axios';
import Notes from "./components/Notes.jsx";
import AddANote from "./components/AddANote.jsx";
import Note from "./components/Note.jsx";


// {/*<div>*/}
// {/*  <a href="https://vitejs.dev" target="_blank">*/}
// {/*    <img src="/vite.svg" className="logo" alt="Vite logo" />*/}
// {/*  </a>*/}
// {/*  <a href="https://reactjs.org" target="_blank">*/}
// {/*    <img src={reactLogo} className="logo react" alt="React logo" />*/}
// {/*  </a>*/}
// {/*</div>*/}
function App() {
    const [clickedOnNotes, setClickedOnNote] = useState(false);
    const [listOfNotes, setListOfNotes] = useState([]);
    const [status, setStatus] = useState("")
    const [selectedNote, setSelectedNote] = useState({});

    async function getAllNotes() {
        const res = await axios.get("http://localhost:8080/notes/")
        // console.log(res)
        //map over res.data, ensure data type matches
        // let isThisAnArray = Array.isArray(res.data)
        setListOfNotes(res.data)
    }

    useEffect(() => {
        getAllNotes();

    }, [])


    function getCurrentState(){
        // getAllNotes();
        switch (status) {
            case 'notes':
                return(<Notes list={listOfNotes}
                              setSelectedNote={setSelectedNote}
                              getAllNotes={getAllNotes}/>)
            case 'note':
                return (<Note note={selectedNote}/>)
            case 'addnote':
                return (<AddANote
                                 getAllNotes={getAllNotes}
                                 setStatus={setStatus}
                />)
            default:
                return(<Splash />)
        }

    }
    return (
        <div>
            <ResponsiveAppBar setNotes={setClickedOnNote}
                              clickedOnNotes={clickedOnNotes}
                              setStatus={setStatus}
            />
            {/*{clickedOnNotes ?*/}
            {/*    <Notes list={listOfNotes} getAllNotes={getAllNotes}/>*/}
            {/*    :*/}
            {/*    <Splash/>*/}
            {/*}*/}
            {getCurrentState()}


        </div>
    )
}

export default App
