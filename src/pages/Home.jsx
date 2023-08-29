import { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux';
// useSelector вытаскивает данные из хранилища
// useDispatch вполняет действия, в данном случает меняет категорию пицц и меняет сортировку пиицц
import axios from 'axios'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/pizzaBlock/index'
import PizzaSkeleton from '../components/pizzaBlock/PizzaSkeleton'
import { SearchContext } from '../App'
import { setActiveIndexCategory, setSelectedSort } from '../redux/slices/filterSlice';
import { setItemsPizzas } from '../redux/slices/pizzasSlice';

function Home() {
	// const [itemsPizzas, setItemsPizzas] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const dispatch = useDispatch()
	const { searchValue } = useContext(SearchContext)
	const itemsPizzas = useSelector((state) => state.pizzasReducer.items)

	const fetchPizzas = async () => {
		setIsLoading(true)
		const sortBy = selectedSort.sortProperty.replace('-', '');
		const order = selectedSort.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = activeIndexCategory > 0 ? `category=${activeIndexCategory}` : '';

		try {
			const res = await axios.get(`https://646cb6e27b42c06c3b2bdaff.mockapi.io/items_pizza?${category}&sortBy=${sortBy}&order=${order}`)
			dispatch(setItemsPizzas(res.data))
		} catch (error) {
			console.log("ERROR", error)
		} finally {
			setIsLoading(false)
		}
	}

	const activeIndexCategory = useSelector((state) => state.filterReducer.activeIndexCategory)
	const dispatchFilterPizzas = useDispatch()
	const onClickCategory = (index) => {
		dispatchFilterPizzas(setActiveIndexCategory(index))
	}

	const selectedSort = useSelector((state) => state.filterReducer.selectedSort)
	const dispatchSortPizzas = useDispatch()
	const onClickSort = (obj) => {
		dispatchSortPizzas(setSelectedSort(obj))
	}

	useEffect(() => {
		fetchPizzas()
		window.scroll(0, 0)
	}, [activeIndexCategory, selectedSort])
  
	const pizzas = itemsPizzas
		.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
		.map((obj) => (<PizzaBlock key={obj.id} {...obj} />))

	const skeletons = [...new Array(6)].map((_, i) => <PizzaSkeleton key={i} />)

	return (
		<div className="container">
			<div className="content__top">
				<Categories 
				  activeIndexCategory={activeIndexCategory} 
					onClickCategory={onClickCategory} />
				<Sort  
				  selectedSort={selectedSort} 
					onClickSort={onClickSort} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{	isLoading ? skeletons : pizzas	}                
			</div>
		</div>
	)
}

export default Home