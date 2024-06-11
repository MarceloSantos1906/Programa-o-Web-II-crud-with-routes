import { Routes, Route, Outlet, Link } from 'react-router-dom';
import Pages from './Pages';
import './App.css';

export default function App() {
  return (
    <>
      <div className="container">
        <h2>Exemplo Rotas</h2>
        </div>
        <div className="col-auto">
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route index element={<Pages.Home/>}/>
              <Route path='register' element={<Pages.Register/>}/>

              <Route path='*' element={<Pages.NotFound/>}/>
            </Route>
          </Routes>
        </div>
    </>
  );
}

function Layout() {
  return(
  <div>
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/*'>Nothing Here</Link>
        </li>
      </ul>
    </nav>
    <hr/>
    <Outlet/>
  </div>
  )
}
