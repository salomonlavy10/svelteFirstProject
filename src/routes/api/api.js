// src/api/api.js

/**
 * @returns {Promise<Response>}
 */
export async function get() {
    return fetch('http://localhost:3000/messages');
}

/**
 * @param {string} content
 * @returns {Promise<Response>}
 */
export async function post(content) {
    return fetch('http://localhost:3000/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
    });
}