/**
 * Decorator for adding a "path" value to a property
 * @param value
 * @returns {Function}
 */
export default function path(value) {
    return function decorator(target) {
        target.path = value;
    }
}