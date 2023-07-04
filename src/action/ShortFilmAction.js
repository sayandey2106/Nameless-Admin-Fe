import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert";
import 'react-toastify/dist/ReactToastify.css';
import { STATUS } from "../utils/Status";
import { addShortFilm,setStatus } from "../store/ShortFilmSlice";
import store from "../store/Store"

export const  getAllShortFilm = async (dispatch) =>{

  const authToken = store.getState().login.data.authToken;
    // const signUpObj = {signup }
    // let conId =  Math.random().toString(36).slice(2);
    // let date_create= moment().format("YYYY-MM-DD hh:mm:ss").toString();
    console.warn(process.env.REACT_APP_API_URL);
    dispatch(setStatus(STATUS.LOADING));
    const headers = {  "content-type": "application/json",
     "auth-token":authToken,
//     "currentUser":sessionStorage.getItem("lp_user_email"),
//     "requested-timestamp": date_create,
// "conversation-id": conId,
      }
  const response = await fetch(`${process.env.REACT_APP_API_URL}shortfilm`, { headers });
  const data = await response.json();
  dispatch(addShortFilm(data.data));
  dispatch(setStatus(STATUS.IDLE));
  console.log(data);
//   return(data);
}

export const  createShortFilm = async (dispatch,sFilm) =>{

    // const signUpObj = {signup }
    // let conId =  Math.random().toString(36).slice(2);
    // let date_create= moment().format("YYYY-MM-DD hh:mm:ss").toString();
    const authToken = store.getState().login.data.authToken;
    console.warn(authToken);
    dispatch(setStatus(STATUS.LOADING));
   

    const response = await fetch(`${process.env.REACT_APP_API_URL}shortfilm`, {
        method :"POST",
      headers : {
        "content-type": "application/json",
        "auth-token":authToken,
      },
    body : JSON.stringify(sFilm)
    
     });

  const data = await response.json();


if(data.status==="OK"){
    new Swal({
        title: "Short Film Created!!",
        text:data.message,
        icon: "success",
        button: "Ok!",
      })
}else{
    new Swal({
        title: "Failed!!",
        text:data.message,
        icon: "error",
        button: "Ok!",
      })
}
  dispatch(setStatus(STATUS.IDLE));
  getAllShortFilm(dispatch)
  console.log(data);
//   return(data);
}