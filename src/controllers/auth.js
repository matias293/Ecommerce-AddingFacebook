import bcrypt from'bcryptjs'
import { session } from 'passport'

import Usuario from '../models/usuario'


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

}

export const authController = new Auth()