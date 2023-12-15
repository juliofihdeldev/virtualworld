class Graph {
	constructor(points = [], segments = []) {
		this.points = points;
		this.segments = segments;
	}
	static load(info) {
		const points = info.points.map((p) => new Point(p.x, p.y));
		const segments = info.segments.map(
			(s) =>
				new Segment(
					points.find((p) => p.equals(s.p1)),
					points.find((p) => p.equals(s.p2))
				)
		);
		return new Graph(points, segments);
	}

	dispose() {
		this.points.length = 0;
		this.segments.length = 0;
	}

	removePoint(point) {
		const segmentsLinkPoint = this.getSegmentsWithPoint(point);
		this.points.splice(this.points.indexOf(point), 1);
		for (const seg of segmentsLinkPoint) {
			this.removeSegment(seg);
		}
	}

	getSegmentsWithPoint(point) {
		return this.segments.filter((s) => s.includesPoint(point));
	}

	removeSegment(index) {
		this.segments.splice(this.segments.indexOf(index), 1);
	}

	addSegment(seg) {
		this.segments.push(seg);
	}

	containsSegment(segment) {
		return this.segments.find((s) => s.equals(segment));
	}

	tryAddSegment(segment) {
		if (!this.containsSegment(segment) && !segment.p1.equals(segment.p2)) {
			this.addSegment(segment);
			return true;
		}
		return false;
	}

	draw(ctx) {
		for (const seg of this.segments) {
			seg.draw(ctx);
		}
		for (const p of this.points) {
			p.draw(ctx);
		}
	}

	containsPoint(point) {
		return this.points.find((p) => p.equals(point));
	}

	tryAddPoint(point) {
		if (!this.containsPoint(point)) {
			this.addPoint(point);
			return true;
		}
		return false;
	}

	addPoint(point) {
		this.points.push(point);
	}
}
