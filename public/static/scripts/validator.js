const formWrapper = document.querySelectorAll('.input-wrapper');
const submitButton = document.getElementById('.contact-submit');

export function onBlur(nodes, callback) {
    for (let node of nodes) {
        node.addEventListener('blur', () => {
            inputBlur(node, callback);
        });
    }
}

function validateEmail(node) {
    let value = node.value;
    let atpos = value.indexOf('@');
    let dotpos = value.lastIndexOf('.');

    if (atpos < 1 || (dotpos - atpos) < 2) {
        if (node.parentNode.classList.contains('blank')) {
            node.parentNode.classList.remove('blank');
        }

        node.parentNode.classList.add('invalid');
    } else {
        if (node.parentNode.classList.contains('blank')) {
            node.parentNode.classList.remove('blank');
        }

        if (node.parentNode.classList.contains('invalid')) {
            node.parentNode.classList.remove('invalid');
        }

        node.parentNode.classList.add('valid');
    }
}


function validatePhone(node) {
    const phoneRe = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const parent = node.parentNode;

    if (node.value.match(phoneRe)) {
        if (parent.classList.contains('invalid')) {
            parent.classList.remove('invalid');
            parent.classList.add('valid');
        }

        parent.classList.add('valid');
    } else {
        if (parent.classList.contains('valid')) {
            parent.classList.remove('valid');
            parent.classList.add('invalid'); 
        }

        parent.classList.add('invalid');
    }
}

function inputBlur(node, callback) {
    const formContent = node.value;
    const parent = node.parentNode;

    if (formContent == '') {
        parent.classList.add('blank');
    }

    if (parent.classList.contains('form-email')) {
        validateEmail(node);
    }

    if (parent.classList.contains('form-phone')) {
        validatePhone(node);
    }

    if (formContent !== '' && !parent.classList.contains('form-email') && !parent.classList.contains('form-phone')) {
        if (parent.classList.contains('blank')) {
            parent.classList.remove('blank');
        }

        parent.classList.add('valid');
    }

    if (typeof callback === 'function') {
        callback(node);
    }

    checkValidForm();
}

function checkValidForm() {
    const length = formWrapper.length;
    let valid = 0;

    for (let wrapper of formWrapper) {
        if (wrapper.classList.contains('valid')) {
            valid++;
        }
    }

    if (valid === length) {
        submitButton.classList.add('form-valid');
    }
}