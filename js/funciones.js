'use strict';

const el = {
	inputE: document.body.querySelectorAll ('input:not([readonly])'), // Elementos input editables.
	inputN: document.body.querySelectorAll ('input[readonly]'), // Elementos input sólo legibles.
	formulario: document.body.querySelector ('form[name=calculoCM]'), // Elemento del formulario que engloba los inputs.
	margenPD: 1.20 // Valor del input 'margen' por defecto.
},
calcularValores = () => { // Función que obtiene los valores, hace los cálculos necesarios y muestra los resultados en los campos pertinentes.
	const A = Number (el.inputE[0].value),
	B = el.inputE[1].value, // Guardamos el valor de margen en una cookie, para mantenerlo entre sesiones.
	C = A*B+A;
	//C = A*B+A,
	//D = Number (el.inputE[2].value),
	//E = C*D+C;

	el.inputN[0].value = parseFloat (C).toFixed (4); // Muestra el resultado en input C, redondeando al cuarto decimal por defecto.
	//el.inputN[1].value = parseFloat (E).toFixed (4); // Muestra resultado en input E, redondeando al cuarto decimal por defecto.

	//return {A,B,C,D,E}; // Para debug; devuelve los valores calculados sin redondear.
	return {A,B,C}; // Para debug; devuelve los valores calculados sin redondear.
},
registrarEventos = () => {
	el.inputE.forEach (ie => ['change','keyup'].forEach (e => ie.addEventListener (e, (ev) => { // Asigna eventos a cada input editable que ejecutan código cada vez que un valor cambie en cualquiera de los input editables.
		preCalcular (); // Llama a la función que engloba a las demás necesarias para los cálculos, pasando id del input sobre el que se ha ejecutado el evento y tecla pulsada sobre el mismo.
		animSave (ie.id, ev.key); // Función que activa la animación del icono de guardado. (al pulsar Intro/Enter sobre el input de margen.)
	})));
	el.formulario.addEventListener ('submit', (e) => { // Asigna un evento al formulario que ejecuta código cada vez que pulsamos Intro sobre algunos algunos de sus inputs.
		e.preventDefault (); // Evitamos función por defecto de enviar y recargar.
	});
},
animSave = (id, tecla) => { // Función que activa la animación del icono de guardado.
	const animEl = el.inputE[1].closest ('.ccm-save-p').classList; // Obtenemos el elemento que contiene los elementos del input 'margen' y sus iconos.

	switch (id == 'ccm-b' && tecla == 'Enter') { // Comprobamos que se intenta ejecutar desde el input de 'margen' pulsando Intro/Enter.
		case true:
			animEl.add ('ccm-save-a'); // Añadimos al elemento de 'margen' la clase de css que lleva la animación.
			modMargen (el.inputE[1].value); // Guarda el valor actual de input de 'margen' en cookie.
			console.info ('Valor de margen guardado:',el.inputE[1].value)
			setTimeout (() => { // Eliminamos la clase antes añadida después de 900 ms.
				animEl.remove ('ccm-save-a');
			}, 900);
		break;
	}
},
preCalcular = () => {
	switch (Array.from (el.inputE).filter (i => i.value === "").length > 0 && !el.formulario.reportValidity ()) { // Comprobamos si falta algún valor en los inputs editables.
		case !1: // Si no falta ninguno, continuamos.
			console.info (calcularValores ()); // Calculamos y mostramos en consola valores sin redondear.
		break;
		default:
			console.warn ('Faltan valores o no son válidos.'); // Si falta algunos mostramos aviso en consola.
	};
},
modMargen = (v) => { // Comprueba, carga o guarda el valor del input 'margen' en una cookie. (para mantenerlo entre sesiones)
	const val = v || el.margenPD, // Comprobamos si se ha pasado algún número como parámetro y lo asignamos a val, en caso contrario le asignamos el valor por defecto.
	margen = el.inputE[1], // Obtenemos el elemento input de 'margen'.
	cMargen = Number (localStorage.getItem ('ccm-margen')); // Comprobamos si existe una cookie con un valor modificado de 'margen'.

	return margen.value = v ? !localStorage.setItem ('ccm-margen', parseFloat (v).toFixed (4)) ? v : cMargen : cMargen ? cMargen : val;
};

document.addEventListener ('DOMContentLoaded', () => { // Esperamos a que el DOM esté cargado antes de inicializar nuestras funciones.
	registrarEventos (); // Llamamos a la función para que los eventos en inputs tengan efecto.
	modMargen (); // Comprobamos si existe una cookie con un valor modificado del 'margen' y lo cargamos; o en su defecto mostramos el valor por defecto.
});
