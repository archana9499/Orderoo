import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import {
  removeFromBasket,
  selectBasketTotal,
  selectedBasketItems,
} from "../slices/basketSlice";
import { Ionicons } from "@expo/vector-icons";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectedBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);


  return (
    <SafeAreaView className="flex-1 bg-[#4cbbbd]">
      <View className="flex-1 bg-[#4f96a8]">
        <View className="p-5 border-b border-[#6dafb0] bg-[#a9dadb] shadow-sm">
          <View>
          <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-gray-400 text-center">{restaurant.name}</Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <Ionicons name="close-circle" size={30} color="#297f94" />
          </TouchableOpacity>

          
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-[#a9dadb] my-5">
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Delivery in 30 -35 mins</Text>
          <TouchableOpacity>
            <Text className="text-[#6dafb0]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-[#a9dadb] py-2 px-5"
            >
              <Text className="text-[#6dafb0]">{items.length} x</Text>
              <Image
                source={{
                  uri: urlFor(items[0]?.image).url(),
                }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>

              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="INR" />
              </Text>

              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ id: key }))}
              >
                <Text className="text-[#6dafb0] text-xs">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-[#a9dadb] mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-[#297f94]">Subtotal</Text>
            <Text className="text-[#297f94]">
              <Currency quantity={basketTotal} currency="INR" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-[#297f94]">Delivery Fee</Text>
            <Text className="text-[#297f94]">
              <Currency quantity={47} currency="INR" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              <Currency quantity={basketTotal + 47} currency="INR" />
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrder")}
            className="rounded-lg p-4 bg-[#297f94]"
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default BasketScreen