function getNearestPoint(loc, points, maxDistance = Number.MAX_SAFE_INTEGER) {
	let minDistance = Number.MAX_SAFE_INTEGER;
	let nearestPoint = null;

	for (const point of points) {
		const dist = distance(point, loc);
		if (dist < minDistance && dist < maxDistance) {
			minDistance = dist;
			nearestPoint = point;
		}
	}
	return nearestPoint;
}

function distance(p1, p2) {
	return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function add(p1, p2) {
	return new Point(p1.x + p2.x, p1.y + p2.y);
}

function subtract(p1, p2) {
	return new Point(p1.x - p2.x, p1.y - p2.y);
}

function scale(point, factor) {
	return new Point(point.x * factor, point.y * factor);
}
