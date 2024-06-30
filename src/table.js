function isNotEmptyArray(arrayElement){
    return Array.isArray(arrayElement) && arrayElement.length > 0;
}

export const createTable = (columnsArray, dataArray, tableId) => {
    if(!isNotEmptyArray(columnsArray) || !isNotEmptyArray(dataArray) || !tableId){
        throw new Error("Para a correta execução, precisamos de um array de colunas, outro de dados e um id válido para a table");
    }
    const table = document.getElementById(tableId);
    if(table.nodeName !== 'TABLE' || !table){
        throw new Error("Id informado não corresponde a nenhum elemento Table");
    }

    createTHeader(table, columnsArray);
    createTbody(table, columnsArray, dataArray);

} 

function createTHeader(tableReference, columnsArray){
    function createHead(tableReference){
       const thead = document.createElement('thead');
       tableReference.appendChild(thead);
       return thead;
    }

    const theader = tableReference.querySelector('thead') ?? createHead(tableReference);
    const tr = document.createElement('tr');
    const cssProperties = ['bg-blue-800', 'text-white', 'text-bold', 'sticky', 'top-0'];
    cssProperties.forEach(property => tr.classList.add(property));
    for(const data of columnsArray){
        tr.innerHTML += /*html*/ `<th class="text-center"> ${data.columnLabel} </th>`
    }
    theader.appendChild(tr);
}


function createTbody(tableReference, columnsArray, dataArray){
    function createTbodyReference(tableReference){
        const tbody = document.createElement('tbody');
        tableReference.appendChild(tbody);
        return tbody;
    }

    const tbodyReference = tableReference.querySelector('tbody') ?? createTbodyReference(tableReference);
    for(const [index, data] of dataArray.entries()){
        const tr = document.createElement('tr');
        if(index % 2 !== 0){
            tr.classList.add('bg-blue-200');
        }
        for(const key of columnsArray){
            const chave = key.accessor;
            const format = key.format ?? (value => value);
            tr.innerHTML += /*html*/ `<td class="text-center"> ${format(data[chave])} </td>`
        }
        tbodyReference.appendChild(tr);
    }
}