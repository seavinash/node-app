const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', 'app-views');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}, ${req.method}, ${req.url} \n`;
    fs.appendFile('server.log', log, (err) => {
        if (err) {
            console.log('Unable to write to the file');
        }
    });
    next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/app-views');
hbs.registerHelper('getCurrentYear', () => {
    var d = new Date();
    return d.getFullYear();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
      title: "Home"
  });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: "About Us"
    });
});

app.get('/services', (req, res) => {
    res.render('services.hbs', {
        title: "Our Services"
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        title: "Our Projects"
    })
})

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
