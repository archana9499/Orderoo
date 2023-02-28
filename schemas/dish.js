import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name of Dish',
      type: 'string',
      validation: (Rule)=>Rule.required()
    }),
    defineField({
      name: 'short_description',
      title: 'Short_Description',
      type: 'string',
      validation: (Rule)=>Rule.max(200)
      
    }),
    defineField({
      name: 'image',
      title: 'Image of the dish',
      type: 'image',
     
    }),
    defineField({
      name: 'price',
      title: 'Price of the dish',
      type: 'number',
      
    }),
    
  ],


})
