# Laika

Tried to implement an administration system for homeless animal adoptions for a non-profit organization as a social service project within a team of 5. Based on an existing app. Page is currently down, it has a lot of bugs.

# Features

- Database CRUD operations
- Image uploading
- Authentication
- Protected routes
- Generating PDF’s
- Data filtering

# Known Issues

- MongoDB has no migrations
- Due to memory leaks, the server has to be restarted manually once in a while
- Image upload is limited to 1mb
- Image uploading is slow
- The VPS has only 512mb of ram, it's insufficient to perform automatic updates, so we have to manually go and update dependencies to prevent security issues
- Photos appear rotated on iOS
- More issues described on the GitHub issue's tab
- The organization no longer paid for the domain

# To Improve

- Implement accesibility
- Implement semantic HTML
- Store cookies on Redis instead of Mongo
- Sharp library requires a using a obscure custom memory-allocator [libjemalloc](https://github.com/jemalloc/jemalloc) to prevent memory leaks, which is painful to install
- Pdf generation is done server-side with an obscure library. It could be better if we use a `@media print` query directly from client side
- Project has no typesafety whatsoever
- Try and think about other login mechanism
- Improve security of cookies by supporting HTTPS
- Enable image uploads of more than 1mb
- Add swap memory files
- Redesign the page
- Migrate away from EJS templates
- Migrate away from MongoDB
- Restore the domain
- Implement AWS S3 instead of sending images through Nginx
- Try a different approach for the backend, maybe a CMS instead of using AWS
- Make the CSS code cleaner
- Migrate database to SQL/CMS
- Lazy load images

# Tech Stack

- HTML
- JavaScript
- CSS
- Node
- MongoDB
- EJS
- Linux
- Amazon Web Services
- Nginx

# Run Locally

Make sure to have Node and Mongodb installed on your computer

```console
npm install
npm run dev
```

# Authors

- Pedro Moreno
- Juan Hernández
- Rogelio Lizárraga
- Juan Bernal
- Ozner Leyva

Credits to Rey Vega and Agustín Quintanar, authors of the first version of the app

# References

- [First version](https://github.com/ReyVega/Laika_WebPage) of the app

- Neighborhoods data from [Correos de México](https://www.correosdemexico.gob.mx/SSLServicios/ConsultaCP/CodigoPostal_Exportar.aspx)

- Municipalities data from [INEGI](https://cuentame.inegi.org.mx/monografias/informacion/sin/territorio/div_municipal.aspx?tema=me&e=25)

- Default images from [Freepik](https://www.freepik.es/fotos/perro-mestizo)

- Inspired design from [Gitpod](https://www.gitpod.io/)

- Used a lot of [StackOverflow](https://stackoverflow.com/)

- YouTube Tutorials from [Fazt](https://www.youtube.com/@FaztTech)

# Open Source Libraries

- [Connect Mongo](https://github.com/jdesboeufs/connect-mongo)
- [Dotenv](https://github.com/motdotla/dotenv)
- [Ejs](https://github.com/mde/ejs)
- [Express](https://github.com/expressjs/express)
- [Express Async Errorrs](https://github.com/davidbanham/express-async-errors)
- [Express Session](https://github.com/expressjs/session)
- [Multer](https://github.com/expressjs/multer)
- [PDFKit Table](https://github.com/natancabral/pdfkit-table)
- [Sharp](https://github.com/lovell/sharp)
- [Nodemon](https://github.com/remy/nodemon)
- [Node Xlsx](https://github.com/mgcrea/node-xlsx)
- [Node](https://github.com/nodejs/node)
