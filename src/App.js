import { Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// useSelector вытаскивает данные из хранилища
// useDispatch делает действие, в данном случает увеличивает или уменьшает count
import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { decrement, increment, test } from './redux/slices/filterSlice';

export const SearchContext = createContext()

function App() {
	const [searchValue, setSearchValue] = useState('')

	const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()

	return (
		<div className="wrapper">

			<div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
				<button
          aria-label="Test value"
          onClick={() => dispatch(test())}
        >
          Test
        </button>
      </div>

			{/* <SearchContext.Provider value={{ searchValue, setSearchValue }} >
				<Header />
				<div className="content">
						<Routes>
							<Route path="/" element={<Home />}/>
							<Route path="/cart" element={<Cart/>}/>
							<Route path="*" element={<NotFound/>}/>
						</Routes>
				</div>
			</SearchContext.Provider> */}
		</div>
	)
}

export default App;
