import { createContext, useState } from "react";


export const GlobalContext = createContext(null);


export default function GlobalState({ children }) {
    const [searchParam, setSearchParam] = useState('');
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([])

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


    return <GlobalContext.Provider value={{ searchParam, setSearchParam, handleSubmit, loading, recipeList }}>
        {children}
    </GlobalContext.Provider>
}