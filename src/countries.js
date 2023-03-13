"use strict"

document.addEventListener("DOMContentLoaded", () => {

    loadData()

    function loadData() {

        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => {

                data.sort((a, b) => a.name.common.localeCompare(b.name.common))
                for (let i = 0; i < data.length; i++) {

                    const element = document.createElement('div')
                    element.className = 'card'
                   
                    element.addEventListener('click', () => {
                        window.open(data[i].maps.googleMaps)
                    })

                    const name = createTitle(data[i].name.common)
                    element.appendChild(name)

                    const image = createImage(data[i].flags.svg, data[i].name.common)
                    element.appendChild(image)

                    const capital = createKeyValue('capital', data[i].capital)
                    element.appendChild(capital)
                    const region = createKeyValue('region', data[i].region)
                    element.appendChild(region)
                    const subregion = createKeyValue('subregion', data[i].subregion)
                    element.appendChild(subregion)

                    document.getElementById("main").appendChild(element);               
                }
            });
    }

    function createImage(src, alt) {
        const image = document.createElement('img')
        image.src = src
        image.alt = alt;
        image.height = 150
        image.width = 250
        image.className = 'keyvalue';
        return image;
    }
    function createKeyValue(key = '', value = '') {
        const para = document.createElement("p");
        para.className = 'keyvalue';
        const textNode = document.createTextNode(`${key}: ${value}`);
        para.appendChild(textNode);
        return para;
    }
    function createTitle(title){

        const element = document.createElement('h1')
        element.className = 'card-title';
        const textNode = document.createTextNode(title);
        element.appendChild(textNode);
        return element;
    }

})