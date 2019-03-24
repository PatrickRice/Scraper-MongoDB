# Scraper-MongoDB

The Scraper-MongoDB App web scrapes the Wall Street Journal's (WSJ) "What's News" board to create a summarization of recent news articles that is displayed to the user with the option to save articles to the database and perform other CRUD actions.

Application Flow:

- When the user clicks the "Scrape Articles" button, the cheerio NPM package is used to perform web scraping of the WSJ "What's News" board for recent news stories and the scraped data is then displayed to the user as a picture, title (that also links to the article on the WSJ site if clicked), the article summary, and the date/time the article was last updated.  A button giving the user the option to save the article is also rendered.

- The "Clear Articles" button in the navigation bar gives the user the option to clear all scraped articles from the page.

- If the user clicks, the "Save Article" button, the selected article is saved to the database per the Article schema model and the button display changes to indicate the user has saved that article.

- If the user clicks on the "Saved Articles" link in the navigation bar, Express routing is utilized to take the user to a different page which renders the content for each article currently stored on the database and gives the user the option to "Unsave Article" or "Add Note" to each currently saved article.

- If "Unsave Article" is clicked, the article and any associated notes are deleted from the database.

- If "Add Note" is clicked for a saved article, a modal pops up that displays any notes the user has previously entered for that article as well as a text field that gives the user the option to add their own note for that article.  New notes are saved to the database per the Note schema model and joined to their associated article via the "populate" method.

- If the "Scrape New Articles" button is clicked again on the "Home" page, the Wall Street Journal's (WSJ) "What's News" board is scraped again and the results are rendered to the page, but articles that the user has already saved are not displayed to the Home page.

Technologies Utilized:

- MongoDB, Express, Node.js, Javascript/jQuery, cheerio NPM, mongoose NPM, morgan NPM, HTML 


Deployed App Link: https://powerful-mountain-62449.herokuapp.com
