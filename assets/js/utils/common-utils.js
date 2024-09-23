export function cleanPhone(prettyPhoneNumber) {
    return prettyPhoneNumber.replace(/ |-|\(|\)|_/g, '');
}