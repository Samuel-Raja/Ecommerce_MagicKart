

export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'array',
        of: [{ type : 'image'   }],
        options: {
            hotspot: true
          }
        
      },

      {
        name: 'category',
        title : 'Category',
        type: 'string'
      },

      {
        name: 'name',
        title : 'Name',
        type: 'string'
      },

      {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
              source: 'name',
              maxLength: 100  
                  }
      },

      {
        name : 'price',
        title : 'Price',
        type: 'number'
      },

      {
        name : 'details',
        title : 'Details' ,
        type: 'string'
      }

    
    ]
  }