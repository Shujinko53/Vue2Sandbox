export const regCheck = {
    data() {
        return {
            regex: {
                rus: /^[а-я-'\s]+$/i,
                eng: /^[a-z-'\s]+$/i,
                cyrillic: /^[а-я-'\s]+$/i,
                multyLang: /^[а-яa-z-'\s]+$/i,
                phone: /^\+7\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
                email: /^[a-z0-9./=?_-]+@[a-z0-9]+\.[a-z0-9]+/i,
                lettersNum: /^[а-яa-z\s\d№-]+$/i,
            },
        };
    },

    methods: {
        regCheck(val, param, required = false) {
            let reg = '';
            let msg = '';

            if (required) {
                const noSpaces = val.replace(/\s/g, '');
                if (val !== '' && !noSpaces.length || !val) {
                    return 'Please fill in this field';
                } else if (val.length > 50) {
                    return 'Exceeded the maximum number of characters';
                }
            }

            if (param === 'letters' || param === 'multyLang') {
                if (val !== '') {
                    reg = val.charAt(0).match(this.regex.rus)
                        ? this.regex.rus
                        : this.regex.eng;
                }
                if (
                    val !== '' &&
                    !val.match(reg) &&
                    val.match(this.regex.multyLang)
                ) {
                    msg =
                        'Please use only one language layout';
                } else {
                    msg = 'PLEASE USE ONLY LETTERS';
                }
            } else if (param === 'cyrillic') {
                reg = this.regex.cyrillic;
                msg = 'Use only Cyrillic';
            } else if (param === 'phone') {
                reg = this.regex.phone;
                msg = 'The phone should have 11 digits';
            } else if (!this.regex[param]) {
                console.log('error regCheck: regular expression is not found');
            } else if (param === 'email') {
                reg = this.regex.email;
                msg = 'Введите корректный email';
            } else {
                reg = this.regex[param];
                msg = 'Incorrect data';
            }

            if (!param) {
                return '';
            }

            return val !== '' && !val.match(reg) ? msg : '';
        },
    },
};
