const $integerList = document.getElementById("integerList");
const $nosOfSeries = document.getElementById("nosOfSeries");
const $result = document.getElementById("result");
const $compute = document.getElementById("compute");






$compute.addEventListener("click",(event)=>{
    //converting integer list from string to number
    //and storing in an array

    const integerListArray = $integerList.value.split("").map((x)=>Number(x));

    //series Digits products value
    const seriesDigits = Number($nosOfSeries.value);
    console.log(integerListArray);
    //array containing result of product of digits;
    let results = [];

    //carry out calculations to find
    //largest product of a series of 3 digits

    for(let x = 0; x < integerListArray.length; x++){
        console.log(x+seriesDigits,integerListArray.length);

        //from where we are in the array
        //check if the numbers to compute exceed the array length
        if((x+ seriesDigits) <= integerListArray.length){
            
            //extract the part of the array needed
            let computeSeries = integerListArray.slice(x,(x+seriesDigits));
            console.log(computeSeries);

            //conduct the multiplication of the numbers
            //from the array and store in result object;
            results[x] = computeSeries.reduce((total, number) => {
                return total*number;
            });
            console.log(results);

        }
        else{
            //setting x to equal array length to break out of for loop
            x = integerListArray.length
        }


        
    }


    //Results have been stored in "results"
    //Now need to find the largest product and
    //determine the digits that were multiplied from the listarray
    //to arrive at the value.
    //
    //The index value of a result in the "result" array
    //is also the index value of the first number
    //that begins the product of the digits

    displayResults(integerListArray,results,seriesDigits);
    

    
});


//created a function to find the largest number in
//the results array and then determine the three digits
//that were involved in the product of digits

function displayResults(integerListArray,results, seriesDigits){
    let arrayList = integerListArray;
    let arrayResult = results;
    let largestNumber = 0;
    let indexOfLargestNumber=0;
    let digits = seriesDigits;

    //Went through each element in
    //resultsarray to find the largest number
    //and the index

    arrayResult.forEach((element,index) => {
        if(element>largestNumber){
            largestNumber = element;
            indexOfLargestNumber =  index;
        }
    });

    //use the indexOfLargestNumber
    //to find the digits used in the product
    //
    //The index value of a result in the "result" array
    //is also the index value of the first number
    //that begins the product of the digits

    digits = arrayList.slice(indexOfLargestNumber,(indexOfLargestNumber+seriesDigits)).join("*");


    $result.innerHTML = `Largest product for a series of ${seriesDigits} digit(s) is ${largestNumber} (${digits}). index:${indexOfLargestNumber}`
}