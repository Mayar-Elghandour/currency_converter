const listselect = document.querySelectorAll("select");
const button = document.querySelector("button");
const fromcode= document.getElementById("from");
const tocode= document.getElementById("to");
let fromflag = document.querySelector(".fromflag");
let toflag = document.querySelector(".toflag");

for (let i = 0; i < listselect.length; i++) {
    for(currency_code in country_code){
        
        let selected;
        if (i==0){
            selected = currency_code==="USD" ? "selected" : "";
        }if(i==1){
            selected = currency_code==="EUR" ? "selected" : "";
        }
    
    let option= `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    listselect[i].innerHTML += option;
    }



}
listselect[0].addEventListener("change", ()=>{
    console.log("changed");
    for(currency_code in country_code){
        if(listselect[0].value===currency_code){
            console.log(country_code[currency_code]);
            fromflag.src = `https://flagsapi.com/${country_code[currency_code]}/flat/64.png`;
        }
    }
    getrate();
 });
listselect[1].addEventListener("change", ()=>{
    console.log("changed");
    for(currency_code in country_code){
        if(listselect[1].value===currency_code){
            console.log(country_code[currency_code]);
            toflag.src = `https://flagsapi.com/${country_code[currency_code]}/flat/64.png`;
        }
    }
    getrate();
 });

window.addEventListener("load", ()=>{
    getrate();
});
button.addEventListener("click", e=>{
    e.preventDefault();
    getrate();
});

function getrate(){
    const amount = document.getElementById("converter");
    let amountvalue = amount.value;
    if(amountvalue==""|| amountvalue==0){
        amount.value="1";
        amountvalue=1;   
    }
    
let url=`https://open.er-api.com/v6/latest/${fromcode.value}`;
fetch(url).then(response => response.json()).then(result=>{
    console.log(result.rates[tocode.value]);
    let rate = result.rates[tocode.value];
    let convertedamount = amountvalue * rate;
    document.getElementById("result").innerHTML=`${amountvalue} ${fromcode.value} = ${convertedamount} ${tocode.value}`;
});

}   
