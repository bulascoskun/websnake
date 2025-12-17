import ReactDOM, { type Container } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import router from './routing';
import './main.css';

const root = document.getElementById('root') as Container;

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
