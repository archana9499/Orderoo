import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import  sanityClient from '../sanity';
import { Ionicons } from '@expo/vector-icons';
import RestaurantCard from './RestaurantCard';

const FeaturedRow = ({title,description,id}) => {

    const [restaurants, setRestaurants] = useState([])

    useEffect(()=>{
        sanityClient.fetch(`
        *[_type == "featured" && _id == $id]{
            ...,
            restaurants[]->{
              ...,
              dishes[]->,
              type->{
                name
              }
            }
          }[0]
        `,{id}).then((data)=>{
            setRestaurants(data?.restaurants)
        })
    },[id])

    //console.log(restaurants)
  return (
    <View>
    <View className="mt-4 flex-row items-center justify-between px-4">
      <Text className="font-bold text-lg">{title}</Text>
      <Ionicons name="arrow-forward-outline" color="#063536" size={24}/>
    </View>
    <Text className="text-xs text-gray-500 px-4">{description}</Text>

    <ScrollView horizontal className="pt-5" showsHorizontalScrollIndicator={false} contentContainerStyle={{
        paddingHorizontal:10
    }}>
        {restaurants.map((restaurant,index)=>(
            <RestaurantCard key={index}
            {...restaurant}/>
        ))}
    </ScrollView>
    </View>
  )
}

export default FeaturedRow