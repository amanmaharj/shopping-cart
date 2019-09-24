const Product=require('../models/product')

const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/shopping-cart',{
  useNewUrlParser: true,
  useCreateIndex: true
})

const products=[
new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Gothiccover.png/220px-Gothiccover.png',
    title: 'Gothic Vide Game',
    description: 'Awesome Game!!!',
    price: 09  
}),
new Product({
    imagePath: 'https://images.g2a.com/newlayout/600x351/1x1x0/bcc4cf1c12d2/5b4f34d9ae653a3e873aa442',
    title: 'Call of Duty Video Game',
    description: 'One of the best rpg game right now',
    price: 10  
}),
new Product({
    imagePath: 'https://www.mobygames.com/images/covers/l/240130-dark-souls-xbox-360-front-cover.jpg',
    title: 'Dark Souls Video Game',
    description: 'Souls is a series of action role-playing games developed by FromSoftware.',
    price: 13  
}),
new Product({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/512dVKB22QL.png',
    title: 'The Minecraft Video Game',
    description: 'It really a fun Game.',
    price: 25 
}),
new Product({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/91TuxrqsQhL._SL1500_.jpg',
    title: 'The Last Of Us Video Game',
    description: 'The Last of Us is an action-adventure survival horror video game developed by Naughty Dog.',
    price: 15
}),
new Product({
    imagePath: 'https://microplay.com/media/catalog/product/cache/f3bf28a13af81a177e7f29529d01f858/6/2/6251_cover_1.jpg',
    title: 'Rocket League Video Game',
    description: 'Rocket League is a vehicular soccer video game developed and published by Psyonix.',
    price: 10  
})

]
// var done=0
// for(i=0;i<products.length;i++){
//     products[i].save(function(){
//         done++
//         if(done===products.length){
//             exit()
//         }
//     })
// }
// function exit(){
//     mongoose.disconnect();
// }
const productSave=async (products)=>{
    
        for(i=0;i<products.length;i++){
            await products[i].save()
        }
    await mongoose.disconnect()
   
}
productSave(products)

