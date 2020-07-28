const express = require('express'),
      app = express(),
      axios = require('axios'),
      mongoose = require('mongoose'),
      Quote = require('./Model/Quote')


      mongoose.connect('mongodb://admin:hola666@ds237868.mlab.com:37868/prueba', {useNewUrlParser: true}).then(console.log("yes")).catch(console.log)

      app.get("/guardar", async (req, res) =>  {
        let quotes = new Array()
        let quotes1, quotes2
        try {
          quotes1 = await axios.get('http://www.textfiles.com/humor/TAGLINES/quotes-1.txt')
          quotes2 = await axios.get('http://www.textfiles.com/humor/TAGLINES/quotes-2.txt')

        } catch (e) {

        } finally {
          const quotesArr1 = quotes1.data.split("*")
          const quotesArr2 = quotes2.data.split("*")
          quotes = [...quotesArr1, ...quotesArr2]

          for(key in quotes)  {
            console.log("quote: ", quotes[key])
            const QuoteM = new Quote({quote: quotes[key]})
            QuoteM.save()
          }
        }
      })

      app.get("/obtener", (req,res) =>  {
        Quote.findOneRandom((err, result) => {
          const quote = (err) ? {} : result
          res.send(quote.quote)
        });
      })

  app.listen(3000)

/*
Instrucciones
Generar una aplicación con un backend que cargue esta lista de quotes a una base de datos y muestre en una interfaz de usuario, un quote aleatorio al clic de un botón.

Parte 1
Muestra un random quote en una interfaz de frontend.

Parte 2
Permitir grabar un nuevo quote desde el frontend.

Parte 3
Determinar si el quote es divertido:

Sumar los valores ascii de todos los caracteres del quote y determinar si el resultado es:

Par: no divertido

Impar: divertido

La cantidad de vocales es más de 0.65 veces la cantidad de consonantes: El mejor chiste de la historia

Requerimientos:
Node.js
Express
Alguna una base de datos

http://www.textfiles.com/humor/TAGLINES/quotes-1.txt
http://www.textfiles.com/humor/TAGLINES/quotes-2.txt
*/
