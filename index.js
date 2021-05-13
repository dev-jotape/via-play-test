const app = require('./config/server.js');

const trailer = require('./src/routes/trailer.route');

app.use('/trailer', trailer);

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
});