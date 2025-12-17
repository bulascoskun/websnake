import { createBrowserRouter } from 'react-router';

function Home() {
  return <h1>Home</h1>;
}

export default createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, Component: Home },
      //   { path: 'about', Component: About },
      //   {
      //     path: 'auth',
      //     Component: AuthLayout,
      //     children: [
      //       { path: 'login', Component: Login },
      //       { path: 'register', Component: Register },
      //     ],
      //   },
      //   {
      //     path: 'concerts',
      //     children: [
      //       { index: true, Component: ConcertsHome },
      //       { path: ':city', Component: ConcertsCity },
      //       { path: 'trending', Component: ConcertsTrending },
      //     ],
      //   },
    ],
  },
]);
