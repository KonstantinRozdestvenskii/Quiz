(function () {
    const Answer = {
        userData: null,
        userAnswers: null,
        quiz: null,
        rightAnswers: null,
        testNameElement: null,
        userDataElement: null,
        questionsElement: null,
        init() {
            checkUserData();

            try {
                this.userData = JSON.parse(sessionStorage.getItem("userData"));
            } catch (e) {
                location.href = "index.html";
            }

            try {
                this.userAnswers = JSON.parse(sessionStorage.getItem("userAnswers"));
            } catch (e) {
                location.href = "index.html";
            }

            const testId = Number(sessionStorage.getItem("testId"));

            if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", 'https://testologia.ru/get-quiz?id=' + testId, false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = 'index.html';
                    }
                } else {
                    location.href = 'index.html';
                }


                xhr.open("GET", 'https://testologia.ru/get-quiz-right?id=' + testId, false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.rightAnswers = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = 'index.html';
                    }
                } else {
                    location.href = 'index.html';
                }

            } else {
                location.href = 'index.html';
            }

            this.testNameElement = document.getElementById('test-name');
            this.userDataElement = document.getElementById('user-data');
            this.questionsElement = document.getElementById('questions');

            if (this.quiz && this.rightAnswers) {
                this.showAnswers();
            } else {
                location.href = "index.html";
            }


        },
        showAnswers() {
            this.testNameElement.innerText = this.quiz.name;
            this.userDataElement.innerText = this.userData.name + ' ' + this.userData.lastName + ', ' + this.userData.email;

            this.quiz.questions.forEach((question, index) => {
                const questionElement = document.createElement('div');
                questionElement.className = 'question';

                const questionTitleElement = document.createElement('div');
                questionTitleElement.className = 'question-title';
                questionTitleElement.innerHTML = '<span>Вопрос ' + (index + 1) + ':</span> ' + question.question;

                const optionsElement = document.createElement('div');
                optionsElement.className = 'question-options';

                const rightAnswerId = this.rightAnswers[index];
                const userAnswerId = this.userAnswers.find(item => item.questionId === question.id);
                const chosenAnswerId = userAnswerId ? userAnswerId.chosenAnswerId : null

                question.answers.forEach(answer => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'question-option';

                    const inputId = 'answer-' + answer.id;
                    const inputElement = document.createElement('input');
                    inputElement.className = 'option-answer';
                    inputElement.setAttribute('id', inputId);
                    inputElement.setAttribute('type', 'radio');
                    inputElement.setAttribute('name', 'answer');
                    inputElement.setAttribute('disabled', 'disabled');

                    const labelElement = document.createElement('label');
                    labelElement.setAttribute('for', inputId);
                    labelElement.innerText = answer.answer;

                    if (answer.id === chosenAnswerId) {
                        if (answer.id === rightAnswerId) {
                            optionElement.classList.add('right');
                        } else {
                            optionElement.classList.add('wrong');
                        }
                    }

                    optionElement.appendChild(inputElement);
                    optionElement.appendChild(labelElement);

                    optionsElement.appendChild(optionElement);
                });

                questionElement.appendChild(questionTitleElement);
                questionElement.appendChild(optionsElement);
                this.questionsElement.appendChild(questionElement);

            });
        },



    }


    Answer.init();
})();