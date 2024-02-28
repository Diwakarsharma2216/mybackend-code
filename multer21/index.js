const express=require("express")
const ConntectToDb = require("./db")
const upload = require("./middleware/upload.middleware");
const ejs = require('ejs');
const UserModel = require("./model/user.model");

const app=express()

// Multer middleware usage
app.set('view engine', 'ejs')
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// app.use(multerMiddleware.single('userprofile')); // 'userprofile' should match the field name in your form


app.get('/', (req, res) => {
    res.render('register');
});

app.post('/register', upload.single('userprofile'), async (req, res) => {
    try {
      const { name, email } = req.body;
      const profilePicture = req.file.filename;
  
      // Save user data to MongoDB
      const newUser = new UserModel({ name, email, userprofile: profilePicture });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  








app.listen(8080,async()=>{
    try {
        await ConntectToDb
        console.log("server is running")
    } catch (error) {
        console.log(error.message)
    }
})