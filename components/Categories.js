import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import  sanityClient, {urlFor}  from '../sanity';
import CategoryCard from './CategoryCard';

const Categories = () => {

    const [categories, setCategories] = useState([])

    useEffect(()=>{
        sanityClient.fetch(`
        *[_type == "category"]
        `).then((data)=>
            setCategories(data)
          )
    },[])

   // console.log(categories)

  return (
  <ScrollView horizontal contentContainerStyle={{
    paddingHorizontal:15,paddingTop:10
  }} showsHorizontalScrollIndicator={false}>
    {
        categories.map((category)=>(
            <CategoryCard key={category._id}
            imgUrl={urlFor(category.image).width(200).url()}
            title={category.name}/>
        ))
    }
  </ScrollView>
  )
}

export default Categories

const styles = StyleSheet.create({})