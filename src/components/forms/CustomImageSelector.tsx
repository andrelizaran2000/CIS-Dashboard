// Modules
import { useEffect, useRef, useState } from 'react';
import { Button, IconButton, Stack, Typography } from '@mui/material';

// Icons
import ClearIcon from '@mui/icons-material/Clear';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

// Hooks
import useUploadimage from '../../hooks/useUploadimage';

type Props = {
  label:string;
  inputName:string;
  handleImageSelector:(inputName:string, value:any) => void;
  value: string;
  disabled:boolean;
}

export default function CustomImageSelector ({ label, inputName, handleImageSelector, value, disabled }:Props) {

  const fileInput = useRef();

  const { uploadImage } = useUploadimage();

  useEffect(() => {
    handleImageSelector(inputName, value);
  }, [value]);

  async function saveImage (event:any) {
    const file = event.target.files[0];
    const url = await uploadImage(file, file.name);
    if (url === null) return;
    handleImageSelector(inputName, url);
  }

  function handleRemoveImage () {
    handleImageSelector(inputName, '')
  }

  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Typography>{label}</Typography>
      <Stack direction='row'>
        { 
          value 
          && 
          <>
            <img src={value} style={{ width:40, marginRight:12 }}/>
            <IconButton sx={{ marginRight:2 }} onClick={() => handleRemoveImage()} disabled={disabled}>
              <ClearIcon/>
            </IconButton>
          </>
        }
        {/* @ts-ignore */}
        <IconButton onClick={()=> fileInput!.current!.click()} disabled={disabled}>
          <PhotoCameraIcon/>
          {/* @ts-ignore */}
          <input type='file' style={{ display:'none' }} ref={fileInput} onChange={saveImage}/>
        </IconButton>
      </Stack>
    </Stack>
  )
}
