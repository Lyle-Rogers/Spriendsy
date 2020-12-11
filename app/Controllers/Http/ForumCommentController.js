'use strict'

const ForumMessages = use('App/Models/ForumMessages');
const ForumComment = use('App/Models/ForumComment')

class ForumCommentController {
  async commentLoader({ view, params, auth }) {
    const messageBeingCommented = await ForumMessages.find(params.id);

    const comments = await ForumComment
      .query()
      .where('forum_message_id', params.id)
      .fetch()

    const theId = auth.user.id;

    return view.render('comments/forum_comments', { messageBeingCommented: messageBeingCommented, comments: comments.toJSON(), theId });
  }

  async sendComment({ request, auth, response, params }) {
    const comment = request.all();

    const forumMessageId = params.id;

    const forumMessage = await ForumMessages.find(params.id);

    const userId = auth.user.id;
    const username = auth.user.username;

    const posted = await ForumComment.create({
      comment: comment.forum_comment_message,
      user_id: userId,
      username: username,
      forum_message_id: forumMessageId
    });

    const commentCount = await ForumComment
      .query()
      .where('forum_message_id', params.id)
      .getCount();

    forumMessage.comment_amount = commentCount;

    await forumMessage.save();

    return response.redirect('back');
  }

  async deleteComment({ params, response }) {
    const comment = await ForumComment.find(params.id);
    await comment.delete();

    return response.redirect('back');
  }
}

module.exports = ForumCommentController
