import { View, Text, Image, TextInput } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import  sanityClient  from '../sanity';
import { ScrollView } from 'react-native';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';

const HomeScreen = () => {

  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
   navigation.setOptions({
    headerShown:false
   })

  }, [])

  useEffect(()=>{
    sanityClient.fetch(`
    *[_type == "featured"]{
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`).then((data)=>{
      setFeaturedCategories(data)
    })
  },[])

  //console.log(featuredCategories)

  return (
    <SafeAreaView className="bg-[#6dafb0] pt-8">
      <View className="flex-row pb-3 items-center mx-3 space-x-2">
        <Image className="h-10 w-10 p-4 rounded-full bg-slate-400" source={{
          uri:"https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png"
        }}/>
        <View className="flex-1">
          <Text className="font-bold font-xs">Deliver Now!</Text>
          <Text className="font-bold font-xl">Current Location 
          <Feather name='chevron-down' size={20} color="#063536"/>
          </Text>

        </View>

        <Ionicons name='person-outline' size={30} color="#063536"/>

      </View>

      <View className="flex-row pb-2 items-center mx-4 space-x-2">
        <View className="flex-row space-x-2 flex-1 p-3 bg-[#a9dadb]">
          <Ionicons name='search-outline' size={20} color="#063536"/>
          <TextInput placeholder='Restaurants..'/>
        </View>

        <Feather name='sliders' size={20} color="#063536"/>
      </View>

      <ScrollView className="bg-grey-100" contentContainerStyle={{
        paddingBottom:100
      }} showsVerticalScrollIndicator={false}>
        <Categories/>
        {featuredCategories.map((category)=>(
          <FeaturedRow 
          key={category._id}
          id={category._id}
          title={category.name}
          description={category.short_description}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen