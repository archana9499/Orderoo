import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation,useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../slices/restaurantSlice';
import { urlFor } from '../sanity';
import { Feather, Ionicons } from '@expo/vector-icons';
import DishRow from '../components/DishRow';
import Basket from '../components/Basket';

const RestaurantScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {params:{
            id,
            image,
            name,
            rating,
            address,
            short_description,
            dishes,
            long,
            lat
  }} = useRoute()

  useEffect(()=>{
    dispatch(setRestaurant({
      id,
      image,
      name,
      rating,
      address,
      short_description,
      dishes,
      long,
      lat
}))
  },[])

  useLayoutEffect(()=>{
    navigation.setOptions({
      headerShown:false
    })
  })

  return (
    <>
    <Basket/>
    <ScrollView>
      <View>
        <Image source={{
          uri:urlFor(image).url()
        }} className="w-full h-56 bg-[#a9dadb] p-4"/>
        <TouchableOpacity onPress={navigation.goBack} className="absolute top-14 left-5 p-2 rounded-full bg-[#a9dadb]">
          <Ionicons name="arrow-back" size={20} color="#063536"/>
        </TouchableOpacity>
      </View>

      <View className="bg-[#a9dadb]">
        <View className="px-4 pt-4">
          <Text className="text-3xl font-bold">{name}</Text>
          <View className="flex-row space-x-2 my-1">
            <View className="flex-row items-center space-x-1">
            <Ionicons name="star" size={22} opacity={0.5} color="#a8a42c" />
                <Text className="text-xs">
                  <Text className="text-[#a8a42c]">{rating}</Text> .Offers
                </Text>
            </View>

            <View className="flex-row items-center space-x-1">
                <Ionicons
                  name="location-outline"
                  size={22}
                  opacity={0.4}
                  color="#063536"
                />
                <Text className="text-xs text-gray-500">
                  Nearby • {(address).slice(0,35)}..
                </Text>

            </View>
          </View>

          

          <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
        </View>

        <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <Ionicons
              name="help-circle-outline"
              size={20}
              opacity={0.6}
              color="#063536"
            />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food allergy?
            </Text>
            <Feather name="chevron-right" size={20} color="#063536" />
          </TouchableOpacity>

      </View>

      <View className="pb-36">
          <Text className="px-4 pt-3 mb-3 font-bold text-xl">Menu</Text>
          {dishes.map((dish) => (
            <DishRow key={dish._id} id={dish._id} {...dish} />
          ))}
        </View>
    </ScrollView>
    </>
  )
}

export default RestaurantScreen