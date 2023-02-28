import {defineType, defineArrayMember} from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: 'Featured Menu Categories',
  name: 'featured',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Featured category name',
      type: 'string',
      validation: (Rule)=>Rule.required()
    },
    {
      name: 'short_description',
      title: 'Short_Description',
      type: 'string',
      validation: (Rule)=>Rule.max(200)
    },
    {
      name:"restaurants",
      title:"Restaurants",
      type:"array",
      of:[{type:"reference",to:[{type:"restaurant"}] }],
      
    }
  ]
})
