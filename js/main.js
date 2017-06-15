var api = {
    url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics/'
};

var $listaTemas = $("#listaTemas");

var cargarPagina = function () {
    cargarTema();
    //buscarTema();
    $("#add-form").submit(agregarTema);
};

var cargarTema = function (){
  $.getJSON(api.url, function (temas){
    temas.forEach(crearListaTemas);
  });    
  
};

/*var buscarTema = function (){
  $.getJSON(api.url, function (temas){
    temas.forEach(filtrarTema);
  });    
  
};*/

var crearListaTemas = function (temas){
    var titulo = temas.content;
    var autor = temas.author_name;
    var respuestas = temas.responses_count;
    var id = temas.id;
    
    // creamos la fila
    var $tr = $("<tr />");
    // creamos la celda del titulo
    var $tituloTd = $("<td />");
    $tituloTd.text(titulo);
    // creamos la celda del autor
    var $autorTd = $("<td />");
    $autorTd.text(autor);
    // creamos la celda del número de respuestas
    var $respuestasTd = $("<td />");
    $respuestasTd.text(respuestas);
    // agregamos las celdas a la fila
    $tr.append($tituloTd);
    $tr.append($autorTd);
    $tr.append($respuestasTd);
    // agregamos filas a la tabla
    $listaTemas.append($tr);
};

var agregarTema = function (e) {
    e.preventDefault();
    var autorNuevo = $("#temaNuevo").val();
    var contenidoNuevo = $("#contenidoNuevo").val();
    var contador = $("#numeroNuevo").val();
    $.post(api.url, {
        author_name: autorNuevo,
        content: contenidoNuevo,
        responses_count: contador,
    },
        function (temas) {
        crearListaTemas(temas);
        $("#myModal").modal("hide");
    });
};

/*
var filtrarTemas = function (e) {
	e.preventDefault();
    var titulo = temas.content;
	var buscar = $("#busqueda").val().toLowerCase();
	var temasFiltrados = temas.filter(function (temas) {
		return temas.content.toLowerCase().indexOf(criterioBusqueda) >= titulo;
	});
	resultadoTemas(temasFiltrados);
};

plantillaTemas = '<div>' +
        '<h1>' + '__titulo__' + '</h1>' + '<h3>' + '__autor__' + '</h3>' + '<h5>' + '__respuestas__' + '</h5>' + 
    '</div>';

var resultadoTemas = function (temas) {
	var titulo = temas.content;
    var autor = temas.author_name;
    var respuestas = temas.responses_count;
    var id = temas.id;
    
	temas.forEach(function (temas) {
		plantilla += plantillaTemas.replace("__titulo__", temas.titulo)
        .replace("__autor__", temas.autor),
        .replace("__respuestas__", temas.respuestas)	
	});
	$("#resultado").html(plantilla);
};
*/

$(document).ready(cargarPagina);

