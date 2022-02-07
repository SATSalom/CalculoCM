'use strict';

const el = {
	formulario: document.body.querySelector ('form[name="calculoCM"]'), // Elemento del formulario principal.
	inputE: document.body.querySelectorAll ('input:not([readonly])'), // Elementos input editables.
	inputN: document.body.querySelectorAll ('input[readonly]') // Elementos input sólo legible.
},
valores = () => { // Función que obtiene los valores, procesa los cálculos necesarios y muestra los resultados en los campos pertinentes.
	const A = el.inputE[0].value,
		B = el.inputE[1].value,
		C = Number (A*B)+Number(A),
		D = el.inputE[2].value,
		E = Number (C*D) + Number (C)

	el.inputN[0].value = C; // Muestra el resultado en input C
	el.inputN[1].value = parseFloat(E).toFixed(3); // Muestra resultado en input E, redondeando al tercer decimal.
},
registrarEventos = () => { // Asigna un evento que ejecuta código cada vez que un valor cambie en cualquiera de los input editables.
	el.inputE.forEach (el => el.addEventListener ('change', () => {
		calcularValores ();
	}));
},
calcularValores = () => {
	valores ()
	console.info("test")
};



registrarEventos (); // Llamamos a la función para que los eventos tengas efecto.
