$(function() { //se ejecuta el Script cuando el documento haya terminado de cargar

    let acertadas = 0;
    let respondidas = 0;

    // Funcion para asignar los eventos a las opciones despues de cargar las preguntas
    function eventosPreguntas() {
        
        // Por cada pregunta, coge la opcion correcta para luego compararla con la seleccionada 
        // para añadir clases a las opciones necesarias y que el CSS ponga los estilos
        $(".pregunta").each(function() {
            const $pregunta = $(this);
            const correcta = $pregunta.attr("data-correcta");

            $pregunta.find(".opcion").on("click", function() { // Cuando se hace click en una opcion se ejecuta lo del interior

                // Añadir "desactivada" a todas las opciones de la pregunta
                $pregunta.find(".opcion").addClass("desactivada");

                const seleccionada = $(this).attr("data-opcion"); 
                // Le da el valor a la constante "seleccionada" la opcion que se ha seleccionado

                // Si la opcion seleccionada es igual a la correcta, se añade la clase "correcta" a la opcion
                if (seleccionada == correcta) { 
                    $(this).addClass("correcta");
                    acertadas++; // Aumenta el numero de acertadas al haber acertado
                } 
                // Si selecciona una incorrecta, se añade "incorrecta" a la seleccionada
                // Y busca la opcion correcta para añadirle "correcta"
                else {
                    $(this).addClass("incorrecta");
                    $pregunta.find(".opcion[data-opcion='" + correcta + "']").addClass("correcta");
                }

                respondidas++; // Al responder aumenta el numero de respondidas
                if (respondidas == $(".pregunta").length) { 
                    // Cuando las preguntas respondidas sean igual al total de preguntas muestra el resultado
                    $("#resultado").show(); // Hace visible el resultado

                    // Escribe el numero de cada variable en el resultado
                    $("#aciertos").text(acertadas);
                    $("#preguntas").text(respondidas);

                    $("html, body").animate({ // Baja a la parte del resultado
                        scrollTop: $(document).height()
                    });
                }
            });
        });
    };


    // Archivos desde los que se sacan las preguntas (los quiz.html)
    const archivos = [
        "./Arte.html", "./Biologia.html", "./Cine.html", "./Culturageneral.html", "./Deportes.html",
        "./FisicaQuimica.html", "./Geografia.html", "./Historia.html", "./Literatura.html", "./Logos.html",
        "./Musica.html", "./Tecnologia.html"
    ];
    const preguntasAleatorias = [];
    const usadas = new Set();
    let todasLasPreguntas = $(); 

    let archivosCargados = 0;

    archivos.forEach(function (archivo) {
        $.get(archivo, function (data) {
            // Extrae solo los elementos con clase "pregunta" del archivo
            let preguntas = $("<div>").html(data).find(".pregunta");
            todasLasPreguntas = todasLasPreguntas.add(preguntas);

            archivosCargados++;

            if (archivosCargados == archivos.length) {
                // Cuando todos los archivos se han cargado

                // Bucle para seleccionar preguntas aleatorias hasta alcanzar 30 preguntas
                while (preguntasAleatorias.length < 30) {
                    // Genera un indice aleatorio entre 0 y el total de preguntas disponibles (360)
                    let indiceAleatorio = Math.floor(Math.random() * todasLasPreguntas.length);

                    // Obtiene la pregunta correspondiente al indice aleatorio
                    let pregunta = todasLasPreguntas.eq(indiceAleatorio);

                    // Obtiene el valor del atributo "aleatorio" para asegurarse de que la pregunta no se repita
                    let idAleatorio = pregunta.attr("data-aleatorio");

                    // Si la pregunta no ha sido seleccionada antes (no esta en el conjunto "usadas")
                    if (!usadas.has(idAleatorio)) {
                        // Se añade el id de la pregunta al conjunto de usadas para no volver a seleccionarla
                        usadas.add(idAleatorio);

                        // Se añada la pregunta a la lista de preguntas aleatorias
                        preguntasAleatorias.push(pregunta.clone());
                    }
                }

                // Limpia el contenido previo en el contenedor con clase "aleatorio"
                $(".aleatorio").empty();

                // Itera sobre las preguntas aleatorias seleccionadas
                preguntasAleatorias.forEach(function (pregunta, indice) {

                    // Añade un encabezado con el numero de la pregunta
                    pregunta.prepend(`<h3>Pregunta ${indice + 1}</h3>`);

                    // Añade la pregunta al contenedor de preguntas aleatorias
                    $(".aleatorio").append(pregunta);
                });

                // Eliminar el número de la pregunta en el <h3>
                $(".aleatorio .pregunta h3").each(function () {
                    let textoPregunta = $(this).text();
                    let textoSinNumero = textoPregunta.replace(/^\d+\.\s*/, ""); // Elimina el número y el punto
                    //^ (inicio del texto), \d+ (1 o mas numeros), \. (un punto), \s+* (o o mas espacios)

                    $(this).text(textoSinNumero);
                });

                // Despues de cargar todas las preguntas, asignamos los eventos de clic a las opciones
                eventosPreguntas();
            };
        });
    });

    
});
