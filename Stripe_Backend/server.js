

 require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_APIKEY);
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.static('public'));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());



app.use(
  cors({
   
    origin: ["http://localhost:3000/", "https://checkout.stripe.com", "https://magickart.vercel.app/" ],
  })
)


const YOUR_DOMAIN = 'https://magickart.vercel.app/';

app.get('/', (req,res) => {

  res.send('Hello World!')

})

app.post('/create-checkout-session',  async (req, res) => {

  console.log("gello");
  
  const param = {

  

  line_items: req.body.map((item) => {

//    const img = item.image[0].asset._ref;
//   const newImage = img.replace('image-', 'https://cdn.sanity.io/images/1b3e4v4k/production/').replace('-webp', '.webp');
    
      
     

    return { 
      
      price_data: { 
        currency: 'inr',
        product_data: { 
          name: item.name,
//           images: [newImage],
        },
        unit_amount: item.price * 100,
      },
      adjustable_quantity: {
        enabled:true,
        minimum: 1,
      },
      quantity: item.productQty

    }
    
  
  
  }),
    
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}Success`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  }
  const session = await stripe.checkout.sessions.create(param);

  //res.redirect(303, session.url);
  res.json({url: session.url})
});

app.listen(4242, () => console.log('Running on port 4242'));
