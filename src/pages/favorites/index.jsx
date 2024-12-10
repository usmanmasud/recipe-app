

import React, { useContext } from 'react'
import { GlobalContext } from '../../context';
import RecipeItem from '../../components/recipe-list';

export default function Favorites() {
    const { favorites } = useContext(GlobalContext);


    return (
        <div className='py-8 container mx-auto flex flex-wrap justify-center gap-10'>
            {
                favorites && favorites.length > 0 ?
                    favorites.map(item => <RecipeItem item={item} />)
                    : <div><p className='lg:text-4xl text-xl text-center text-black font-extrabold '>Nothing added</p></div>
            }
        </div>
    )
}
