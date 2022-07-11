# Laika

Administration system for homeless animal adoptions.

Created for the Laika Organization in Culiacán Sinaloa as a social service project.

# Stack

- JavaScript
- Node
- MongoDB
- EJS

# Run Locally

Make sure to have Node and Mongodb installed on your computer

```bash
npm install
npm run dev
```

# ToDo

## Pedro

### Complicado

- [x] Search Filters
- [x] Pagination/Infinite Scroll
- [x] Calendar View (como Reminders)
- [x] Protected Routes to Edit and Delete (Prompt)

### Sencillo

- [x] Asterisco para los forms opcionales
- [x] Arreglar editar animal
- [x] Crear animal: (opcionales) Alias, Señas Particulares y Fotos
- [x] Crear animal: añadir color de animal (Blanco, Negro, Café y Otro) (obligatorio)
- [x] Crear animal: meses y años, guardar la fecha de nacimiento estimada (obligatorio)
- [x] Crear campo para PetcoID (opcional) (numero entero)
- [x] Crear rescate: (opcionales) Codigo Postal, Colonia y Calle, Rescatista. (quitar) Notas
- [x] En la cita agregar campo para descripción (obligatoria)
- [x] Adopciones (opcionales) Regreso, Calle
- [x] Adopción quitar calle y solo imprimir en la tabla municipio y colonia
- [x] Dropdowns for knowing which vaccines the animal has
- [x] Add references
- [ ] Deployment (set server hour to gmt-6)

- [ ] Agregar campo de otro y descripcion en eventos
- [ ] Cambiar toipo a especie
- [ ] Mandar pdf de las screen de la pagina (con los menús) y logo de laika
- [ ] Parcino, Siamés, atigrado (agg colores)
- [ ] Sexo (agg otro)
- [ ] Telefono en adopciones agregar (obligatorio), perfil de redes o correo (opcional)
- [ ] Cambiar Adoptado Por (Cuidado por) y Adopciones por (Hogar)
- [ ] Filtro calendario desde una fecha hasta otra fecha
- [ ] Adopcion agregar edad de adopcion
- [ ] Crear pdf con datos para imprimir (eventos, rescate, hogares(censurados), ), que sean opcinoales
- [ ] Busqueda para buscar los que NO tengan un evento
- [ ] Agregar nota médica, text_area grande en eventos
- [ ] Adopciones apartado para notas grande al final
- [ ] Adopciones editar
- [ ] Orden de fotos dejar asi
- [ ] Laika vs Cuidadano en Otro Rescate
- [ ] Logo de Laika al Final
- [ ] colores para la tipografia, verde aqua y rosa fucsia (colores personalizados), solo un diseño #6ea6a5 verde aqua #8a1b70 Rosa-Morado
- [ ] Pedir contraseña para editar y para poder acceder a ver los datos (dos veces)
- [ ] Laika juntar ambas paginas en un dominio
- [ ] Migrar de Wix a Laika.org

## (Juan, Rogelio, Ozner y JC)

- [ ] Error handling (try/catch) y mensajes de error (Si ponen " " muchos espacios vacíos, debe marcar error también). Tal vez con mongoose validators (?) o npm zod (?) o función trim (?)
- [ ] Tablas headers centrados
- [ ] Calendar View (el de Rey)
- [x] Zip Codes JSON data using Js
- [ ] Betatesting
- [ ] Pasar los datos de la base antigua a la nueva manualmente
- [ ] Print Paper Animal Details (Ctrl + P)

# Authors

- Pedro Moreno
- Juan Hernández
- Rogelio Lizárraga
- Juan Bernal
- Ozner

(Credits to Rey Vega and Agustín Quintanar)

# References

[1st version of the app](https://github.com/ReyVega/Laika_WebPage)

[Neighborhoods data](https://www.correosdemexico.gob.mx/SSLServicios/ConsultaCP/CodigoPostal_Exportar.aspx)

[Municipalities data](https://cuentame.inegi.org.mx/monografias/informacion/sin/territorio/div_municipal.aspx?tema=me&e=25)

[Default images](https://www.freepik.es/fotos/perro-mestizo)
