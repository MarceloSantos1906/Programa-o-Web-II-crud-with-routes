import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
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
      <nav>
        <ul>
          <li>
            <Link to="/RegisterPerson">Register Person</Link>
          </li>
          <li>
            <Link to="/RegisterEmployee">Register Employee</Link>
          </li>
          <li>
            <Link to="/RegisterAuthor">Register Author</Link>
          </li>
          <li>
            <Link to="/RegisterGenre">Register Genre</Link>
          </li>
          <li>
            <Link to="/RegisterBook">Register Book</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
