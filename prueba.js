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
