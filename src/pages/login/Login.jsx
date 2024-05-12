import { useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthData } from "../../structure/AuthWrapper";
import { Button,Card,Typography, Watermark } from "antd";
const { Title,Text } = Typography;
export const Login = () => {

     const navigate = useNavigate();
     const location = useLocation();
     const { login } = AuthData();
     const [formData, setFormData] = useReducer((formData, newItem) => {
           return ({ ...formData, ...newItem }) 
          }, { userName: "", password: "" })
     const [errorMessage, setErrorMessage] = useState(null)


     const doLogin = () => {

          login(formData.userName, formData.password)
               .then(() => {
                    if (location.state?.from)
                         navigate(location.state.from);
                    else
                         navigate("/")
               },
                    errorMsg=>setErrorMessage(errorMsg)
               )

     }

     return (
          <Watermark content="Show Booking">
          <Card className="page"
           style={{marginTop:"10%",
               alignContent:"center",
               marginLeft:"35%",
               marginBottom:"10%",
               marginRight:"40%",
               borderColor:"rgb(248,68,100)",
               borderWidth:"5px",
               alignItems:"Center"}}>

               <div style={{marginLeft:"25%"}}>
               <img src="assets\logos\logo.png" alt="Logo"
                style={{ width: 200, height: 60 }} />   
               </div>  
               <Typography.Title style={{color:"rgb(248,68,100)"}}>
                    Let's Login 
               </Typography.Title>
               <div className="inputs">
                    <div className="input">
                         <Text style={{fontSize:"20px",color:"rgb(248,68,100)",fontWeight:"bold"}}> UserName: </Text>
                         <input style={{marginLeft:"1%"}} value={formData.userName} onChange={(e) => setFormData({ userName: e.target.value })} type="text" />
                    </div>
                    <div className="input">
                    <Text style={{fontSize:"20px",color:"rgb(248,68,100)",fontWeight:"bold"}}> Password: </Text>
                         <input style={{marginLeft:"3%"}} value={formData.password} onChange={(e) => setFormData({ password: e.target.value })} type="password" />
                    </div>
                    <br></br>
                    <br></br>
                    <div className="button" style={{color:"rgb(248,68,100)",fontStyle:"oblique",fontWeight:"bold"}}>
                         <Button style={{color:"rgb(248,68,100)",fontStyle:"oblique",fontWeight:"bold", marginLeft:"37%",fontSize:"25px", height:'17%'}} onClick={doLogin} >Login</Button>
                    </div>
                    {errorMessage &&
                         <div className="error">{errorMessage}</div>
                    }
               </div>
          </Card>
          </Watermark>
     )
}



// import { useReducer, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { AuthData } from "../../structure/AuthWrapper";
// import { Button,Card,Typography } from "antd";
// const { Title,Text } = Typography;
// export const Login = () => {

//      const navigate = useNavigate();
//      const location = useLocation();
//      const { login } = AuthData();
//      const [formData, setFormData] = useReducer((formData, newItem) => {
//            return ({ ...formData, ...newItem }) 
//           }, { userName: "", password: "" })
//      const [errorMessage, setErrorMessage] = useState(null)


//      const doLogin = () => {

//           login(formData.userName, formData.password)
//                .then(() => {
//                     if (location.state?.from)
//                          navigate(location.state.from);
//                     else
//                          navigate("/")
//                },
//                     errorMsg=>setErrorMessage(errorMsg)
//                )

//      }

//      return (
        
              
//                <div className="inputs">
//                     <div className="input">
//                          <Text > UserName:</Text>
//                          <input value={formData.userName} onChange={(e) => setFormData({ userName: e.target.value })} type="text" />
//                     </div>
//                     <div className="input">
//                     <Text > Password:</Text>
//                          <input value={formData.password} onChange={(e) => setFormData({ password: e.target.value })} type="password" />
//                     </div>
                    
//                     <div className="button">
//                          <Button onClick={doLogin}>Login</Button>
//                     </div>
//                     {errorMessage &&
//                          <div className="error">{errorMessage}</div>
//                     }
//                </div>
           
//      )
// }












