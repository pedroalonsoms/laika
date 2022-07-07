# Laika

Administration system for homeless animal adoptions.

Created for the Laika Organization in Culiacán Sinaloa as a social service project.

# Run Locally

Make sure to have node installed on your computer

```bash
npm install
npm run dev
```

# ToDo

## Pedro

### Complicado

- [ ] Search Filters
- [ ] Pagination/Infinite Scroll
- [ ] Calendar View (como Reminders)
- [ ] Protected Routes to Edit and Delete (Prompt)

### Sencillo

- [x] Asterisco para los forms opcionales
- [x] Arreglar editar animal
- [x] Crear animal: (opcionales) Alias, Señas Particulares y Fotos
- [x] Crear animal: añadir color de animal (Blanco, Negro, Café y Otro) (obligatorio)
- [ ] Crear animal: meses y años, guardar la fecha de nacimiento estimada (obligatorio)
- [x] Crear campo para PetcoID (opcional) (numero entero)
- [x] Crear rescate: (opcionales) Codigo Postal, Colonia y Calle, Rescatista. (quitar) Notas
- [x] En la cita agregar campo para descripción (obligatoria)
- [ ] Adopciones (opcionales) Regreso, Calle
- [ ] Adopción quitar calle y solo imprimir en la tabla municipio y colonia
- [ ] Dropdowns for knowing which vaccines the animal has
- [ ] Add references
- [ ] Deployment

## (Juan, Rogelio, Ozner y JC)

- [ ] Error handling (try/catch) y mensajes de error (Si ponen " " muchos espacios vacíos, debe marcar error también). Tal vez con mongoose validators (?)
- [ ] Tablas headers centrados
- [ ] Calendar View (el de Rey)
- [ ] Zip Codes JSON data using Js
- [ ] Betatesting
- [ ] Pasar los datos de la base antigua a la nueva manualmente
- [ ] Print Paper Animal Details (Ctrl + P)
