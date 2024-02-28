
//metodos: index, show, update, store, destroy

/**
 * index: Listagem de sessões
 * store: Criar nova sessão
 * show: listar uma unica sessão
 * update: Alterar uma sessão
 * destroy: Destruir uma sessão
 */

import User from '../models/User'
import * as Yup from "yup";


class SessionController{
    async store(req, res){

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        });

        const { email } = req.body;
        

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({erro: 'Insira um email valido'})
        }

        //Verificando se o usuário já existe
        let user = await User.findOne({ email });

        if(!user){
            user = await User.create({ email });
        }
        return res.json(user)
    }
}

export default new SessionController();