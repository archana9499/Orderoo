import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { urlFor } from '../sanity'
import { Ionicons } from '@expo/vector-icons'

const RestaurantCard = ({id,
    image,
    name,
    rating,
    address,
    short_description,
    dishes,
    long,
    lat}) => {
    
        const navigation = useNavigation()
  return (

    <TouchableOpacity className="bg-[#a9dadb] shadow mr-3" onPress={()=>{
        navigation.navigate("Restaurant",{
            id,
            image,
            name,
            rating,
            address,
            short_description,
            dishes,
            long,
            lat

        })
    }}>

        <Image source={{
            uri:urlFor(image).url()
        }}
        className="h-36 w-64 rounded-sm"/>

        <View className="px-3 pb-4">
            <Text className="font-bold text-lg pt-2">{name}</Text>
            <View className="flex-row items-center space-x-1">
                <Ionicons name='star' size={22} color="#a8a42c"/>
                <Text className="text-xs">
                <Text className="text-[#a8a42c]">{rating}</Text> .Offers
                </Text>
                
            </View>

            <View className="flex-row items-center space-x-1">
                <Ionicons name='location-outline' size={22} color="#063536"/>
                <Text className="text-xs">Nearby. {(address).slice(0,25)}..</Text>
            </View>
        </View>
        
    </TouchableOpacity>
  )
}

export default RestaurantCard