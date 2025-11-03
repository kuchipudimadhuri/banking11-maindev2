// Simple in-memory rate limiter (per IP + route key)
// Not for multi-instance production use; replace with Redis for scaling.
const buckets = new Map();

function rateLimiter({ windowMs = 60_000, max = 30, key = 'global' } = {}) {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const bucketKey = `${key}:${ip}`;
    const now = Date.now();
    const windowStart = now - windowMs;

    let entry = buckets.get(bucketKey);
    if (!entry) {
      entry = [];
      buckets.set(bucketKey, entry);
    }

    // purge old timestamps
    while (entry.length && entry[0] < windowStart) entry.shift();

    if (entry.length >= max) {
      return res.status(429).json({ message: 'Too many requests, please try again later.' });
    }

    entry.push(now);
    next();
  };
}

export default rateLimiter;
