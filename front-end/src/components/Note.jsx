import React, {useEffect, useState} from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";


function Note({note, getAllNotes}){
    const [catPicture, setCatPicture] = useState("");

    async function getCatPicture(){
        const res = await axios.get("https://api.thecatapi.com/v1/images/search")
        setCatPicture(res.data[0].url);
    }

    useEffect(() =>{
        getCatPicture();
    },[]);

  async  function handleDelete() {
        const res = await axios.delete(`http://localhost:8080/notes/${note.id}`);

      if(res.status === 204){
          getAllNotes();
      }else{

      }
    }
    if(catPicture != ""){
        return (
            <Card sx={{ width: 200 }}
                  className={"noteCard"}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={catPicture}
                        alt="random kitten"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {note.title}
                        </Typography>
                        <Typography variant="body2"
                                    sx={{ minHeight: 100 }}
                                    color="text.secondary"

                        >
                            {note.content}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Edit
                    </Button>
                    <Button size="small"
                            onClick={handleDelete}
                            color="primary">
                        Delete
                    </Button>
                </CardActions>
            </Card>
        )
    }else{
     return (
         <div>

         </div>
     )
    }

}

export default Note;