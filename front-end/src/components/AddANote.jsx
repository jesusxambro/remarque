import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {Card, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

function AddANote(props) {
    const [value, setValue] = useState('');
    const [newTitle, setNewTitle] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const myComponentStyle = {
        color: 'blue',
        lineHeight: 10,
        padding: '1.5em',
    }

    async function onAddSubmit() {
        try {
            if(value !== "" && newTitle !== ""){

                const res = await axios.post("http://localhost:8080/notes/", {
                    content: value,
                    title: newTitle
                })
                if (res.status != 200) {
                  console.log(res)
                } else {
                    setNewTitle("");
                    setValue("");
                    props.getAllNotes();
                    props.setStatus("");
                }
            }else{

            }
        } catch (e) {
            console.log(e)
        }


    }

    return (
        <div style={{paddingTop: 3}}>
            <Card id={"addNoteContainer"}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                    id={"addCard"}
                >

                    <TextField id="outlined-basic"
                               label="Title"
                               required={true}
                               value={newTitle}
                               onChange={(event) => {
                                   setNewTitle(event.target.value)
                               }}
                               variant="outlined"/>

                    <TextField
                        id="outlined-multiline-static"
                        label="Note Content"
                        multiline
                        rows={4}
                        required={true}
                        value={value}
                        onChange={(event) => {
                            setValue(event.target.value)
                        }}
                    />
                    <Button variant="contained"
                            onClick={onAddSubmit}
                    >Submit</Button>


                </Box>
            </Card>
        </div>

    )

}

export default AddANote;