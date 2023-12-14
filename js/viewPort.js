class Viewport {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.zoom = 1;

		this.#addEventListeners();
	}

	getMouse(evt) {
		return new Point(evt.offsetX * this.zoom, evt.offsetY * this.zoom);
	}

	#addEventListeners() {
		this.canvas.addEventListener("wheel", this.#handleWheel.bind(this));
	}

	#handleWheel(evt) {
		evt.preventDefault();
		const direction = Math.sign(evt.deltaY);
		const step = 0.1;
		this.zoom += direction * step;
		this.zoom = Math.max(1, Math.min(5, this.zoom));
	}
}
