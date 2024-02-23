import express from 'express';
import routes from'./routes';
import mongoose from 'mongoose';

class App{
    constructor(){
        this.server = express();
        mongoose.connect('mongodb+srv://devhouse:devhouse@datahouse.jvw2kfm.mongodb.net/?retryWrites=true&w=majority&appName=datahouse', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

export default new App().server;