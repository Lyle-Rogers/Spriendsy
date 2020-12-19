'use strict'

const Businesses = use('App/Models/Business');

class BusinessController {
  async postBusiness({ request, response, auth }) {
    const business = request.all();

    const posted = await auth.user.businesses().create({
      description: business.description,
      name: business.business_name,
      owner_name: auth.user.username
    });

    return response.redirect('/businesses');
  }
  async loadBusinesses({view, auth}) {
    const businesses = await Businesses
      .query()
      .orderBy('id', '1')
      .fetch()

    const userId = auth.user.id;
    
    return view.render('pages/businesses', { businesses: businesses.toJSON(), userId })
  }

  async deleteBusiness({ params, response }) {
    const business = await Businesses.find(params.id);

    await business.delete();

    return response.redirect('back')
  }

  async editBusiness({ params, view }) {
    const business = await Businesses.find(params.id);

    return view.render('edits/business', { business })
  }

  async updateBusiness({ params, request, response }) {
    const business = await Businesses.find(params.id);
    const businessData = request.all();

    business.name = businessData.business_name;
    business.description = businessData.description;

    await business.save();

    return response.redirect('/businesses');
  }
}

module.exports = BusinessController
