class GraphEditor {
	constructor(canvas, graph) {
		this.canvas = canvas;
		this.graph = graph;
		this.ctx = canvas.getContext("2d");
		this.selectedPoint = null;
		this.hoveredPoint = null;
		this.dragging = false;
		this.mouse = null;
		this.#addEventListeners();
	}

	#addEventListeners() {
		this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
		this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
		this.canvas.addEventListener("mouseup", () => (this.dragging = false));
		this.canvas.addEventListener("contextmenu", (evt) => evt.preventDefault());
	}

	#handleSelectPoint(point) {
		if (this.selectedPoint) {
			this.graph.addSegment(new Segment(this.selectedPoint, point));
		}
		this.selectedPoint = point;
	}

	#removePoint(point) {
		this.graph.removePoint(point);
		if (this.selectedPoint == point) {
			this.selectedPoint = null;
		}
		this.hoveredPoint = null;
	}

	#handleMouseDown(evt) {
		if (evt.button == 2) {
			if (this.selectedPoint) {
				this.selectedPoint = null;
			} else if (this.hoveredPoint) {
				this.#removePoint(this.hoveredPoint);
			}
		}

		if (evt.button == 0) {
			// left click
			if (this.hoveredPoint) {
				this.#handleSelectPoint(this.hoveredPoint);
				this.dragging = true;
				return;
			}

			this.graph.addPoint(this.mouse);
			this.#handleSelectPoint(this.mouse);
			this.hoveredPoint = this.mouse;
		}
	}

	#handleMouseMove(evt) {
		this.mouse = new Point(evt.offsetX, evt.offsetY);
		this.hoveredPoint = getNearestPoint(this.mouse, this.graph.points, 20);
		if (this.dragging) {
			this.selectedPoint.x = this.mouse.x;
			this.selectedPoint.y = this.mouse.y;
		}
	}

	display() {
		this.graph.draw(this.ctx);

		if (this.hoveredPoint) {
			this.hoveredPoint.draw(this.ctx, {
				fill: true,
			});
		}

		if (this.selectedPoint) {
			const intent = this.hoveredPoint ? this.hoveredPoint : this.mouse;
			new Segment(this.selectedPoint, intent).draw(this.ctx, {
				dash: [3, 3],
			});
			this.selectedPoint.draw(this.ctx, {
				size: 20,
				outline: true,
			});
		}
	}
}
