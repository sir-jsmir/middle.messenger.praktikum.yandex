function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

type PlainObject<T = unknown> = {
    [k in string]: T;
};

export function isEqual(lhs: PlainObject, rhs: PlainObject): boolean {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key];
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]';
}

function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
    return isPlainObject(value) || isArray(value);
}
