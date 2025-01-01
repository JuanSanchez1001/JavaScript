class Excel {
    constructor(excel){
        this.contet = excel
    }

    header(){
        //console.log(this.contet[0]);
        return this.contet[0]
        
    }

    rows(){
        //return this.contet.slice(1,this.contet.length)
        return new RowCollection(this.contet.slice(1,this.contet.length))
    }
}
class RowCollection {
    constructor(rows){
        this.rows = rows
    }

    get(index){
        return new Row(this.rows[index])
    }

    count(){
        return this.rows.length;
    }
}
class Row{
    constructor(row){
        this.row = row
    }
    Component(){
        return this.row[0]
    }
    Description(){
        return this.row[1];
    }
    recipeQTY(){
        return this.row[2];
    }
    recipeUnit(){
        return this.row[3];
    }
    Price(){
        return this.row[4];
    }
    totalPrice(){
        var total=this.row[2] / this.row[4]
        return total.toFixed(4);
    }
}

class ExcelPrinter {
    static print(tableID, excel){
        const table = document.getElementById(tableID);
        console.log(table)

        excel.header().forEach(element => {
            table.querySelector("thead>tr").innerHTML += `<td>${element}</td>`
        });
        
        for(var i=0; i < excel.rows().count(); i++){
            const row = excel.rows().get(i);
            console.log(row)
            table.querySelector("tbody").innerHTML +=  `
                <tr>
                    <td>${row.Component()}</td>
                    <td>${row.Description()}</td>
                    <td>${row.recipeQTY()}</td>
                    <td>${row.recipeUnit()}</td>
                    <td>${row.totalPrice()}</td>
                </tr>
            `
        }
    }
}


const excelInput = document.getElementById('excel-file')

excelInput.addEventListener('change', async function(){
    const content = await readXlsxFile( excelInput.files[0] )
    const excel = new Excel(content)
    //console.log(excel.contet)
    
    console.log(ExcelPrinter.print("table-excel",excel));
});

//console.log(excelInput)