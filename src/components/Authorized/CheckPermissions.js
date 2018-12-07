import React from 'react';
import PromiseRender from './PromiseRender';
import { CURRENT } from './renderAuthorize';

function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

/**
 * Common check permissions method
 * @param  { Permission judgment type String|Array|Promise|Function } authority
 * @param  { Your permission description type: String } currentAuthority
 * @param  { Passing components } target
 * @param  { no pass components } Exception
 */
const checkPermissions = (authority, currentAuthority, target, Exception) => {
    // Retirement authority, return target
    if (!authority) {
        return target;
    }

    // whether authority includes currentAuthority
    function isHasPermission() {
        return currentAuthority.some(element => {
            return authority.indexOf(element) >= 0;
        });
    }

    // authority type: Array
    if (Array.isArray(authority)) {
        if (authority.indexOf(currentAuthority) >= 0) {
            return target;
        }
        if (Array.isArray(currentAuthority)) {
            if (isHasPermission()) {
                return target;
            }
        }
        return Exception;
    }

    // authority type: String
    if (typeof authority === 'string') {
        if (authority === currentAuthority) {
            return target;
        }
        if (Array.isArray(currentAuthority)) {
            if (isHasPermission()) {
                return target;
            }
        }
        return Exception;
    }

    // authority type: Promise
    if (isPromise(authority)) {
        return <PromiseRender ok={target} error={Exception} promise={authority} />;
    }

    // authority type: Function
    if (typeof authority === 'function') {
        try {
            const bool = authority(currentAuthority);
            if (isPromise(bool)) {
                return <PromiseRender ok={target} error={Exception} promise={authority} />;
            }
            if (bool) {
                return target;
            }
            return Exception;
        } catch (error) {
            throw new Error('unsupported parameters');
        }
    }
};

export { checkPermissions };

const check = (authority, target, Exception) => {
    return checkPermissions(authority, CURRENT, target, Exception);
};

export default check;
