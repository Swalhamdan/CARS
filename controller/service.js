const Service = require('../model/service');

/* 
    Endpoints: CRUD
*/
module.exports.index = async (request, response) => {
    const services = await Service.find({});
    response.render('service/index', {services});
};


// --- Create ---- \\
module.exports.renderNewForm = (request, response) => {
    response.render('service/create');
}


module.exports.createService = async (request, response) => {
    const service = new Service(request.body.service)
    await service.save()
    response.redirect(`/service/${service._id}`)
}

// --- Read ---- \\

module.exports.showService = async (request, response) => {
    const service = await Service.findById(request.params.id)
    response.render('service/show', { service });
}

// --- Update ---- \\

module.exports.renderUpdateForm = async (request, response) => {
    const service = await Service.findById(request.params.id) 
    response.render('service/edit', { service });
}

module.exports.updateService = async (request, response) => {
    const { id } = request.params;
    console.log(request)
    const service = await Service.findByIdAndUpdate(id, { ...request.body.service });
    response.redirect(`/service/${service._id}`)
}

// --- Delete ---- \\

module.exports.deleteService = async (request, response) => {
    const { id } = request.params; 
    await Service.findByIdAndDelete(id);
    response.redirect('/');
}
