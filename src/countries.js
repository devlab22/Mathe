"use strict"

document.addEventListener("DOMContentLoaded", () => {

    let userLang = navigator.language || navigator.userLanguage;

    document.getElementById('continent').addEventListener('change', onSetContent);
    document.getElementById('search').addEventListener('input', onSearch);
    document.getElementById('myFilter').addEventListener('change', onChangeFilter);
    let countries = [];
    let filteredItems = [];
    let regionItems = new Set();
    let subregionItems = new Set();
    let continentItems = new Set();
    loadData();

    function loadData() {

        fetch("https://restcountries.com/v3.1/all/")
            .then((response) => response.json())
            .then((data) => {

                data.sort((a, b) => a.name.common.localeCompare(b.name.common));
                countries = data;
                setFilterItems();
                fillFilterItems();
                setContent(countries);
            });
    }

    function fillFilterItems() {
        var cont = document.getElementById('continent');
        var contLength = cont.length;

        for (var i = 0; i <= contLength; i++) {
            cont.remove(0);
        }

        var filter = document.getElementById('myFilter').value

        var option = document.createElement("option");
        option.text = 'All';
        option.value = '*';
        cont.add(option, 0)

        switch (filter) {
            case 'region':
                regionItems.forEach(item => {
                    var option = document.createElement("option");
                    option.text = item;
                    option.value = item.toLowerCase();
                    cont.add(option)
                })
                break;
            case 'subregion':
                subregionItems.forEach(item => {
                    var option = document.createElement("option");
                    option.text = item;
                    option.value = item.toLowerCase();
                    cont.add(option)
                })
                break;
            case 'continents':
                continentItems.forEach(item => {
                    var option = document.createElement("option");
                    option.text = item;
                    option.value = item.toLowerCase();
                    cont.add(option)
                })
                break;
            default:
                console.log('unknow')
        }
    }
    function setFilterItems() {

        countries.forEach(item => {

            if (item.region) {
                regionItems.add(item.region);
            }
            if (item.subregion) {
                subregionItems.add(item.subregion);
            }
            if (item.continents) {

                item.continents.forEach(element => continentItems.add(element))

            }

        })

    }
    function onChangeFilter(event) {
        fillFilterItems();
        removeCards();
        setContent(countries);
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

        if(key.toLowerCase() === 'area'){
            const itemkm = document.createElement('span');
            itemkm.style.marginLeft = '5px';
            const kmvalue = document.createTextNode('km');
            itemkm.appendChild(kmvalue)
            para.appendChild(itemkm)

            const itemQuad = document.createElement('span')
            itemQuad.classList.add('quad');
            const quadValue = document.createTextNode('2')
            itemQuad.appendChild(quadValue)
            para.appendChild(itemQuad);
        }
        return para;

    }
    function createTitle(title) {

        const element = document.createElement('h1')
        element.className = 'card-title';
        const textNode = document.createTextNode(title);
        element.appendChild(textNode);
        return element;
    }

    function setContent(data = []) {

        document.getElementById('count').value = data.length;

        for (let i = 0; i < data.length; i++) {

            const element = document.createElement('div')
            element.className = 'card'
            element.id = data[i].name.common

            element.addEventListener('click', () => {
                console.log(data[i])
                window.open(data[i].maps.googleMaps);
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
            const continent = createKeyValue('Continent', data[i].continents);
            element.appendChild(continent);
            const unMember = createKeyValue('UN Member', (Boolean(data[i].unMember)) ? 'Yes' : 'No');
            element.appendChild(unMember);

            document.getElementById("main").appendChild(element);
        }

        document.getElementById('loader').classList.add('no-display');
    }

    function onSetContent(event) {
        event.preventDefault();

        document.getElementById('loader').classList.remove('no-display');
        removeCards()

        filteredItems = getFilteredItems();

        setContent(filteredItems)
    }

    function getFilteredItems() {

        const filter = document.getElementById('continent').value;
        const fieldname = document.getElementById('myFilter').value;
        let result = [];

        if (filter === '*') {
            result = countries;
        }
        else {
            result = countries.filter(item => {

                if (item[fieldname]) {

                    var tmp = []
                    if (Array.isArray(item[fieldname])) {
                        tmp = item[fieldname].map(element => element.toLowerCase());
                    }
                    else {
                        tmp.push(item[fieldname].toLowerCase());
                    }

                    if (tmp.includes(filter.toLowerCase())) {
                        return item;
                    }
                }

            })
        }

        const value = document.getElementById('search').value;
        if (value) {
            result = result.filter(item => item.name.common.toLowerCase().startsWith(value.toLowerCase()));
        }

        return result;
    }

    function removeCards() {

        for (let i = 0; i < countries.length; i++) {
            const item = document.getElementById(countries[i].name.common)
            if (item) {
                item.remove()
            }

        }
    }

    function onSearch(event) {
        event.preventDefault();

        document.getElementById('loader').classList.remove('no-display');
        removeCards()

        filteredItems = getFilteredItems();
        setContent(filteredItems)

    }

})