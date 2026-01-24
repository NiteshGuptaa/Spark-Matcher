import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './components/Body'
import { Provider } from 'react-redux'
import appStore from "./utils/appStore";
import Feed from './components/Feed'
import Profile from './components/Profile'
import Connections from './components/Connections'
import Requests from './components/Requests'
import Signup from './pages/Signup'
import ChatHomePage from './pages/ChatHomePage'
import SettingsPage from './pages/SettingsPage'
import { useThemeStore } from './store/useThemeStore'
import LoginPage from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';

function App() {
  // const [count, setCount] = useState(0)
  const { theme } = useThemeStore();
  
  const { checkAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth(); // Check auth and re-initialize socket
  }, [checkAuth]);


  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <div data-theme = {theme}>
            <Routes>
              <Route path='/' element={<Body />}>
                <Route path='/' element={<Feed />} />
                <Route path='/login-page' element={<LoginPage />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/connections' element={<Connections />} />
                <Route path='/requests' element={<Requests />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/chat-home-page' element={<ChatHomePage />} />
                <Route path='/settings' element={<SettingsPage />} />

              </Route>
            </Routes>
            <Toaster />
          </div>

        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
