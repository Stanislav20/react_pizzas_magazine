import { useState, useEffect } from 'react'
import './scss/app.scss'
import Header from './components/Header'
import Categories from './components/Categories'
import Sort from './components/Sort'
import PizzaBlock from './components/pizzaBlock/index'
import PizzaSkeleton from './components/pizzaBlock/PizzaSkeleton'

function App() {
	const [itemsPizzas, setItemsPizzas] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetch('https://646cb6e27b42c06c3b2bdaff.mockapi.io/items_pizza')
		.then(res => res.json())
		.then(arr => {
			setItemsPizzas(arr)
			setIsLoading(false)
		})
	}, [])

	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categories />
						<Sort />
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
			</div>
		</div>
	)
}

export default App;
