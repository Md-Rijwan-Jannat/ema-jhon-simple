import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './component/Shop/Shop';
import Home from './component/Layout/Home';
import Orders from './component/Orders/Orders';
import Inventory from './component/Header/Inventory/Inventory';
import Login from './component/Login/Login';
import cartProductLoader from './Loders/cartLoaderProduct';
import Chakeout from './component/Chakeout/Chakeout';

const router = createBrowserRouter([
{
  path: '/',
  element: <Home></Home>,
  children:[
    {
      path: '/',
      element: <Shop></Shop>,
      loader: ()=>fetch(`http://localhost:5000/productsLength`)
    },
    {
      path:'/inventory',
      element: <Inventory></Inventory>
    },
    {
      path: '/order',
      element: <Orders></Orders>,
      loader: cartProductLoader
    },
    {
      path:'/login',
      element:<Login></Login>
    },
     {
      path:'/chakeout',
      element: <Chakeout></Chakeout>
     }
  ]
}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
