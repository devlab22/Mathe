"use strict"

document.addEventListener("DOMContentLoaded", () => {


    const count = document.getElementsByClassName("opera").length;

    let userLang = navigator.language || navigator.userLanguage;

    document.getElementById("opera").addEventListener("change", onOperaChanged);
    document.getElementById("btnCalculate").addEventListener("click", onCalculate);
    document.getElementById("btnRefresh").addEventListener("click", setContent);
    document.getElementById("btnClear").addEventListener("click", () => {
        setResultValue('');
    })
    document.getElementById("input1").addEventListener("change", () => {
        setContent();
    })
    document.getElementById("input2").addEventListener("change", () => {
        setContent();
    })
    
    addClassName("result", "result-span")
    setContent();

    function addClassName(elementName, className){
        
        for (let i = 1; i <= count; i++) {
           const element = document.getElementById(elementName + i)
           element.classList.add(className)
        }
    };
    function setContent() {

        setOperaValue();

        for (let i = 1; i <= count; i++) {
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

    function onCalculate(event) {

        for (let i = 1; i <= count; i++) {
            calculateRecord(i)
        }
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
        try{
             result = calculate(val1, val2, opera);
        }
        catch(error){
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
                }else{
                    throw 'error: division by zero';
                }
                break;
            case '%':
                result = val1 % val2;
                break;
            case '//':
                result = Math.floor(val1/val2);
        }

        return new Intl.NumberFormat(userLang).format(result);
    }

    function onOperaChanged(event) {

        setOperaValue();

        setResultValue('');
    }

    function setResultValue(value = '') {

        for (let i = 1; i <= count; i++) {

            const resultElement = document.getElementById("result" + i);
            if (resultElement !== null) {
                resultElement.textContent = value;
            }

        }
    }

    function setOperaValue(){

        const opera = document.getElementById("opera").value;
        const operaList = document.getElementsByClassName("opera");

        for (const element of operaList) {
            element.textContent = opera;
        }
    }
})