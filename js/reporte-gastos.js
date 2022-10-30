/***
                                                                                                       
 */
$(document).ready(function() {
	escuchar_elementos();
	poner_fechas();
	consulta_gastos( $("#fecha_inicio").val(), $("#fecha_fin").val() );
	$("li#elem_reportes").addClass("active");
});
function escuchar_elementos(){
	$("#fecha_inicio, #fecha_fin").on("change", function(){
		consulta_gastos( $("#fecha_inicio").val(), $("#fecha_fin").val() );
	});

	$("#generar_reporte").click(function(){
		window.print();
	});
}

function dibuja_tabla_caja(datos){
	$( "#caja_chica, #gastos, #ventas, #total_caja" ).text("").parent().hide();
	$( "#generar_reporte" ).hide();
	$( "#contenedor_tabla" )
	.empty();
	if (datos.length <= 0) return;
	ayudante_total = 0;
	$( "#contenedor_tabla" )
	.append(
		$( "<table>" )
		.addClass( 'table table-striped table-bordered table-hover table-condensed' )
		.append(
			$( "<thead>" )
			.append(
				$( "<tr>" )
				.append(
					$( "<th>" )
					.html('Importe'),
					
					$( "<th>" )
					.html('Concepto'),
					
					$( "<th>" )
					.html('Descripción'),
					
					$( "<th>" )
					.html('Número de remisión'),
					
					$( "<th>" )
					.html('Fecha'),
					
					$( "<th>" )
					.html('Usuario')
				)
			)
		)
		.append(
			$( "<tbody>" )
		)
	);
	var ayudante_total = 0;
	for (var i = datos.length - 1; i >= 0; i--) {
		ayudante_total += parseFloat( datos[i].importe );
		$( "#contenedor_tabla tbody" )
		.append( 
			$("<tr>")
			.append(
				$("<td>").html(datos[i].importe),
				$("<td>").html(datos[i].concepto),
				$("<td>").html(datos[i].descripcion),
				$("<td>").html(datos[i].no_remision),
				$("<td>").html(datos[i].fecha),
				$("<td>").html(datos[i].usuario)
			)
		);
	}
	ayudante_total = Math.round(ayudante_total * 100) / 100;
	$("#total_gastos").text(ayudante_total).parent().show();
	$( "#generar_reporte" ).show();
	return;
}

function consulta_gastos(fecha_inicio, fecha_fin){
	$.post('./modulos/gastos/consultar_todos_los_gastos.php', {fecha_inicio: fecha_inicio, fecha_fin: fecha_fin}, function(respuesta) {
		respuesta = JSON.parse(respuesta);
		console.log('respuesta ' , respuesta);
		if (respuesta !== false) {
			dibuja_tabla_caja(respuesta);
		}else{
			//Manejar error o respuesta
		}
	});
}

function fecha_de_hoy(){
	var d = new Date( $.now() );
	var año = d.getFullYear();
	var mes_temporal = d.getMonth() + 1;
	var mes = (mes_temporal < 10) ? "0" + mes_temporal : mes_temporal;
	var dia = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate();
	var hora = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
	var minutos = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
	return año + "-" + mes + "-" + dia + "T00:00";
}

function fecha_de_mañana(){
	var d = new Date( $.now() );
	var año = d.getFullYear();
	var mes_temporal = d.getMonth() + 1;
	var mes = (mes_temporal < 10) ? "0" + mes_temporal : mes_temporal;
	var dia = (d.getDate() < 10) ? "0" + d.getDate() : d.getDate();
	var hora = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
	var minutos = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
	return año + "-" + mes + "-" + dia + "T23:59";
}


function poner_fechas(){
	$("#fecha_inicio").val( fecha_de_hoy() );
	$("#fecha_fin").val( fecha_de_mañana() );
}