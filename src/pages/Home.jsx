import React from 'react'
import { useState, useEffect } from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/pizzaBlock/index'
import PizzaSkeleton from '../components/pizzaBlock/PizzaSkeleton'

function Home() {
	const [itemsPizzas, setItemsPizzas] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [activeIndexCategory, setActiveIndexCategory] = useState(0)
	const [selectedSort, setSelectedSort] = useState({name:'популярности', sortProperty:'raiting'})

	useEffect(() => {
		setIsLoading(true)
		
		const sortBy = selectedSort.sortProperty.replace('-', '');
		const order = selectedSort.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = activeIndexCategory > 0 ? `category=${activeIndexCategory}` : '';

		fetch(`https://646cb6e27b42c06c3b2bdaff.mockapi.io/items_pizza?
			${category}&sortBy=${sortBy}&order=${order}`)
		.then(res => res.json())
		.then(arr => {
			setItemsPizzas(arr)
			setIsLoading(false)
		})
		window.scroll(0, 0)
	}, [activeIndexCategory, selectedSort])

	return (
		<div className="container">
			<div className="content__top">
				<Categories 
				  activeIndexCategory={activeIndexCategory} 
					onClickCategory={(index) => setActiveIndexCategory(index)} />
				<Sort  
				  selectedSort={selectedSort} 
					onClickSort={(obj) => setSelectedSort(obj)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					isLoading 
					? [...new Array(6)].map((_, i) => <PizzaSkeleton key={i} />)
					: (itemsPizzas.map((obj) => (<PizzaBlock key={obj.id} {...obj} />)))
				}                
			</div>
		</div>
	)
}

export default Home