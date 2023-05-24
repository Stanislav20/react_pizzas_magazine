import { useState } from 'react';

const arrCategories = ['все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

function Categories() {
	const [activeIndexCategory, setActiveIndexCategory] = useState(0)

	const onClickCategory = (index) => {
		setActiveIndexCategory(index)
	}

	return (
		<div className="categories">
			<ul>
				{
					arrCategories.map((value, index) => (<li key={index} onClick={() => onClickCategory(index)} className={activeIndexCategory === index ? 'active' : ''}>{value}</li>))
				}
      </ul>
    </div>
	)
}

export default Categories