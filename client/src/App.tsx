import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import routes from './data/routes';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

