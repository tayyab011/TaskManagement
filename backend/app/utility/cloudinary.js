import { v2 as cloudinary } from "cloudinary";


/* const CLOUDE_NAME = 'dswhk92qa';
const API_KEY = '894487917853816';
const  API_SECRET = 'ex_VSEo7vl8J1WVqGOjsIkQTiwE'; */
cloudinary.config({
  cloud_name: "dswhk92qa",
  api_key: "894487917853816",
  api_secret: "ex_VSEo7vl8J1WVqGOjsIkQTiwE",
});

export default cloudinary;
