import { createContext, useState } from "react";


export const GlobalContext = createContext(null);


export default function GlobalState({ children }) {
    const [searchParam, setSearchParam] = useState('');
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState(null);
    const [favorites, setFavorites] = useState([])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);

            const data = await response.json();

            if (data?.data?.recipes) {
                setRecipeList(data?.data?.recipes);
                setLoading(false);
                setSearchParam('')
            }

        } catch (error) {
            console.log(error);
            setLoading(false);
            setSearchParam('')
        }
    }


    function handleAddToFavorites(getCurrentItem) {
        console.group(getCurrentItem);
        let cpyFavoritesList = [...favorites];
        const index = cpyFavoritesList.findIndex(item => item.id === getCurrentItem.id);

        if (index === -1) {
            cpyFavoritesList.push(getCurrentItem)
        } else {
            cpyFavoritesList.splice(index)
        }

        setFavorites(cpyFavoritesList)
    }


    return <GlobalContext.Provider value={{ searchParam, setSearchParam, handleSubmit, loading, recipeList, recipeDetailsData, setRecipeDetailsData, favorites, setFavorites, handleAddToFavorites }}>
        {children}
    </GlobalContext.Provider>
}