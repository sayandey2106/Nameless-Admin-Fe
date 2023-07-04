import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Box,
  Skeleton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// components
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import SHORTFILM from '../_mock/shortfilm'
import ShortFilmForm from '../sections/@dashboard/shortfilm/ShortFilmForm';

import { getAllShortFilm } from '../action/ShortFilmAction';
import { setEditShortFilm } from '../store/ShortFilmSlice';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'genre', label: 'Genre', alignRight: false },
  { id: 'link', label: 'Link', alignRight: false },
  // { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];


// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ShortFilmPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [edit, setEdit] = useState();

  const [editObj, setEditObj] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shortfilms = useSelector((state)=>state.shortfilm)

  const login = useSelector((state)=>state.login)
  useEffect(() => {
    if(!login.data.authToken){

      navigate("/login")

    }else{
      if(shortfilms.data.length===0){
        getAllShortFilm(dispatch);
      }
    }
    

  }, [])

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = shortfilms.data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleClickScroll = () => {
    const element = document.getElementById('add-short-film');
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - shortfilms.data.length) : 0;

  const filteredFilms = applySortFilter(shortfilms.data, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredFilms.length && !!filterName;

  


  


  return (
    <>
      <Helmet>
        <title> Short Film | Nameless Dashboard</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Short Films
          </Typography>
          <Button variant="contained"  startIcon={<Iconify icon="eva:plus-fill" />}  onClick={handleClickScroll}> 
            New Short Film
          </Button>
        </Stack>
        {
          shortfilms.status==="loading"?<Box fullWidth>
          <Skeleton />
          <Skeleton animation="wave"  />
          <Skeleton animation='wave' sx={{height:"200px"}}/>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        
        </Box>:
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} placeholder="Search Shortfilm..." />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={shortfilms.data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredFilms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => {
                    const { id, name,genre, link,thumbnail } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, id)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={thumbnail} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{genre}</TableCell>

                        <TableCell align="left">
                            <Button variant='contained' href={link} target='blank'>Watch</Button>
                        </TableCell>

                        {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}

                        {/* <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell> */}

                        <TableCell align="right">
                        <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} onClick={()=>setEditObj(row)} 
                            
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={shortfilms.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        }
       
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={()=>{ 
          setEdit(true)
    
          handleCloseMenu()
          }}>
          <NavLink to="/dashboard/shortfilm/edit" style={{textDecoration:"none" ,color:"black" ,margin:"0"}} onClick={()=>{dispatch(setEditShortFilm(editObj))}}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
          </NavLink>
        </MenuItem>

        <NavLink to="/dashboard/shortfilm/assigncast" style={{textDecoration:"none" ,color:"black" ,margin:"0"}}>
        <MenuItem sx={{ color: 'secondary.main' }} onClick={()=>{
          handleCloseMenu()}}>
          <Iconify icon={'material-symbols:add'} sx={{ mr: 2 }} />
          Assign Cast
        </MenuItem>
            </NavLink>
        <NavLink to="/dashboard/shortfilm/castdetail" style={{textDecoration:'none'}} onClick={()=>{
          handleCloseMenu()}}>
        <MenuItem sx={{ color: 'primary.main' }} onClick={()=>{
          handleCloseMenu()}}>
          <Iconify icon={'carbon:view-filled'} sx={{ mr: 2 }} />
          View Cast
        </MenuItem>
        </NavLink>
        <MenuItem sx={{ color: 'error.main' }} onClick={()=>{
          handleCloseMenu()}}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
        
      </Popover>

      <div id="add-short-film">
        <ShortFilmForm edit={edit} editObj={editObj} />
      </div>
    </>
  );
}
