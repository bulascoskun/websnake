import ReactDOM, { type Container } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import router from './routes';

const root = document.getElementById('root') as Container;

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
