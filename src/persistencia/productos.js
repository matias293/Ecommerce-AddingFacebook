
import Product from '../models/product'


class Productos {
    getAll = async() =>{
      try {
        const products =  await Product.find()
          return products
        
      } catch (error) {
        console.log(error)
      }
      
      }
    
      getProduct = async(id) =>{
        try {
          const product = await Product.findById(id)
          return product
          
        } catch (error) {
          
          console.log(error)
        }
    }

      add = async(data) => {
        try {
          const product = new Product(data)
          await product.save()
          
        } catch (error) {
          
          console.log(error)
        }

      }

      update = async(id, data )=> {
        try {
          await Producto.findByIdAndUpdate(id,data)
          
        } catch (error) {
          console.log(error)
          
        }
      }

      delete = async(id) => {
       try {
         const product = await products.findByIdAndDelete(id);
         return product
         
       } catch (error) {
         console.log(error)
       }
      }
    
}

export const productsPersistencia = new Productos();