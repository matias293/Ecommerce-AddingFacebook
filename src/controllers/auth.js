
import { fork } from 'child_process';
import path from 'path';
import os from 'os';


const scriptPath = path.resolve(__dirname, '../utils/calculos.js')


class Auth {

    getLogin = (req,res) => {
      
       if(req.isAuthenticated()){
           res.redirect('/')
       }

       res.render('login',{pageTitle:'Login Facebook'})

     }

     postLogin = async(req,res) => {
      if(req.session.loggedIn){
        return res.redirect('/')
       }
       req.session.loggedNormal = true
        await req.session.save()
        return res.redirect('/')
     }

     getLogOut  = (req,res) => {
      if(!req.isAuthenticated()){
         return res.redirect('/login')
      }

        const username = req.user.displayName
         req.logout();
         req.session.destroy(); 
        res.render('logout',{pageTitle:'Log Out',isLogIn:req.isAuthenticated(),username})   
     }

     postLogout = (req,res) => {
      if(!req.isAuthenticated()){
        return res.redirect('/login')
      }
      
     }

     getSignUp = (req,res) => {
        res.render('signup',{pageTitle:'Sign Up'})
     }

     postSignUp = async(req,res) => {
      req.session.loggedIn = true
      await req.session.save()
          res.redirect('/')     
     }

     failPage = async(req,res) => {
        res.render('login-error', {})
     }

     data = (req, res) => {
        
        let foto = 'noPhoto';
        let email = 'noEmail';
      
        if (req.isAuthenticated()) {
          const userData = req.user;
          //reinicio contador
          if (!userData.contador) userData.contador = 0;
          userData.contador++;
      
          if (userData.photos) foto = userData.photos[0].value;
      
          if (userData.emails) email = userData.emails[0].value;
      
          res.render('datos', {
              pageTitle:'Bienvenido',
            nombre: userData.displayName,
            contador: userData.contador,
            foto,
            email,
          });
        } else {
          res.redirect('/api/login');
        }
      }

      info = (req, res) => {

        res.json({'Plataforma':process.platform,
        'Version de Node':process.version,
        'Uso de Memorias':process.memoryUsage(),
        'Path de operacion':process.cwd(),
        'ID del proceso':process.pid,
        'Comando de entrada':process.argv,
        'Numero de procesadores': os.cpus().length})
        
      }

      randoms = (req, res) => {
      

       let {cant} = req.query
        
      const query = cant || 100000000

        const computo = fork(scriptPath,[query]);  
          computo.send('start');
            computo.on('message', (sum) => {
              res.json({
                resultado: sum,
              });
            });
      //  }
      }
}

export const authController = new Auth()