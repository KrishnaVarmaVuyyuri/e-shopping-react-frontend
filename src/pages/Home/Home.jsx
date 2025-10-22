import React, { use, useEffect,useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import axios from 'axios'
import Products from '../../components/Products/Products'
import {useSearchParams} from 'react-router-dom'
export default function Home({cart,loadCart}) {

    const [searchParams]= useSearchParams()
    const search = searchParams.get('search');

    const[products,setProducts]=useState([])
    

    useEffect(()=>{
        const urlPath = search ? `/api/products?search=${search}` : '/api/products';
        fetch(urlPath)
    .then((response)=>{
        response.json().then((data)=>{
                setProducts(data)
        })
    })

    
    },[search])

   
    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="/home.png" />
            <Header cart={cart}/>

            <div className="home-page">
                <div className="products-grid">
                    {products.map(product => {
                        return (
                           <Products key={product.id} product={product} loadCart={loadCart}/> 
                        )
                    })}



                </div>
            </div>
        </>
    )
}
