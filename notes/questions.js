/* 

--GENERAL
//QUESTION: Necesitamos conservar la base de datos existente?
Si
//QUESTION: Tendría problema si hacemos la app en inglés?
Español
//QUESTION: Necesita que las personas normales puedan ver la página? Podríamos generar un PDF de los perritos en adopción mejor?
Privada solamente
//QUESTION: Necesita la función de imprimir? Qué lista necesita imprimir?
Dos usuarios, uno que no pueda editar y otro que sí pueda hacerlo
//QUESTION: Quieren comprar un dominio? 200 al año?
Poner el dominio http://fundacionlaika.org/
//QUESTION: Tenemos presupuesto para el servidor?
Hablar con Rey de Heroku

--USO
//QUESTION: Cómo le hace cuando le llega un perrito?
Inmediatamente va a la veterinaria. Le hacen el diagnóstico y le toman fotos. Luego le programan una fecha para otra revisión.

El registro va antes del diagnóstico. (A veces)
El diagnóstico sucede después. 

Cuando van a hacer el registro ya tienen el diagnóstico y la foto, y el hogar temporal.

//QUESTION: Al registrar un perrito le toma foto, o la foto la agrega después?
Inmediatamente. 
El registro es después o antes del veterinario?

//QUESTION: Cómo utiliza la app normalmente en el día a día?
//QUESTION: Haciendo un Refactor, qué funciones deberíamos mantener?

--FILTRAR
//QUESTION: Necesita la función de filtrar? Qué es lo que necesitan filtrar?
//QUESTION: Para qué es cada pestaña? Las necesitan/usan todas?

General:
Expediente Médico:
Hogar Temporal:
Adopción:

--DATOS DE ANIMALES
//QUESTION: Cuáles son los tipos de animales que maneja? Gatos y perros solamente?
Perros y Gatos.
Conejos, iguanas. Sin adopción. Omitir. Campo de otro y descripción larga. Solo registro.

//QUESTION: Cómo se asigna el nombre del perro? Por qué hay dos nombres? Cuál es la diferencia entre nombre rescatado y nombre adoptado?
Nombre rescatado = Nombre laika. Husky se registra y se promueve en redes como Stella.
Nombre adopción, de la familia. Nieves.

En la práctica busqueda por nombre rescatado o de adopción o por fecha. Búsqueda por género, y especie.

//QUESTION: Cuál es la diferencia entre PETCO ID y ID? Cómo realmente identifican ustedes a un perro? Recuerdan el nombre de cada perro? Tienen un collar para cada perro?

ID: useless
ID PETCO: ID de Petco, se registra hasta que es adoptado.*****

Alianza con Petco. 
Petco les presta los espacios para promoción. En el traslado a petco les dan el ID.

Puede ser que sea adoptado sin pasar por petco? No necesariamente, pueden ser adoptantes propios.
No todos los perros tienen PETCO ID? No necesariamente, puede morir o no ser adoptado.

El traslado a petco cuenta como adopción temporal?
No.

Gatos viven en PETCO.

//QUESTION: Pueden recoger perros fallecidos?
Sí, se puede registrar aunque haya fallecido. Lo incineran después.

//QUESTION: Para qué es la dirección al registrar un perro? La utilizan realmente? Solamente veo Culiacán en ese campo.
Dirección en donde se encontró el perro. Filtrar por Colonia.***** Estadística de Colonia.

//QUESTION: En la edad tiene que ir la edad que tiene el perro actualmente o la edad en la que fue adoptado?
Edad poner meses. ***
Guardar created_at de adopción.
Guardar birth_date NO (tal vez).

Guardar edad_actual y created_at.

//QUESTION: En la adopción es necesario conservar el medio de adopción?
Intagram, Petco, Facebook...

//QUESTION: Una veterinaria se puede quedar para siempre con el perro?
//QUESTION: Una veterinaria puede donar un perro a Laika?
//QUESTION: Qué pasa cuando nacen varios cachorros? Son registrados en la plataforma?


Como es el proceso de rescate?
Rescatistas son voluntarios por lo general. Un externo si puede meter.

Estadística Rescate Laika/Ciudadano, añadir campo de tipo****

Un rescatista puede ser adoptor a la vez?
Sí.

Le podemos preguntar la direccion donde vive el rescatista?
Sí, cuando es ciudadano.
No, cuando es voluntario.

Multiples rescatistas?


--DATOS DE PERSONAS
//QUESTION: En las personas cuál es la diferencia entre nombre adoptante y nombre responsable?
Nombre adoptante:
Nombre responsable: lo omitiremos.

//QUESTION: Cómo funciona lo de rescatistas? Tienen registrados rescatistas? O puede ser cualquier persona?

//QUESTION: Le toman foto al rescatista? Necesitan la dirección y el teléfono del rescatista? Se puede devolver el perro al rescatista? Le marcan de nuevo y le dicen si es posible que se lo lleve él a su casa?
No foto a los rescatistas.

//QUESTION: Cómo funciona lo de hogar temporal? Osea una persona o veterinaria se la puede llevar? Ahí también usan la dirección?
Si.

-- DATOS MÉDICOS
//QUESTION: El expediente médico cómo se genera? Va un médico a revisar qué onda y les da el diagnóstico? O es cuando llegan?
//QUESTION: La cartilla de vacunación es la misma para todos los perros y gatos?

Ordenadas por importancia (Fija para siempre) y por orden.
Perros: Puppy, Refuerzo Puppy, Multiple, Refuerzo Multiple, Rabia
Gatos: Triple Viral Felina, Refuerzo TV Felina, Leucemia, Desparasitación, Rabia


//QUESTION: La desparasitación es vacuna?
No. Cada mes.

//QUESTION: Las vacunas son una sola vez o son periódicas?
//QUESTION: Los rasgos siguientes son comunes para perros y gatos?
Ambos: Atropellamiento, TVT, Sarna/Piel, Viral, Embarazo, Cachorros/Crías, Hemoparásitos, Otro

//QUESTION: Cómo funciona lo de tratamiento? Cada cuánto les dan citas? Cómo guardan las citas? Necesitan guardar las citas? O el doctor va a la veterinaria?
Citas médicas. Cada mes y medio, o cada semana. Agendar.

Los perros van al veterinario. Cada perro tiene una cita agendada.

Agregar comentarios para la cita médica*****.

//QUESTION: Para qué necesitan el calendario? Cómo debería funcionar? 
Calendario es MUY IMPORTANTE.
Como se genera?

Después de una cita se agenda otra. Agregar comentarios****.
El calendario no está funcionando.
Manual.

//QUESTION: En el calendario, se le agenda a cada perro individualmente su cita? O no sería mejor programar la visita general del veterinario, y después manualmente ir añadiendo a los perros afectados?


//QUESTION: Lo del calendario y agendar citas es muy necesario? XD estoy viendo que se complica bastante añadir eso.
Sí es necesario
 */

/* Día 2

 */
