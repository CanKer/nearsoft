const app = require('express')(),
      axios = require('axios'),
      mongoose = require('mongoose'),
      Quote = require('./Model/Quote'),
      settings = require('./conf'),
      { createReadStream } = require('fs')

      mongoose.connect(`${settings.url()}`, {useNewUrlParser: true})
        .then(e =>  {
          console.log("conectado a Mongo");
          app.get("/guardar", async (req, res) =>  {
            let quotes = new Array()
            let quotes1, quotes2
            try {
              quotes1 = await axios.get('http://www.textfiles.com/humor/TAGLINES/quotes-1.txt')
              quotes2 = await axios.get('http://www.textfiles.com/humor/TAGLINES/quotes-2.txt')

              const quotesArr1 = quotes1.data.split("*")
              const quotesArr2 = quotes2.data.split("*")
              quotes = [...quotesArr1, ...quotesArr2]

              for(key in quotes)  {
                const QuoteM = new Quote({quote: quotes[key]})
                QuoteM.save()
              }
              res.status(201).json({mensaje: `Se han agregado ${quotes.length} quotes`})
            } catch (e) {
              res.status(500).json({error: "hubo un error al intentar guardar los elementos"})
            }
          })

          app.get("/obtener", (req,res) =>  {
            Quote.findOneRandom((err, result) => {
              if(!err)  {
                let { quote } = result
                if(quote.length % 2 === 0) quote+= "\n NO DIVERTIDO"
                else quote+= "\n DIVERTIDO"
                res.format({
                  'text/plain': function(){
                    res.send(quote)
                  }
                })
              } else res.status(404).json({"error": "no hay elementos para mostrar"})

            });
          })

          app.get("/stream", (req, res) =>  {
            const file = "./video.mov"
            res.writeHead(200, {'content-type': 'video/mov'})
            createReadStream(file)
              .pipe(res)
              .on("error", console.error)
          })

          app.get("/borrar", async(req,res) =>   {
            let remove
            try {
              remove = await Quote.deleteMany()
              console.log("remove: ", remove.deletedCount)
              res.status(201).send(`Eliminados ${remove.deletedCount} elementos`)
            } catch (e) {
              res.code(500).json({error: "nel"})
            }

          })

          app.listen(3000, () => console.log('servidor corriendo :v'))
        })
        .catch(console.log)



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
