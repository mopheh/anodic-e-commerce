import {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
} from "../constants/cartConstants"

export const wishlistReducer = (state = [], action) => {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      const item = action.payload

      const existItem = state.find((x) => x.product === item.product)

      if (existItem) {
        return state.map((x) => (x.product === existItem.product ? item : x))
      } else {
        return [...state, item]
      }
    case WISHLIST_REMOVE_ITEM:
      return state.filter((x) => x.product !== action.payload)

    default:
      return state
  }
}
