export class Result {
    constructor() {
        try {
            const userResult = JSON.parse(sessionStorage.getItem('userResult'));
            document.getElementById('result-score').innerText = userResult.score + '/' + userResult.total;
        } catch (e) {
            location.href = 'index.html'
        }
    }
}