var listaActual = JSON.parse(localStorage.getItem("miLista")) || [];
var listaPedidos = JSON.parse(localStorage.getItem("listaPedidos")) || [];

function anyadirCarrito(x) {
	var listaProductos = [["Mechero Zenith Flame", "10", 1], ["Mechero Sparkle Blaze", "16", 1], ["Mechero Vintage Glow", "11", 1], ["Mechero Eco-Fire", "18", 1], ["Mechero Adventure Torch", "14", 1], ["Mechero Glamour Flare", "15", 1], ["Mechero Bohemian Blaze", "9", 1], ["Mechero Tech Spark", "112", 1], ["Mechero Clásico Elegance", "13", 1]];

	var producto = listaProductos[x];
	var encontrar = false;
	var posicion;
	for (var i = 0; i < listaActual.length; i++) {
		var articulo = listaActual[i];
		if (articulo[0] == producto[0]) {
			encontrar = true;
			posicion = i;

		}
	}

	if (encontrar) {

		listaActual[posicion][2] = listaActual[posicion][2] + 1

		localStorage.setItem("miLista", JSON.stringify(listaActual));

	} else {
		listaActual.push(producto);
		localStorage.setItem("miLista", JSON.stringify(listaActual));
	}
	location.reload();
}

function carrito() {
	var codigo = "";
	for (var i = 0; i < listaActual.length; i++) {
		var articulo = listaActual[i];
		var mostrar = `<div class="row border-top border-bottom">
					<div class="row main align-items-center">
						<div class="col-4">
							<svg class="bd-placeholder-img card-img-top" width="100%" height="225"
								xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
								preserveAspectRatio="xMidYMid slice" focusable="false">
								<image href="../imgs/${articulo[0]}.jpg" width="100%"></image>
							</svg>
						</div>
						<div class="col">
							<div class="row">${articulo[0]}</div>
						</div>
						<div class="col">cantidad ${articulo[2]} <br> ${articulo[1]} &euro;
							<button type="button" class="btn btn-sm btn-outline-secondary" onclick="eliminarCarro(${i})">Eliminar</button>
							<button type="button" class="btn btn-sm btn-outline-secondary" onclick="quitar(${i})">-</button>
							<button type="button" class="btn btn-sm btn-outline-secondary" onclick="aniadir(${i})">+</button>
						</div>
					</div>
				</div>`
		codigo = codigo + " " + mostrar
	}

	document.getElementById("carrito").innerHTML = codigo;
	var costeTotal = 0
	var coste = 0;
	for (var i = 0; i < listaActual.length; i++) {
		var articulo = listaActual[i];
		coste = coste + parseInt(articulo[1] * articulo[2]);
	}


	var elementos = 0;
	for (var i = 0; i < listaActual.length; i++) {
		var articulo = listaActual[i];
		elementos = elementos + parseInt(articulo[2]);
	}


	document.getElementById("coste").innerHTML = coste.toString().concat("€");

	document.getElementById("item").innerHTML = "Elementos ".concat(elementos);

	document.getElementById("Item").innerHTML = "Elementos ".concat(elementos);

	if (coste != 0) {
		costeTotal = coste + 5;
	}

	document.getElementById("costeTotal").innerHTML = costeTotal.toString().concat("€");

}

function eliminarCarro(i) {

	var listaActual = JSON.parse(localStorage.getItem("miLista")) || [];

	listaActual.splice(i, 1);

	localStorage.setItem("miLista", JSON.stringify(listaActual));
	location.reload();
}

function validarFormulario() {
	var nombreTarjeta = document.getElementById("nombreTarjeta").value;
	var numeroTarjeta = document.getElementById("numeroTarjeta").value;
	var FechaTarjeta = document.getElementById("FechaTarjeta").value;
	var cVVTarjeta = document.getElementById("cVVTarjeta").value;

	var validar = true;

	for (var i = 0; i < nombreTarjeta.length; i++) {
		// Verifica si el caracter actual es un número
		if (!isNaN(parseInt(nombreTarjeta[i]))) {
			alert("El nombre introducido no es valido")
			validar = false; // Si encuentra un número, devuelve true
		}
	}

	if (numeroTarjeta.length != 16) {
		alert("El numero de la tarjeta no es valido")
		validar = false;
	}


	FechaTarjeta = FechaTarjeta.split("/");
	const fechaActual = new Date();

	// Obtener el año actual
	const anioActual = fechaActual.getFullYear();

	// Obtener el mes actual (agregar 1 porque getMonth() devuelve un valor entre 0 y 11)
	const mesActual = fechaActual.getMonth() + 1;

	if (FechaTarjeta[1] == anioActual && FechaTarjeta[0] > mesActual) {

	} else if (FechaTarjeta[1] > anioActual) {

	} else {
		alert("fecha no valida")
		validar = false;
	}

	if (cVVTarjeta.length != 3) {
		alert("CVV no valida");
		validar = false;
	}

	if (validar == true) {
		alert("compra realizada correctamente");


		crearListaPedidos();

		listaActual = [];

		localStorage.setItem("miLista", JSON.stringify(listaActual));

		location.reload();
	}


}

function crearListaPedidos() {

	for (var i = 0; i < listaActual.length; i++) {
		var articulo = listaActual[i];
		listaPedidos.push(articulo)
	}

	localStorage.setItem("listaPedidos", JSON.stringify(listaPedidos));
}

function aniadir(i) {
	var listaActual = JSON.parse(localStorage.getItem("miLista")) || [];

	listaActual[i][2] = listaActual[i][2] + 1

	localStorage.setItem("miLista", JSON.stringify(listaActual));

	location.reload();

}

function quitar(i) {
	var listaActual = JSON.parse(localStorage.getItem("miLista")) || [];

	listaActual[i][2] = listaActual[i][2] - 1

	localStorage.setItem("miLista", JSON.stringify(listaActual));

	location.reload();

}

function pedidos() {

	var codigo = "";
	for (var i = 0; i < listaPedidos.length; i++) {
		var articulo = listaPedidos[i];
		var mostrar = `<div class="row border-top border-bottom">
					<div class="row main align-items-center">
						<div class="col-4">
							<svg class="bd-placeholder-img card-img-top" width="100%" height="225"
								xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
								preserveAspectRatio="xMidYMid slice" focusable="false">
								<image href="../imgs/${articulo[0]}.jpg" width="100%"></image>
							</svg>
						</div>
						<div class="col">
							<div class="row">${articulo[0]}</div>
						</div>
						<div class="col">cantidad ${articulo[2]} <br> ${articulo[1]} &euro;
						</div>
					</div>
				</div>`
		codigo = codigo + " " + mostrar

	}


	document.getElementById("Pedidos").innerHTML = codigo;


}
