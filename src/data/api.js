class API {
    static HOST = "https://touiteur.cefim-formation.org";

    static getAllTouits(timestamp = 0, onSuccess = () => {}, onError = () => {}) {
        fetch(
            API.HOST + "/list?ts=" + encodeURIComponent(timestamp),
            {
                "method": "GET"
            }
        ).then(
            resp => resp.json()
        ).then(
            data => {
                if (data.messages) { // un peu différent de React ou on regardait la condition data.hasOwnProperty("messages")
                    onSuccess(data);
                } else {
                    throw new Error(data.error ? data.error : "Unknown error");
                }
            }
        ).catch(
            e => onError(e.message)
        );
    }

    static sendTouit(username, message, onSuccess = () => {}, onError = () => {}) {
        fetch(
            API.HOST + "/send",
            {
                "method": "POST",
                "body": "name=" + encodeURIComponent(username) + "&message=" + encodeURIComponent(message),
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        ).then(
            resp => resp.json()
        ).then(
            data => {
                if (data.success) {
                    onSuccess(data);
                } else {
                    throw new Error(data.error ? data.error : "Unknown error");
                }
            }
        ).catch(
            e => onError(e.message)
        );
    }

    static getTrending(onSuccess = () => {}, onError = () => {}) {
        fetch(
            API.HOST + "/trending",
            {
                "method": "GET"
            }
        ).then(
            resp => resp.json()
        ).then(
            data => onSuccess(data)
        ).catch(
            e => onError(e.message)
        );
    }

    static userRegister(username, password, onSuccess = () => {}, onError = () => {}) {
        fetch(
            API.HOST + "/user/register",
            {
                "method": "POST",
                "body": "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password),
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        ).then(
            resp => resp.json()
        ).then(
            data => {
                if (data.success) {
                    onSuccess(data);
                } else {
                    throw new Error(data.error ? data.error : "Unknown error");
                }
            }
        ).catch(
            e => onError(e.message)
        );
    }

    static userLogin(username, password, onSuccess = () => {}, onError = () => {}) {
        fetch(
            API.HOST + "/user/login",
            {
                "method": "POST",
                "body": "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password),
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        ).then(
            resp => resp.json()
        ).then(
            data => {
                if (data.access_token) {
                    onSuccess(data.access_token);
                } else {
                    throw new Error(data.error ? data.error : "Unknown error");
                }
            }
        ).catch(
            e => onError(e.message)
        );
    }

    static sendAuthenticatedTouit(token, message, onSuccess = () => {}, onError = () => {}) {
        fetch(
            API.HOST + "/send",
            {
                "method": "POST",
                "body": "message=" + encodeURIComponent(message),
                "headers": {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        ).then(
            resp => resp.json()
        ).then(
            data => {
                if (data.success) {
                    onSuccess(data);
                } else {
                    throw new Error(data.error ? data.error : "Unknown error");
                }
            }
        ).catch(
            e => onError(e.message)
        );
    }

    static getUserInfo(token, onSuccess = () => {}, onError = () => {}) {
        fetch(
            API.HOST + "/user/me",
            {
                "method": "GET",
                "headers": {
                    "Authorization": "Bearer " + token
                }
            }
        ).then(
            resp => resp.json()
        ).then(
            data => {
                if (data.logged_in_as) {
                    onSuccess(data);
                } else {
                    throw new Error(data.msg ? data.msg : "Unknown error");
                }
            }
        ).catch(
            e => onError(e.message)
        );
    }
}

export default API;
