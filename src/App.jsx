import './scss/app.scss';
import Header from './components/Header';
import Home from './routes/Home';
import { Route, Routes } from 'react-router-dom';
import Cart from './routes/Cart';

function App() {
   return (
      <div className="wrapper">
         <Header />
         <div className="content">
            <div className="container">
               <Routes>
                  <Route index element={<Home />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="*" element={<h1>Not Found</h1>} />
               </Routes>
            </div>
         </div>
      </div>
   );
}

export default App;
