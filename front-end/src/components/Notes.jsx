import React from 'react';
import Note from "./Note.jsx";
import {Grid} from "@mui/material";

function Notes(props) {

    return (
        <div className={"notes-container"}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
            >

            {props.list.map((note) => <Note key={note.id}
                                           setSelectedNote={props.setSelectedNote}
                                           getAllNotes={props.getAllNotes}
                                           note={note}/>)}
            </Grid>
            </div>
    )

}

export default Notes;