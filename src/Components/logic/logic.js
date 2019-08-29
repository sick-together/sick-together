import axios from 'axios'; 
import React, { useRef } from "react";

const [open, setOpen] = React.useState(false);

export function handleClose() {
    setOpen(false); 
}