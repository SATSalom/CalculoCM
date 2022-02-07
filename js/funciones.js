'use strict';

const el = {
	inputE: document.body.querySelectorAll ('input:not([readonly])'), // Elementos input editables.
	inputN: document.body.querySelectorAll ('input[readonly]') // Elementos input sólo legibles.
},
valores = () => { // Función que obtiene los valores, procesa los cálculos necesarios y muestra los resultados en los campos pertinentes.
	const A = Number (el.inputE[0].value),
	B = Number (el.inputE[2].value),
	C = A*B+A,
	D = Number (el.inputE[2].value),
	E = C*D+C;

	el.inputN[0].value = parseFloat(C).toFixed(4); // Muestra el resultado en input C, redondeando al cuarto decimal por defecto.
	el.inputN[1].value = parseFloat(E).toFixed(4); // Muestra resultado en input E, redondeando al cuarto decimal por defecto.

	return {A,B,C,D,E}; // Para debug.
},
registrarEventos = () => { // Asigna un evento que ejecuta código cada vez que un valor cambie en cualquiera de los input editables.
	el.inputE.forEach (el => el.addEventListener ('change', () => {
		calcularValores (); // Llama a la función que engloba a las demás necesarias para los cálculos.
	}));
},
calcularValores = () => {
	console.info (valores ()); // Calculamos y mostramos en consola valores sin redondear.
};

registrarEventos (); // Llamamos a la función para que los eventos tengas efecto.
