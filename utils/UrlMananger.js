export class UrlMananger {
    static checkUserData () {
        const userDataJson = sessionStorage.getItem('userData');
        const userData = JSON.parse(userDataJson);

        if (userData) {
            const name = userData.name;
            const lastName = userData.lastName;
            const email = userData.email;
            if (!name || !lastName || !email) {
                location.href = 'index.html';
            }
        } else {
            location.href = 'index.html';
        }




    }
}