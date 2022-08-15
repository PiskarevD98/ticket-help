import Home from "./app/pages/Home"
import Register from "./app/pages/Register"
import Login from "./app/pages/Login"
import Header from "./componets/Header"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NewTicket from './app/pages/NewTicket'
import PrivateRoute from './componets/PrivateRoute'
import Tickets from "./app/pages/Tickets"
import Ticket from "./app/pages/Ticket"


function App() {
  return (
    <>
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/new-ticket' element={<PrivateRoute > <NewTicket /> </PrivateRoute>} /> 
          <Route path='/tickets' element={<PrivateRoute> <Tickets /> </PrivateRoute>} />
          <Route path='/ticket/:ticketId' element={<PrivateRoute> <Ticket /> </PrivateRoute>  } />
        </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
