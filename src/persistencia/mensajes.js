import { normalize, schema, denormalize } from 'normalizr';
import {messageModel} from '../models/mensaje'

const author = new schema.Entity('author', {}, { idAttribute: 'email' });

const msge = new schema.Entity(
    'message',
    {
      author: author,
    },
    { idAttribute: '_id' }
  );
  
  const msgesSchema = new schema.Array(msge);
  
class Mensajes {
    getAll = async() => {
        try {
            
            let messages = (await messageModel.find()).map((aMsg) => ({
              _id: aMsg._id,
              author: aMsg.author,
              text: aMsg.text,
            }));
        
            let normalizedMessages = normalize(messages, msgesSchema);
            
           
            return normalizedMessages;
          } catch (err) {
            
            console.log(err);
          }
        
    }

    add = async(messageData) =>{
        try {
          let nuevoMensaje = new messageModel(messageData)
          let mensajeGuardado =  await nuevoMensaje.save()
          return mensajeGuardado
          
        } catch (error) {
         console.log(error) 
        }
   
       

    }
}
export const mensajesPersistencia = new Mensajes();