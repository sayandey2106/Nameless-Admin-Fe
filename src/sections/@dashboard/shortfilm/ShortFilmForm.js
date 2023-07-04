import { Container, Card, Button, TextField, Grid,Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useDispatch,useSelector } from 'react-redux';
import React, { useState,useEffect } from 'react'
import Iconify from '../../../components/iconify/Iconify';
import { createShortFilm } from '../../../action/ShortFilmAction';
import { NavLink } from 'react-router-dom';
import { setEditShortFilm } from '../../../store/ShortFilmSlice';

export default function ShortFilmForm({edit,editObj}) {

    const [editMode, setEditMode] = React.useState(edit);
    const [status, setStatus] = React.useState('');
    const [name, setName] = React.useState('');
    const [thumbnail, setThumbnail] = React.useState('');
    const [genre, setGenre] = React.useState('');
    const [link, setLink] = React.useState('');
 
    const dispatch = useDispatch();
    const editFilm = useSelector((state)=>state.shortfilm)

    const handleGenreChange = (event) => {
        setGenre(event.target.value);
    };
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    useEffect(() => {
       if(editFilm.editShortFilm!=null ){
        setName(editFilm.editShortFilm.name)
        setThumbnail(editFilm.editShortFilm.thumbnail)
        setGenre(editFilm.editShortFilm.genre)
        setLink(editFilm.editShortFilm.link)
        setStatus(editFilm.editShortFilm.status)
       }
       
    }, []);
    
    const sFilm = {name,link,thumbnail,genre};
  
    
   console.warn()
    return (

        <div>
        
            <Container>
                <Card sx={{ marginTop: "20px", padding: "30px" }}>
                <Typography variant='h4'sx={{marginBottom:"10px"}} gutterBottom>
                    {
                        edit===true?"Edit Short Film":"Add Short Film"
                    }
                        
                    </Typography>
                    <Grid container spacing={3}
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={12} md={12} lg={12}>

                            <TextField id="outlined-basic" width fullWidth label="Name" value={name} variant="outlined" required onChange={(e)=>{setName(e.target.value)}}/>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>

                            <TextField id="outlined-basic" fullWidth label="Link" type='text' value={link} variant="outlined" required onChange={(e)=>{setLink(e.target.value)}}/>
                        </Grid>

                        

               

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Select Status"
                                    onChange={handleStatusChange}
                                >
                                    {
                                        ['Active','Banned'].map((s)=>{
                                            return(
                                                <MenuItem value={s} selected={(editFilm.editShortFilm!=null && s===status) ?true:false }>{s}</MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Genre</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={genre}
                                    label="Select Genre"
                                    onChange={handleGenreChange}
                                >
                                    {
                                        ['Action','Suspense','Drama'].map((g)=>{
                                            return(
                                                <MenuItem value={g} selected={(editFilm.editShortFilm!=null && g===genre) ?true:false }>{g}</MenuItem>
                                            );                                            ;
                                        })
                                    }
                                   
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} alignItems="center"
                            justifyContent="center">

                            <TextField
                                align="center"
                                id="standard-number"
                                label="Thumbnail"
                                type="text"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                value={thumbnail}
                                onChange={(e)=>{setThumbnail(e.target.value)}}

                            />
                        </Grid>
                        <Grid item >
                            <Button variant="contained" sx={{ marginLeft: "20px", marginTop: "35px" }} startIcon={<Iconify icon="eva:plus-fill" />}
                            onClick={()=>{
                               
                                    createShortFilm(dispatch,sFilm)
                           console.log("creating sfilm")
                            }}
                            >
                                Save User
                            </Button>
                        </Grid>
                        <Grid item >
                            <NavLink to="/dashboard/shortfilm">
                            <Button variant="contained" sx={{ marginLeft: "20px", marginTop: "35px" }} onClick={()=>{
                                setEditMode(false)
                                dispatch(setEditShortFilm(null))
                            }} startIcon={<Iconify icon="eva:cross-fill" />}>
                                Cancel
                            </Button>
                            </NavLink>
                        </Grid>

                    </Grid>
                </Card>
            </Container>
        </div>
    )
}
