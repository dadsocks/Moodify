const twitterBase64Key = 'ME15OGVYZEJlRzFYTGNINWd3UkVvQ2RYcjo5dmE5MGxLOExHeFJub3ZPMUZzaENNTjAzbmlBa255a1llRmdIYmFXandRS2RMRVR2Tw==';

const twitterAccess = 'AAAAAAAAAAAAAAAAAAAAAFmW4wAAAAAA5UXCeN%2B2ZrnA0MUIgOWbX%2FDAb4Y%3DzkAKAL3OgoccbJZF1CJVfJ32luuprxYzbJ5JTS86HCnuRECIsz'

const twitterConfig = {headers:{'Authorization':`Bearer ${twitterAccess}`}};

const watsonUserName = '157d4e6e-3738-4362-84d4-b86ebd1e5a1c';

const watsonPassword = "Xf7iZPGRuV4s";

const consumerKey =	"0My8eXdBeG1XLcH5gwREoCdXr";

const consumerSecret = "9va90lK8LGxRnovO1FshCMN03niAknykYeFgHbaWjwQKdLETvO";

const DATABASE_URL = 'mongodb://localhost/moodify';

const PORT = '8080';

module.exports = {
  twitterAccess,
  twitterConfig,
  watsonUserName,
  watsonPassword,
  consumerKey,
  consumerSecret,
  DATABASE_URL,
  PORT};
