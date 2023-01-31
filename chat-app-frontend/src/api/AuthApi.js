const AuthApi = () => {
    let _userName;
    let _errors = [];

    return {
        getUserName() {
            if(_userName === undefined) {
                _userName = localStorage.getItem('chatUserName');
            }

            return _userName;
        },

        getErrors() {
            return _errors;
        },

        setUserName(userName) {
            localStorage.setItem('chatUserName', userName);
            _userName = userName;
        },

        checkUserName (userName) {
            let isValid = true, errors = [];

            if(userName.length < 3) {
                isValid = false;
                errors.push('Username should contain at least 3 symbols.');
            }

            if(!(userName.match('^[a-zA-Z0-9_]+$'))) {
                isValid = false;
                errors.push('Username can only contain letters, numbers and underscores.');
            }

            return { isValid, errors }
        },
    }
}

export default AuthApi();