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

import Appbar from './components/Appbar/Appbar'
import Drawe from './components/Drawe/Drawe'
import Reportes from './views/Reportes'
import Work from './views/Work'
import { workState } from './state/workState'
import workReducer from './reducer/workReducer'
import ObraExcel from './views/ObraExcel'
import EmpresaReducer from './reducer/empresasReducer'
import { empresasContext } from './context/empresasContext'
import ObraMensual from './views/ObraMensual'
import Profile from './views/Profile'
import Codes from './views/Codes'
import Employees from './views/Employees'


  const App = () => {

  const [userinit,dispatch] = useReducer(userReducer,userState)

  const [workinit,dispatchwork] = useReducer(workReducer,workState)


   useEffect(() => {
    sessionStorage.setItem('user',JSON.stringify(userinit))
  }, [userinit])

  const [ open, setOpen ] = useState( false )

  const init1 =()=>{
    return JSON.parse(sessionStorage.getItem('empresas'))||
    {
      empresas:[]
    }
  }

   const [empresaArray, dispatchEmpresa] = useReducer(EmpresaReducer, {},init1 )

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
              <Route exact path="/descargarobramensual/:id" component={ObraMensual}></Route>
              <Redirect to="/login"></Redirect>
            </Switch>
          }
          {/* {
            userinit.isLogged && userinit.type === "admin" &&
            <div style={{position:'relative',minHeight:'100vh'}}>
             <Appbar
              open={open}
              setOpen={setOpen}>
             </Appbar> 
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/reportes" component={Reportes}></Route>
              <Redirect to="/"></Redirect>
            </Switch>
            <Drawe
            open={open}
            setOpen={setOpen}></Drawe>
            </div>
          } */}
          {
            userinit.isLogged && userinit.type === "superadmin" &&
            <>
             <Appbar
              open={open}
              setOpen={setOpen}>
             </Appbar> 
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/perfil" component={Profile}></Route>
              <Route exact path="/lista-obras" component={Work}></Route>
              <Route exact path="/lista-obras/:id" component={Employees}></Route>
              <Route exact path="/codigos" component={Codes}></Route>
              <Redirect to="/"></Redirect>
            </Switch>
            <Drawe
            open={open}
            setOpen={setOpen}></Drawe>
            </>
           }
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
