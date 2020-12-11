'use strict'

const ForumMessages = use('App/Models/ForumMessages')

class ForumMessagingController {
  async messagesLoader({ view, auth }) {
    const forumMessages = await ForumMessages.all();

    const userId = auth.user.id;

    return view.render('pages/forum', { forumMessages: forumMessages.toJSON(), userId });
  }

  async sendMessage({ request, response, auth }) {
    const message = request.all();
    const username = auth.user.username;

    const posted = await auth.user.forumMessages().create({
      message: message.forum_message,
      username: username
    });

    return response.redirect('back');
  }

  async deleteForumMessage({ response, params }) {
    const message = await ForumMessages.find(params.id);

    await message.delete();
    return response.redirect('back');
  }

  async editForumMessage({ params, view, auth }) {
    const theMessage = await ForumMessages.find(params.id);

    const forumMessages = await ForumMessages.all();

    const userId = auth.user.id;

    return view.render('edits/forum_message', { theMessage: theMessage, forumMessages: forumMessages.toJSON(), userId });
  }

  async updateForumMessage({ response, request, params }) {
    const message = await ForumMessages.find(params.id);

    message.message = request.all().forum_message;

    await message.save();

    return response.redirect('/forum');
  }
}

module.exports = ForumMessagingController
