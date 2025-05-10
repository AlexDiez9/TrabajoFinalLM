$(function() { //se ejecuta el Script cuando el documento haya terminado de cargar

    //variables para contar las respuestas acertadas y las respndidas
    let acertadas = 0;
    let respondidas = 0;

    //por cada pregunta coge la opcion correcta para luego compararla con la seleccionada 
    //para añadir clases a las opciones necesarias y que el CSS ponga los estilos
    $(".pregunta").each(function() {
        const $pregunta = $(this); 
        const correcta = $pregunta.attr("data-correcta"); 
        //a cada pregunta le da el valor de la respuesta correcta a la constante "correcta"

        //por cada opcion de una pregunta hace que al hacer click sobre una de ellas compare l  
        $pregunta.find(".opcion").each(function() {
            const $opcion = $(this);
            
            $opcion.on("click", function() { //cuando se hace click en una opcion se ejecuta lo del interior

                //una vez se ha seleccionado una opcion, se añade "desactivada" a todas las opciones
                $pregunta.find(".opcion").addClass("desactivada");
                
                const seleccionada = $opcion.attr("data-opcion"); 
                //le da el valor a la constante "seleccionada" la opcion que se ha seleccionado

                //si la opcion seleccionada es igual a la correcta, se añade la clase "correcta" a la opcion
                if (seleccionada == correcta) { 
                    $opcion.addClass("correcta");
                    acertadas++; //aumenta el numero de acertadas al haber acertado
                } 
                
                //si selecciona una incorrecta, se añade "incorrecta" a la seleccionada
                // y busca la opcion correcta para añadirle "correcta"
                else {
                    $opcion.addClass("incorrecta");
                    $pregunta.find(".opcion[data-opcion='" +correcta+ "']").addClass("correcta");
                }

                respondidas++; //al responder aumenta el numero de respondidas
    
                if (respondidas == $(".pregunta").length) { 
                    //cuando las preguntas respondidas sean igual al total de preguntas muestra el resultado

                    $("#resultado").show(); //hace visible el resultado

                    //escribe el numero de cada variable en el resultado
                    $("#aciertos").text(acertadas);
                    $("#preguntas").text(respondidas);

                    $("html, body").animate({ //baja a la parte del resultado
                        scrollTop: $(document).height()
                    });
                }
            });
        });
    });
});