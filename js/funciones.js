'use strict';

const el = {
	inputE: document.body.querySelectorAll ('input:not([readonly])'), // Elementos input editables.
	inputN: document.body.querySelectorAll ('input[readonly]'), // Elementos input sólo legibles.
	formulario: document.body.querySelector ('form[name=calculoCM]') // Elemento del formulario que engloba los inputs.
},
calcularValores = () => { // Función que obtiene los valores, hace los cálculos necesarios y muestra los resultados en los campos pertinentes.
	const A = Number (el.inputE[0].value),
	B = Number (el.inputE[1].value),
	C = A*B+A,
	D = Number (el.inputE[2].value),
	E = C*D+C;

	el.inputN[0].value = parseFloat(C).toFixed(4); // Muestra el resultado en input C, redondeando al cuarto decimal por defecto.
	el.inputN[1].value = parseFloat(E).toFixed(4); // Muestra resultado en input E, redondeando al cuarto decimal por defecto.

	return {A,B,C,D,E}; // Para debug; devuelve los valores calculados sin redondear.
},
registrarEventos = () => {
	el.inputE.forEach (el => el.addEventListener ('change', () => { // Asigna un evento que ejecuta código cada vez que un valor cambie en cualquiera de los input editables.
		preCalcular (); // Llama a la función que engloba a las demás necesarias para los cálculos.
	}));
	el.formulario.addEventListener ('submit', (e) => { // Asigna un evento al formulario que ejecuta código cada vez que pulsamos Intro sobre algunos algunos de sus inputs.
		e.preventDefault(); // Evitamos función por defecto de enviar y recargar.
	});
},
preCalcular = () => {
	switch (Array.from(el.inputE).filter(i => i.value === "").length > 0) { // Comprobamos si falta algún valor en los inputs editables.
		case !1: // Si no falta ninguno, continuamos.
			console.info (calcularValores ()); // Calculamos y mostramos en consola valores sin redondear.
		break;
		default: // Si falta algunos mostramos aviso en consola.
			console.warn ('Faltan valores o no son válidos.');
	};
};

registrarEventos (); // Llamamos a la función para que los eventos tengas efecto.
