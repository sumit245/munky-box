import React, { createContext, useState } from 'react'
export const FavouriteContext = createContext()
export const FavouriteContextProvider = ({ children }) => {
    const [favourite, setfavourite] = useState([])
    const add = (restaurant) => {
        setfavourite([...favourite, restaurant])
    }
    const remove = (restaurant) => {
        const newFavourite = favourite.filter((x) => x._id !== restaurant.id)
        setfavourite(newFavourite)
    }
    return (
        <FavouriteContext.Provider value={{
            favourite,
            addToFavourites: add,
            removeFromFavourites: remove
        }} >
            {children}
        </FavouriteContext.Provider>
    )
}
