const setCookie = (name, value, options, res) => {
    // Construire la chaîne de cookie
    const cookieString = `${name}=${value}; ${optionsToString(options)}`;
    // Définir le cookie en utilisant res.cookie()
    res.cookie(name, value, options);
}
const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}


// Fonction utilitaire pour convertir les options de cookie en chaîne de texte
const optionsToString = (options) => {
    if (!options) return '';
    const { maxAge, domain, path, expires, httpOnly, secure, sameSite } = options;
    const optionsArray = [];
    if (maxAge) optionsArray.push(`Max-Age=${maxAge}`);
    if (domain) optionsArray.push(`Domain=${domain}`);
    if (path) optionsArray.push(`Path=${path}`);
    if (expires) optionsArray.push(`Expires=${expires}`);
    if (httpOnly) optionsArray.push(`HttpOnly`);
    if (secure) optionsArray.push(`Secure`);
    if (sameSite) optionsArray.push(`SameSite=${sameSite}`);
    return optionsArray.join('; ');
};

module.exports = { setCookie, getCookie };