"use strict"

document.addEventListener("DOMContentLoaded", () => {

    let userLang = navigator.language || navigator.userLanguage;

    document.getElementById('region').addEventListener('change', onSetContent);
    document.getElementById('search').addEventListener('input', onSearch);
    let countries = [];
    loadData();

    function loadData() {

        fetch("https://restcountries.com/v3.1/all/")
            .then((response) => response.json())
            .then((data) => {

                data.sort((a, b) => a.name.common.localeCompare(b.name.common));
                countries = data;
                setContent(countries);
            });
    }

    function createImage(src, alt) {
        const image = document.createElement('img')
        image.src = src
        image.alt = alt;
        image.className = 'keyvalue';
        return image;
    }
    function createKeyValue(key = '', value = '') {
        const para = document.createElement("p");
        para.className = 'keyvalue';
        const itemKey = document.createElement('span');
        itemKey.className = 'itemKey';
        const keyContent = document.createTextNode(`${key}: `)
        itemKey.appendChild(keyContent)
        para.appendChild(itemKey)

        const itemValue = document.createElement('span')
        const valueContent = document.createTextNode(value)
        itemValue.appendChild(valueContent)
        para.appendChild(itemValue)
        return para;
    }
    function createTitle(title){

        const element = document.createElement('h1')
        element.className = 'card-title';
        const textNode = document.createTextNode(title);
        element.appendChild(textNode);
        return element;
    }

    function setContent(data=[]){

        document.getElementById('count').value = data.length;

        for (let i = 0; i < data.length; i++) {

            const element = document.createElement('div')
            element.className = 'card'
            element.id = data[i].name.common
           
            element.addEventListener('click', () => {
                window.open(data[i].maps.googleMaps)
            })

            const name = createTitle(data[i].name.common)
            element.appendChild(name)

            const image = createImage(data[i].flags.svg, data[i].name.common)
            element.appendChild(image)

            const capital = createKeyValue('Capital', data[i].capital)
            element.appendChild(capital)
            const population = createKeyValue('Population', new Intl.NumberFormat(userLang).format(data[i].population));
            element.appendChild(population);
            const area = createKeyValue('Area', new Intl.NumberFormat(userLang).format(data[i].area));
            element.appendChild(area);
            const region = createKeyValue('Region', data[i].region)
            element.appendChild(region)
            const subregion = createKeyValue('Subregion', data[i].subregion)
            element.appendChild(subregion)

            document.getElementById("main").appendChild(element);               
        }
    }

    function onSetContent(event){
        event.preventDefault();
        
        const region = event.target.value;
        removeCards()

        let data = []
        if(region === '*'){
            data = countries;
        }
        else{
            data = countries.filter(item => item.region.toLowerCase() === region)
        }

        setContent(data)
    }

    function removeCards(){
       
        for(let i=0; i<countries.length; i++){
            const item = document.getElementById(countries[i].name.common)
            if(item){
                item.remove()
            }
            
        }
    }

    function onSearch(event){
        event.preventDefault();

        const value = event.target.value;
        
        const data = countries.filter(item => item.name.common.toLowerCase().startsWith(value.toLowerCase()));
        
        removeCards()
        setContent(data)

    }

})