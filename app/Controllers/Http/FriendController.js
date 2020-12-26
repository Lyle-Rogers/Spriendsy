'use strict'

const User = use('App/Models/User');
const Friend = use('App/Models/Friend')
const NewMessage = use('App/Models/NewMessage')

class FriendController {
  async renderFriends({view}) {
    const friends = await User
      .query()
      .orderBy('id', '1')
      .fetch();

    return view.render('pages/friends', { friends: friends.toJSON() });
  }

  async friendMessagesLoader({ params, auth, view }) {
    const friends = await User
      .query()
      .orderBy('id', '1')
      .fetch();

    const friendClicked = params.id;
    const userMessagedId = params.id;
    const userId = auth.user.id;

    const messages = await Friend
      .query()
      .where({ 'user_messaged_id': params.id, 'user_id': userId })
      .orWhere({ 'user_messaged_id': userId, 'user_id': params.id })
      .orderBy('id', '1')
      .fetch()

    return view.render('pages/friends', { friends: friends.toJSON(), userId, messages: messages.toJSON(), friendClicked, userMessagedId });
  }

  async sendMessage({ request, auth, response }) {
    const message = request.all();

    const sendMessage = await auth.user.friendMessages().create({
      message: message.friend_message,
      user_messaged_id: message.user_messaged_id
    })

    const newMessageNotifier = await NewMessage.create({
      to: message.user_messaged_id,
      sender_username: auth.user.username,
      sender_id: auth.user.id
    })

    return response.redirect('back');
  }

  async deleteMessage({ params, response }) {
    const message = await Friend.find(params.id);
    await message.delete();

    return response.redirect('back');
  }
}

module.exports = FriendController
