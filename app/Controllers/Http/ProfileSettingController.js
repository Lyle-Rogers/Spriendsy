'use strict'

const NewMessage = use('App/Models/NewMessage')
const User = use('App/Models/User')

class ProfileSettingController {
  async loadEverything({ view, auth }) {
    const newMessages = await NewMessage
      .query()
      .where('to', auth.user.id)
      .orderBy('id', '1')
      .fetch()

    const user = auth.user;
    const inLebaron = auth.user.in_lebaron;
    const friendly = auth.user.friendly;

    return view.render('pages/profile_settings', { newMessages: newMessages.toJSON(), user, inLebaron, friendly })
  }

  async newMessageClicked({ response, params }) {
    const newMessages = await NewMessage
      .query()
      .where({ 'to': params.to, 'sender_id': params.sender_id })
      .delete()

    return response.redirect(`/friends/${params.sender_id}`)
  }

  async deleteNewMessages({ response, params }) {
    const newMessages = await NewMessage
      .query()
      .where({ 'to': params.to, 'sender_id': params.sender_id })
      .delete()

    return response.redirect('/profile_settings');
  }

  async inLebaronClick({ auth, response }) {
    const user = await User.find(auth.user.id)

    if (auth.user.in_lebaron == true) {
      user.in_lebaron = false;
      await user.save();

      return response.redirect('/profile_settings')
    } else {
      user.in_lebaron = true;
      await user.save();

      return response.redirect('/profile_settings')
    }
  }

  async friendlyClick({ auth, response }) {
    const user = await User.find(auth.user.id)

    if (auth.user.friendly == true) {
      user.friendly = false;
      await user.save();

      return response.redirect('/profile_settings')
    } else {
      user.friendly = true;
      await user.save();

      return response.redirect('/profile_settings')
    }
  }

  async saveUsername({ auth, request, response }) {
    const user = await User.find(auth.user.id);
    user.username = request.all().username;
    await user.save();

    return response.redirect('/profile_settings')
  }
}

module.exports = ProfileSettingController
