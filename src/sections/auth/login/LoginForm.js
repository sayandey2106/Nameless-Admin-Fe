import { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { userLogin } from '../../../action/UserAction';
import { removeUserLogin } from '../../../store/LoginSlice';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = useSelector((state)=>state.login);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login={email,password};

  // useEffect(() => {
   
  //   // dispatch(removeUserLogin());
  //   // localStorage.removeItem('auth_token');
  //   if(loginUser.data.authToken){
  //     navigate('/dashboard/app')
  //   }
  // }, []);

  const handleClick = () => {
    userLogin(dispatch,login).then((data)=>{
      if(data.status=="OK"){
        console.log("promising")
        navigate('/dashboard/app')
      }
        
 
    }).catch((err)=>{
      console.log(err)
    })
    // navigate('/dashboard/app', { replace: true });
  };
//   const get_all_quality = ()=>{
//     getAllQuality().then((res)=>{
  
//         setQualities(res.data);
//        console.log(qualities)
       
//       }).catch((err)=>{
//        console.log(err)
//       })
// }

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address"    value={email}
          onChange={(e)=>{
            setEmail(e.target.value)
          }}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
