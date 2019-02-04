const $integerList = document.getElementById("integerList");
const $nosOfSeries = document.getElementById("nosOfSeries");
const $result = document.getElementById("result");
const $compute = document.getElementById("compute");






$compute.addEventListener("click",(event)=>{

    

    //Ran test to ensure that the input values
    //can be converted to integers.
    //Using Number() function.
    //This will cater for unwanted input
    //e.g letters or punctuation marks
    let isIntegerListValid = true;
    let isNumberOfSeriesValid = true;

    

    
/////////////////////////////////////////////////////////////////////////////
//TEST FOR WRONG INPUT
////////////////////////////////////////////////////////////////////////////

    //Check if any of the inputs are empty
    if(!$integerList.value || !$nosOfSeries.value){
        $result.innerHTML=`You have an empty input! Please amend and retry.`;
        return;
    }


    //using Number() function to convert the string to numbers
    //the Number() function will return NaN for strings that 
    //cant be changed to numbers. Using that I'll update the UI
    //accordingly.

    //Check if values the result of the number function
    //is NaN or not.
    if(isNaN(Number($integerList.value)) === true){
        isIntegerListValid = false;
    }

    if(isNaN(Number($nosOfSeries.value)) === true){
        isNumberOfSeriesValid = false;
    }
    

    if((isIntegerListValid === false) && (isNumberOfSeriesValid === false)){
        $result.innerHTML = `'Digits' and 'Number Of Series' entered are incorrect. Please ensure the values are numbers and try again. Thanks`;
        return;
    }
    else if(isIntegerListValid === false){
        $result.innerHTML = `'Digit(s)' entered are incorrect. Please ensure the 'Digit(s)' are numbers and try again. Thanks`;
        return;
    }
    else if(isNumberOfSeriesValid === false){
        $result.innerHTML = `'Number Of Series' entered are incorrect. Please ensure the 'Number Of Series' are numbers and try again. Thanks`;
        return;
    }

    ///////////////////////////////////////////////////////////////////////
    // END OF TEST FOR WRONG INPUT
    ///////////////////////////////////////////////////////////////////////


    //converting integer list from string to number
    //and storing in an array
    const integerListArray = $integerList.value.split("").map((x)=>Number(x));

    //series of Digits value
    const seriesDigits = Number($nosOfSeries.value);

    //Initialise array that will contain the results 
    //of the products of the series digits;
    let results = [];

    //carry out calculations to find
    //largest product of a series of (x) digits

    for(let x = 0; x < integerListArray.length; x++){
        

        //from where we are in the array
        //check if the numbers to compute exceed the array length
        if((x+ seriesDigits) <= integerListArray.length){
            
            //extract the part of the array needed
            let computeSeries = integerListArray.slice(x,(x+seriesDigits));
            

            //conducted the multiplication of the numbers
            //from the computeSeries array and store in the results array;
            //using the reduce array method
            results[x] = computeSeries.reduce((total, number) => {
                return total*number;
            });
            

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
//that were involved in the product of the digits

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

    //used the indexOfLargestNumber
    //to find the digits used in the product
    //
    //The index value of a result in the "result" array
    //is also the index value of the first number
    //that begins the product of the digits

    digits = arrayList.slice(indexOfLargestNumber,(indexOfLargestNumber+seriesDigits)).join("*");


    $result.innerHTML = `For the input '${$integerList.value}', the largest product for a series of ${seriesDigits} digit(s) is ${largestNumber} (${digits}).`
}

