'use strict'
const User = use('App/Models/User');


class UserController {
    async index({ request, response }) {
        let json = {
            index: 'Holaa'
        }
        let user = await User.query().fetch();
        return response.json(user);
    }

    async store({ request, response }) {
        console.log(request.all())
        let user = User.create(request.all())
        return response.status(200).json(request.all());
    }

    async show({ params, request, response, view }) {
        console.log(params)
        let {id} = params
        let user = await User.find(id)
        return response.json(user)
    }

    async update({ params, request, response }) {
        let data = request.all()
        let {id} = params
        let user = await User.find(id)
        if (!user) {
            return response.status(404).json({data: 'No existe'})
        }
        user.merge(data)
        user.save(data)
        console.log(id,data)
        return response.status(200).json(user)
    }
    async destroy({ params, request, response }) {
        let {id} = params
        let user = await User.find(id)
        if (!user) {
          return response.status(404).json({data: 'No existe'})
        }
        await user.delete()
        return response.status(200).json('Eliminado')
    }
}

module.exports = UserController
