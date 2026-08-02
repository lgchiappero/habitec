import "@testing-library/jest-dom";

// jsdom no implementa scrollIntoView; varios componentes lo usan para
// mantener visible un elemento seleccionado (ej. thumbnail activo).
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}
