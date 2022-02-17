'use strict';

const el = {
	inputE: document.body.querySelectorAll ('input:not([readonly])'), // Elementos input editables.
	inputN: document.body.querySelectorAll ('input[readonly]'), // Elementos input sólo legibles.
	formulario: document.body.querySelector ('form[name=calculoCM]'), // Elemento del formulario que engloba los inputs.
	margenPD: 1.20 // Valor del input 'margen' por defecto.
},
calcularValores = () => { // Función que obtiene los valores, hace los cálculos necesarios y muestra los resultados en los campos pertinentes.
	const A = Number (el.inputE[0].value),
	B = el.inputE[1].value, // Obtenemos el valor actual del input de 'margen'.
	C = Number (A*B+A);

	el.inputN[0].value = C.round (3); // Muestra el resultado en input C, redondeando al tercer decimal como máximo si es relevante.

	return {A,B,C}; // Para debug; devuelve los valores calculados sin redondear.
},
registrarEventos = () => {
	el.inputE.forEach (ie => ['change','keyup','keypress'].forEach (e => ie.addEventListener (e, (ev) => { // Asigna eventos a cada input editable que ejecutan código cada vez que un valor cambie en cualquiera de los input editables.
		(ev.which != 46 && (ev.which < 48 || ev.which > 57)) ? ev.preventDefault () : !0; // Comprobamos que las teclas pulsadas en los inputs no sean o otra cosa mas que números o punto.
		if (e == 'keyup') { // Las funciones a continuación no funcionan correctamente con los demás eventos, aquí hago que respondan a uno en concreto.
			preCalcular (ev.key); // Llama a la función que engloba a las demás necesarias para los cálculos, pasando id del input sobre el que se ha ejecutado el evento y tecla pulsada sobre el mismo.
			animSave (ie.id, ev.key); // Función que activa la animación del icono de guardado. (al pulsar Intro/Enter sobre el input de margen.)
		}
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
			modMargen (el.inputE[1].value); // Guarda el valor actual de input de 'margen' localmente.
			console.info ('Valor de margen guardado:', el.inputE[1].value) // Mostramos en consola el valor guardado.
			setTimeout (() => {
				animEl.remove ('ccm-save-a'); // Eliminamos la clase antes añadida después de 900 ms.
			}, 900);
		break;
	}
},
preCalcular = (tecla) => {
	switch (!Array.from (el.inputE).filter (i => i.value).length < 3 && !el.formulario.reportValidity ()) { // Comprobamos si falta algún valor en los inputs editables.
		case !1: // Si no falta ninguno, continuamos.
			(tecla !== '.') ? console.info (calcularValores ()) : !1; // Cuando la tecla pulsado no sea punto, calculamos y mostramos en consola valores sin redondear.
		break;
		default:
			console.warn ('Faltan valores o no son válidos.'); // Si falta algún valor en los input editables, mostramos aviso en consola.
	};
},
modMargen = (v) => { // Comprueba, carga o guarda el valor del input 'margen' localmente. (para mantenerlo entre sesiones)
	const val = v || el.margenPD, // Comprobamos si se ha pasado algún número como parámetro y lo asignamos a val, en caso contrario le asignamos el valor por defecto.
	margen = el.inputE[1], // Obtenemos el elemento input de 'margen'.
	cMargen = Number (localStorage.getItem ('ccm-margen')); // Comprobamos si existe almacenado localmente un valor modificado de 'margen'.

	margen.selectionStart = margen.selectionEnd = margen.value.length; // Forzamos el cursor al final del valor de 'margen' al guardar.

	return margen.value = parseFloat (v ? !localStorage.setItem ('ccm-margen', Number (v)) ? v : cMargen : cMargen ? cMargen : val);
};

Number.prototype.round = function (n) { // Extendemos a partir del objeto Number, una función para redondear valores.
	const d = Math.pow (10, n);
	return Math.round ((this + Number.EPSILON) * d) / d;
}

document.addEventListener ('DOMContentLoaded', () => { // Esperamos a que el DOM esté cargado antes de inicializar nuestras funciones.
	registrarEventos (); // Llamamos a la función para que los eventos en inputs tengan efecto.
	modMargen (); // Comprobamos si existe localmente un valor modificado del 'margen' y lo cargamos; o en su defecto mostramos el valor por defecto.
});
