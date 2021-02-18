import { BrowserRouter as Router , Switch, Route, Redirect } from 'react-router-dom'
import { useReducer , useEffect , useState} from 'react'
import { userContext } from './context/userContext'
import { workContext } from './context/workContext'


import userReducer from './reducer/userReducer'
import { userState } from './state/userState'
import Home from './views/Home'
import { CssBaseline, Dialog, ThemeProvider } from '@material-ui/core'

import theme from './themeGlobal'
import Login from './views/Login'

import RIS from './views/RIS'
import Appbar from './components/Appbar/Appbar'
import Drawe from './components/Drawe/Drawe'
import Reportes from './views/Reportes'
import Worker from './views/Worker'
import Work from './views/Work'
import CodeActivation from './views/CodeActivation'
import CodeExtension from './views/CodeExtension'

import { workState } from './state/workState'
import workReducer from './reducer/workReducer'
import ObraExcel from './views/ObraExcel'
import EmpresaReducer from './reducer/empresasReducer'
import { empresasContext } from './context/empresasContext'

  const App = () => {

  //   const init = () =>{
  //     return JSON.parse(sessionStorage.getItem('user')) || userState 
  // }

  const [userinit,dispatch] = useReducer(userReducer,userState)

  const [workinit,dispatchwork] = useReducer(workReducer,workState)


   useEffect(() => {
    sessionStorage.setItem('user',JSON.stringify(userinit))
  }, [userinit])

  const [ open, setOpen ] = useState( false )

 
  // window.onbeforeunload = function() {
  //   return "Leaving this page will reset the wizard";
  // };

  const init1 =()=>{
    return JSON.parse(sessionStorage.getItem('empresas'))||
    {
      empresas:[]
    }
  }

   //se usa reducer para carrito de compras
   const [empresaArray, dispatchEmpresa] = useReducer(EmpresaReducer, {},init1 )

   //se actualiza el carrito de compras 
   useEffect(() => {
     sessionStorage.setItem('empresas',JSON.stringify(empresaArray))
   }, [empresaArray])



  return (
    <ThemeProvider theme={theme}>
    <CssBaseline>
    <userContext.Provider value={{userinit,dispatch}}>
    <workContext.Provider value={{workinit,dispatchwork}}>
    <empresasContext.Provider value={{empresaArray,dispatchEmpresa}}>
    <Router>
        <div>
          {
            !userinit.isLogged &&
            <Switch>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/descargarobraexcel/:id" component={ObraExcel}></Route>
              <Redirect to="/login"></Redirect>
            </Switch>
          }
          {
            userinit.isLogged && userinit.type === "admin" &&
            <div>
             <Appbar
              open={open}
              setOpen={setOpen}>
             </Appbar> 
            <Switch>
              <Route exact path="/registrar-obra" component={Home}></Route>
              <Route exact path="/reportes" component={Reportes}></Route>
              <Route exact path="/obreros" component={Worker}></Route>
              <Redirect to="/registrar-obra"></Redirect>
            </Switch>
            <Drawe
            open={open}
            setOpen={setOpen}></Drawe>
            </div>
          }
          {
            userinit.isLogged && userinit.type === "ris" &&
            <div>
             <Appbar
              open={open}
              setOpen={setOpen}>
             </Appbar> 
            <Switch>
              <Route exact path="/ris" component={RIS}></Route>
              <Redirect to="/ris"></Redirect>
            </Switch>
            <Drawe
            open={open}
            setOpen={setOpen}></Drawe>
            </div>
          }
          {
            userinit.isLogged && userinit.type === "superadmin" &&
            <div>
             <Appbar
              open={open}
              setOpen={setOpen}>
             </Appbar> 
            <Switch>
              <Route exact path="/lista-obras" component={Work}></Route>
              <Route exact path="/codigo-activacion" component={CodeActivation}></Route>
              <Route exact path="/codigo-extension" component={CodeExtension}></Route>
              <Redirect to="/lista-obras"></Redirect>
            </Switch>
            <div>
              sadsad
            </div>
            <Drawe
            open={open}
            setOpen={setOpen}></Drawe>
            </div>
          }
          {/* <Switch> */}
            
            {/* Rutas para el login */}
            {/* <LoginRoute
            isAuth={userinit.isLogged}
            exact
            path="/login" 
            component={login}
            /> */}


            {/* Rutas para el administrador */}
            {/* <AdminRoute
            isAuth={userinit.isLogged}
            // type={userinit.type}
            exact
            path="/" 
            component={admin}
            /> */}

            {/* Rutas para el Registro de ingreso */}
            {/* <RISRoute
            isAuth={value.isLogged}
            exact
            path="/login" 
            component={Login}
            /> */}

            {/* Rutas para el manejo de reporte */}
            {/* <ReportRoute
            isAuth={value.isLogged}
            exact
            path="/login" 
            component={Login}  
            /> */}

            {/* <Route path='/' component={Login}></Route> */}

          {/* </Switch> */}
        </div>
    </Router>
    </empresasContext.Provider>
    </workContext.Provider>
    </userContext.Provider>
    </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
