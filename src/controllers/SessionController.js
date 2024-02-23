//metodos: index, show, update, store, destroy

/**
 * index: Listagem de sessões
 * store: Criar nova sessão
 * show: listar uma unica sessão
 * update: Alterar uma sessão
 * destroy: Destruir uma sessão
 */

import User from '../models/User'


class SessionController{
    async store(req, res){
        const { email } = req.body;
        
        //Verificando se o usuário já existe
        let user = await User.findOne({ email });

        if(!user){
            user = await User.create({ email });
        }
        return res.json(user)
    }
}

export default new SessionController();