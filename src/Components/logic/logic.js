import axios from 'axios'; 
import React, { useRef } from "react";
import firebase from 'firebase'; 

const [open, setOpen] = React.useState(false);
const [state, setStateUS] = React.useState("");
const [group_name, setGroupName] = React.useState("");
const [group_picture, setGroupPicture] = React.useState("");
const [description, setDescription] = React.useState("");
const [city, setCity] = React.useState("");

export function handleClose() {
    setOpen(false); 
}

export function handleOpen() {
    setOpen(true);
  }

  export function handleChange(e) {
    setStateUS(e.target.value);
  }

  export function handleSubmit() {
    setGroupName("");
    setGroupPicture("");
    setDescription("");
    let location = `${city}, ${state}`
    setCity("")
    setStateUS("")
  }

  export function fileUploadHandler(filename) {
    firebase.storage().ref('uploads').child(filename).getDownloadURL()
      .then(url => setGroupPicture(url))
  }