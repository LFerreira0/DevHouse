import express from 'express';
import routes from'./routes';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path'

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
        this.server.use(cors());
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        )
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

export default new App().server;