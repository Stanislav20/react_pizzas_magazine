import { useState, useEffect } from 'react'
import './scss/app.scss'
import Header from './components/Header'
import Categories from './components/Categories'
import Sort from './components/Sort'
import PizzaBlock from './components/PizzaBlock'

function App() {
	const [itemsPizzas, setItemsPizzas] = useState([])

	useEffect(() => {
		fetch('https://646cb6e27b42c06c3b2bdaff.mockapi.io/items_pizza')
		.then(res => res.json())
		.then(arr => setItemsPizzas(arr))
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
								itemsPizzas.map((obj) => (
									<PizzaBlock 
										key={obj.id}
										{...obj}
									/>
								))
						}                
					</div>
				</div>
			</div>
		</div>
	)
}

export default App;
