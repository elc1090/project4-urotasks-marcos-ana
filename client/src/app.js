/** dependencies **/
import React, { useState, useEffect, useReducer } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

import './css/app.css';

import NotFoundPage from './pages/404'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import SettingsPage from './pages/settings'

export const UserContext = React.createContext();
export const ProjectsContext = React.createContext();

export const FlagsContext = React.createContext();
export const ReducerContext = React.createContext();

export default function App() 
{
  const [loading, setLoading] = useState(true);
  const [fetchTasks, setFetchTasks] = useState(true);

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => 
  {
    if (user !== null && user.activeProject !== '0' && projects.length > 0)
    {
      const activeProjectIndex = projects.findIndex(project => project.id === user.activeProject);

      activeProjectIndex !== -1 
      ? setActiveProject(projects[activeProjectIndex]) 
      : setActiveProject(null);
    }

    else
      setActiveProject(null);
      
  }, [user, projects]);

  useEffect(() => 
  {
    axios.get(`${process.env.REACT_APP_SERVER_ROUTE}/initial-load`)
      .then(res => {setUser(res.data[0]); setProjects(res.data[1]); setLoading(false)})
      .catch(err => {console.log(err)})
  }, [])

  const [state, dispatch] = useReducer(reducer, 
  {
    isMenuHidden: true,
    isDashboardMoved: true,
    isSearchbarSpaced: true,
    isProjCreatorShown: false,
    isConfirmationShown: false
  });
      
  function reducer(state, action)
  {
    switch (action.type)
    {
      // ui
      case 'menuHidden': return { ...state, isMenuHidden: !state.isMenuHidden };
      case 'dashboardMoved': return { ...state, isDashboardMoved: !state.isDashboardMoved };
      case 'searchbarSpaced': return { ...state, isSearchbarSpaced: !state.isSearchbarSpaced };
      case 'projCreatorShown': return { ...state, isProjCreatorShown: !state.isProjCreatorShown };
      case 'confirmationShown': return { ...state, isConfirmationShown: !state.isConfirmationShown };

      default: return state;
    }
  }

  return (
    <div className="app" id='app'>
      <ProjectsContext.Provider value={{ projects, setProjects, activeProject, setActiveProject }}>
        <UserContext.Provider value={{ user, setUser }}>
          <ReducerContext.Provider value={{ state, dispatch }}>
            <FlagsContext.Provider value={{ loading, setLoading, fetchTasks, setFetchTasks }}>
              <Routes>
                <Route exact path='/' element={ <HomePage/> }/>
                <Route path='/login' element={ <LoginPage/> }/>
                <Route path='/register' element={ <RegisterPage/> }/>
                <Route path='/settings' element={ <SettingsPage/> }/>
      
                <Route path='/404' element={ <NotFoundPage/> }/>
                <Route path='*' element={ <Navigate to='/404'/> }/>
              </Routes>
            </FlagsContext.Provider>
          </ReducerContext.Provider>
        </UserContext.Provider>
      </ProjectsContext.Provider>
    </div>
  );
}
