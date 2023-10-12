import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import routes from './data/routes';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map((route, index: number) => (
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
