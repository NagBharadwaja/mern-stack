This project is a simple MERN stack application that is built from scratch without using any libraries like create-react-app or vite.
Everything is configured from scratch to work.

The approach I took in steps are as below:
1. Create Database in MongoDB Atlas
2. Set up Backend
   - Install express, cors, dotenv, mongoose dependencies
   - Setup Mongoose DB connection and spin the express server. (**NOTE:** We need to store our MongoDB connection string in root folder .env file)
   - Introduce scripts for dev and prd to spin up Node server
   - Create APIs
   - Test APIs in Postman
4. Set up Frontend
   - Install react, react-router, @babel/core, @babel/preset-react, @babel/preset-env
   - Create .babelrc
   - Install Webpack and setup webpack config
   - Introduce dev and prd scripts for Webpack
   - Create root index.js to setup initial root render of the app
       - Create index.html with div id root in same folder
       - Consume root in index.js
       - Render root React component by binding it to the root id DOM.
   - Now, when we run npm run start from Frontend folder, we're able to see our app launch at **http://localhost:8080**
   - Create components
   - Test API calls for CRUD operations
5. At this point we're able to run both frontend and backend servers separately and we're able to perform CRUD operations as intended.
6. Now, we need to configure so that we're able to launch our app (Frontend & Backend) on a single server for Production use.
   -  To be able to serve our frontend content from our backend server we need to register the Frontend's dist folder as static content.
     
       if (process.env.NODE_ENV === "production") {
      
            // Register dist folder as static content to serve it to the client
      
            app.use(express.static(path.join(__dirname, '/frontend/dist')))
      
            // Sending Frontend/dist/index.html for any requests from the client except for the API requests
      
            app.get('*', (req, res) => {
      
                res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
      
            })
      
        }
      
   - In root package.json, introduce two scripts. One to install and build Frontend and Backend dependencies and Two to run our server in PRD mode (node server.js)
     
     "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend",
     
     "start": "SET NODE_ENV=production&& node backend/server.js"
     
7. Now when we run npm run build AND npm run start from root folder, we can see the dependencies for server and Frontend being installed AND a dist folder being
   generated in Frontend folder accordingly.
8. Now when we run our application via **http://localhost:5000**, we see our application being launched and functional.
