// В этом фаиле создается redux хранилище

import { configureStore } from '@reduxjs/toolkit'
import counterReduser from './slices/filterSlice'

export const store = configureStore({
  reducer: {
		counter: counterReduser,
	},
})
