'use strict'

const SpiritualQuote = use('App/Models/SpiritualQuote')

class ArchiveController {
  async loadQuotes({ view, auth }) {
    const quotes = await SpiritualQuote
      .query()
      .orderBy('id', '1')
      .fetch()

    const theId = auth.user.id;

    return view.render('pages/archive', { theId, spiritualQuotes: quotes.toJSON() });
  }

  async sendQuote({ request, auth, response }) {
    const quote = request.all();
    const userId = auth.user.id;
    const username = auth.user.username;

    const posted = await SpiritualQuote.create({
      quote: quote.spiritual_quote,
      user_id: userId,
      username: username,
    });

    return response.redirect('back');
  }

  async deleteQuote({ params, response }) {
    const quote = await SpiritualQuote.find(params.id);
    await quote.delete();

    return response.redirect('back');
  }

  async editQuote({ params, view, auth }) {
    const quote = await SpiritualQuote.find(params.id);
    const theId = auth.user.id;
    const editMode = true;

    const spiritualQuotes = await SpiritualQuote
      .query()
      .orderBy('id', '1')
      .fetch()

    return view.render('pages/archive', { quoteBeingEdited: quote, spiritualQuotes: spiritualQuotes.toJSON(), theId, editMode });
  }
}

module.exports = ArchiveController
