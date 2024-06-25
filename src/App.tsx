import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Pages from './Pages';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="container">
        <h2>Exemplo Rotas</h2>
      </div>
      <div className="col-auto">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Pages.Home />} />
            <Route path="RegisterPerson" element={<Pages.RegisterPerson />} />
            <Route path="RegisterEmployee" element={<Pages.RegisterEmployee />} />
            <Route path="RegisterAuthor" element={<Pages.RegisterAuthor />} />
            <Route path="RegisterGenre" element={<Pages.RegisterGenre />} />
            <Route path="*" element={<Pages.NotFound />} />
            <Route path='RegisterBook' element={<Pages.RegisterBook/>}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

function Layout() {
  return (
    <div>
      <hr />
      <nav>
        <button type='button' onClick={(e) => {
        e.preventDefault();
        window.location.href='/RegisterPerson';
        }}>Register Person</button>
        <button type='button' onClick={(e) => {
        e.preventDefault();
        window.location.href='/RegisterEmployee';
        }}>Register Employee</button>
        <button type='button' onClick={(e) => {
        e.preventDefault();
        window.location.href='/RegisterAuthor';
        }}>Register Author</button>
        <button type='button' onClick={(e) => {
        e.preventDefault();
        window.location.href='/RegisterGenre';
        }}>Register Genre</button>
        <button type='button' onClick={(e) => {
        e.preventDefault();
        window.location.href='/RegisterBook';
        }}>Register Book</button>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
