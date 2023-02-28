import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { selectBasketTotal, selectedBasketItems } from "../slices/basketSlice";
import Currency from "react-currency-formatter";

const Basket = () => {

    const navigation = useNavigation();
    const items = useSelector(selectedBasketItems);
    const basketTotal = useSelector(selectBasketTotal);

    if (items.length === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity onPress={() => navigation.navigate("Basket")}
        className="bg-[#6dafb0] mx-5 p-4 rounded-lg flex-row items-center space-x-1">
            <Text className="text-white font-extrabold text-lg bg-[#1e3d45] py-1 px-2">
          {items.length}
            </Text>
            <Text className="flex-1 text-white font-extrabold text-lg text-center">
            View Basket
            </Text>
            <Text className="text-lg text-white font-extrabold">
            <Currency quantity={basketTotal} currency="INR" />
            </Text>

      </TouchableOpacity>
    </View>
  )
}

export default Basket