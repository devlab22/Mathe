"use strict"

document.addEventListener("DOMContentLoaded", () => {

    let userLang = navigator.language || navigator.userLanguage;

    let count = document.getElementById('task-count').value;
    
    document.getElementById("task-count").addEventListener("change", onCountChange)
    document.getElementById("opera").addEventListener("change", onOperaChanged);
    document.getElementById("btnCalculate").addEventListener("click", onCalculate);
    document.getElementById("btnRefresh").addEventListener("click", onSetContent);
    document.getElementById("btnClear").addEventListener("click", (event) => {
        event.preventDefault();
        setResultValue('');
    })
    document.getElementById("input1").addEventListener("change", () => {
        setContent();
    })
    document.getElementById("input2").addEventListener("change", () => {
        setContent();
    })

    renderTasks();

    function renderTasks() {

        const parent = document.getElementById('parent');
        let count = document.getElementById('task-count').value;
        document.getElementById('count-header').textContent = count;

        for (var i = 0; i < count; i++) {
            const item = createTask(i);
            parent.appendChild(item);
        }

        setContent();
    }

    function createTask(count) {

        const container = document.createElement('div');
        container.classList.add('flex-container');
        container.id = `flex-container-${count}`;
        // input 1
        const input1Element = document.createElement('span');
        input1Element.id = `input-1-${count}`
        container.appendChild(input1Element);
        // opera
        const operaElement = document.createElement('span');
        operaElement.classList.add('opera')
        container.appendChild(operaElement);
        // input 2
        const input2Element = document.createElement('span');
        input2Element.id = `input-2-${count}`
        container.appendChild(input2Element);
        // equil
        const equilElement = document.createElement('span');
        equilElement.classList.add('equil');
        equilElement.textContent = '=';
        container.appendChild(equilElement);
        // result
        const resultElement = document.createElement('span');
        resultElement.id = `result${count}`;
        resultElement.classList.add('result-span')
        container.appendChild(resultElement);
        return container;

    }

    function setContent() {

        setOperaValue();
        for (let i = 0; i < count; i++) {
            setRecord(i);
        }
    }

    function setRecord(record) {

        const minInput = parseInt(document.getElementById("input1").value);
        const maxInput = parseInt(document.getElementById("input2").value);

        const value1 = getRandomIntInclusive(minInput, maxInput);
        const value2 = getRandomIntInclusive(minInput, maxInput);

        let val1 = null;
        let val2 = null;

        if (value1 > value2) {
            val1 = value1;
            val2 = value2
        }
        else {
            val1 = value2;
            val2 = value1;
        }

        const input1 = document.getElementById("input-1-" + record);
        if (input1 !== null) {
            input1.textContent = val1;
        }
        const input2 = document.getElementById("input-2-" + record);
        if (input2 !== null) {
            input2.textContent = val2;
        }

        //calculateRecord(record);
        setResultValue('');

    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function onSetContent(event) {
        event.preventDefault();
        setContent()
    }

    function onCalculate(event) {

        event.preventDefault();
    
        for (let i = 0; i < count; i++) {
            calculateRecord(i)
        }
    }

    function onCountChange(event) {

        removeTasks();

        count = event.target.value;
        
        renderTasks();

    }
    function calculateRecord(record) {

        const opera = document.getElementById("opera").value;

        let val1 = null;
        let val2 = null;

        const input1 = document.getElementById("input-1-" + record);
        if (input1 !== null) {
            val1 = input1.textContent;
        }
        const input2 = document.getElementById("input-2-" + record);
        if (input2 !== null) {
            val2 = input2.textContent;
        }

        let result = null;
        try {
            result = calculate(val1, val2, opera);
        }
        catch (error) {
            //console.log(error);
        }

        const resultElement = document.getElementById("result" + record);
        if (resultElement !== null) {
            resultElement.textContent = result;
        }
    }

    function calculate(input1, input2, opera) {

        const val1 = parseInt(input1);
        const val2 = parseInt(input2);

        let result = 0;

        switch (opera) {
            case '+':
                result = val1 + val2;
                break;
            case '-':
                result = val1 - val2;
                break;
            case '*':
                result = val1 * val2;
                break;
            case '/':

                if (val2 !== 0) {
                    result = val1 / val2;
                } else {
                    throw 'error: division by zero';
                }
                break;
            case '%':
                result = val1 % val2;
                break;
            case '//':
                result = Math.floor(val1 / val2);
        }

        return new Intl.NumberFormat(userLang).format(result);
    }

    function onOperaChanged(event) {

        setOperaValue();

        setResultValue('');
    }

    function setResultValue(value = '') {

        for (let i = 0; i < count; i++) {

            const resultElement = document.getElementById("result" + i);
            if (resultElement !== null) {
                resultElement.textContent = value;
            }

        }
    }

    function setOperaValue() {

        const opera = document.getElementById("opera").value;
        const operaList = document.getElementsByClassName("opera");

        for (const element of operaList) {
            element.textContent = opera;
        }
    }

    function removeTasks() {

        for (var i = 0; i < count; i++) {

            const item = document.getElementById(`flex-container-${i}`);
            if (item) {
                item.remove();
            }

        }

    }
})