import Reserva from "../models/Reserva";
import User from "../models/User";
import House from "../models/House";

class ReserveController {

    async index(req, res){
        const { user_id } = req.headers;
        const reserves = await Reserva.find({ user: user_id }).populate('house');
        return res.json(reserves);
    }

    async store(req, res){
        const { user_id } = req.headers;
        const { house_id } = req.params;
        const { date } = req.body;
    
        const house = await House.findById(house_id);
        if(!house){
          return res.status(400).json({ error: 'Essa casa não existe.' });
        }
    
        if(house.status !== true){
          return res.status(400).json({ error: 'Solicitação indisponivel.' });
        }
    
        const user = await User.findById(user_id);
        if(String(user._id) === String(house.user)){
          return res.status(401).json({ error: 'Reserva não permitida.' });
        }
    
        const reserve = await Reserva.create({
          user: user_id,
          house: house_id,
          date,
        });
    
        await reserve.populate('house').populate('user').execPopulate();
    
        return res.send();
      }
    

    async destroy(req, res){
        const { reserve_id } = req.body;
        await Reserva.findByIdAndDelete({ _id: reserve_id});
        return res.send();
    }
}

export default new  ReserveController()