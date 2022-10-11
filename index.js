const app = require('./app');

app.listen(4000, () => {
    console.log(`Express departing from 4000`);
})

/*app.get('/', (req, res) => res.send('Welcome to Budget 2022'));

module.exports = app;*/

// const server = express();
// server.use(cors());
// server.use(express.json());

// const booksRoutes = require('./routes/books')
// const authorsRoutes = require('./routes/authors')

// server.use('/books', booksRoutes)
// server.use('/authors', authorsRoutes)

// server.get('/', (req, res) => res.send('Welcome to the library'))

// module.exports = server
