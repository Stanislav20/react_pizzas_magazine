// В этом фаиле создается redux хранилище

import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'

export const store = configureStore({
  reducer: {
		filterReducer,
	},
})
