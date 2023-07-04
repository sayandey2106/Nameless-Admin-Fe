import { Container, Card, Button, TextField, Grid,Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import Iconify from '../../../components/iconify/Iconify';

export default function CastForm() {

    const [gender, setGender] = React.useState('');
    const [role, setRole] = React.useState('');
    const [status, setStatus] = React.useState('');
    const handleChange = (event) => {
        setGender(event.target.value);
    };
    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };
   
    return (
        <div>
            <Container>
                <Card sx={{ marginTop: "20px", padding: "30px" }}>
                <Typography variant='h4'sx={{marginBottom:"10px"}} gutterBottom>
                        Add Cast & Crew
                    </Typography>
                    <Grid container spacing={3}
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={12} md={12} lg={12}>

                            <TextField id="outlined-basic" width fullWidth label="Name" variant="outlined" required />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>

                            <TextField id="outlined-basic" fullWidth label="Email" type='email' variant="outlined" required />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>

                            <TextField id="outlined-basic" fullWidth label="Mobile" type='number' variant="outlined" required />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gender}
                                    label="Select Gender"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    label="Select Role"
                                    onChange={handleRoleChange}
                                >
                                    <MenuItem value="Director">Director</MenuItem>
                                    <MenuItem value="Actor">Actor</MenuItem>
                                    <MenuItem value="Camera">Camera</MenuItem>
                                    <MenuItem value="DOP">DOP</MenuItem>
                                    <MenuItem value="Crew Member">Crew Member</MenuItem>
                                    <MenuItem value="Editor">Editor</MenuItem>
                                    <MenuItem value="Writer">Writer</MenuItem>
                                    <MenuItem value="Music Director">Music Director</MenuItem>
                                    <MenuItem value="Lyricist">Lyricist</MenuItem>
                                    <MenuItem value="Singer">Singer</MenuItem>
                                    <MenuItem value="Musican">Musican</MenuItem>
                                    <MenuItem value="Make Up Artist">Make Up Artist</MenuItem>
                                    <MenuItem value="Cinematographer">Cinematographer</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} alignItems="center"
                            justifyContent="center">

                            <TextField
                                align="center"
                                id="standard-number"
                                label="Number"
                                type="file"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"

                            />
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
                                                <MenuItem value={s}>{s}</MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Button variant="contained" sx={{ marginLeft: "20px", marginTop: "35px" }} startIcon={<Iconify icon="eva:plus-fill" />}>
                                Save User
                            </Button>
                        </Grid>

                    </Grid>
                </Card>
            </Container>
        </div>
    )
}
