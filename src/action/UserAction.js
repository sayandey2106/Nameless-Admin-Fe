import jwtDecode from "jwt-decode";
import Swal from "sweetalert";
import 'react-toastify/dist/ReactToastify.css';
import { STATUS } from "../utils/Status";
import { addUser,setStatus } from "../store/UserSlice";
import { addUserLogin } from "../store/LoginSlice";
import store from "../store/Store";


export const  getAllUsers = async (dispatch) =>{
  const authToken = store.getState().login.data.authToken;

    // const signUpObj = {signup }
    // let conId =  Math.random().toString(36).slice(2);
    // let date_create= moment().format("YYYY-MM-DD hh:mm:ss").toString();
    console.warn("auth token is",authToken);
    dispatch(setStatus(STATUS.LOADING));
    const headers = {  "content-type": "application/json",
     "auth-token":authToken,
//     "currentUser":sessionStorage.getItem("lp_user_email"),
//     "requested-timestamp": date_create,
// "conversation-id": conId,
      }
  const response = await fetch(`${process.env.REACT_APP_API_URL}user`, { headers });
  const data = await response.json();
  dispatch(addUser(data.data));
  dispatch(setStatus(STATUS.IDLE));
  console.log(data);
//   return(data);
}

export const  userLogin = async (dispatch,login) =>{

  console.log("login started")
const response = await fetch(`${process.env.REACT_APP_API_URL}user/login`, {
   method :"POST",
   headers : {
       "content-type": "application/json",
      
    //   "requested-timestamp": UNIVERSAL.TIMESTAMP,
    //  "conversation-id": UNIVERSAL.CONID,
     },

body : JSON.stringify(login)

});

   const data = await response.json();


   if(data){

     if(data.status==="OK"){
      new Swal({
           title: "Logged In!",
           text: data.message,
           icon: "success",
           button: "Ok!",
         })
         
      
       dispatch(addUserLogin(data.data))
      const decode = jwtDecode(data.data.authToken)
     
  
       console.log(decode)
    
     }
     else{
       new Swal({
           title: "Login Failed!",
           text:"Please create an account first" ,
           icon: "error",
           button: "Retry",
         })
    
     }
   }
 
  return data;

   
   
}