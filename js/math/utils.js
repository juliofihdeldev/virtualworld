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
