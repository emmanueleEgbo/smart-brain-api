import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import { handleRegister } from './controllers/register.js';
import * as register from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';
import * as signin from './controllers/signin.js';
import { handleProfileGet } from './controllers/profile.js';
import * as profile from './controllers/profile.js';
import { handleImage} from './controllers/image.js';
import * as image from './controllers/image.js';
import dotenv from 'dotenv';

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false},
    host : process.env.DATABASE_HOST,
    port : 5432,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PW,
    database : process.env.DATABASE_DB
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: "https://smart-brain-3eok.onrender.com/"
}));
app.options('*', cors())
dotenv.config();

app.get('/', (req, res) =>{res.send('success')})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
  
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app is running on port ${port} !!!!!`);
});