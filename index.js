const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-12-01/v1/currencies";




const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (let select of dropdown) {
    for (let Currcode in countryList) {
        let option = document.createElement("option");
        option.value = Currcode;
        option.innerText = Currcode;
        if (select.name === "from" && Currcode === "USD") {
            option.selected = "selected";
        } else if (select.name === "to" && Currcode === "INR") {
            option.selected = "selected";
        }
        select.append(option);
    }


    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });
}

const updateflag = (element) => {
    let Currcode = element.value;
    let countrycode = countryList[Currcode];
    let Newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = Newsrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtvalue = amount.value;
    if (amtvalue === "" || amtvalue <= 0) {
        amtvalue = 1;
    }

    btn.addEventListener("click", async (evt) => {
        evt.preventDefault();

        let amount = document.querySelector(".amount input");
        let amtvalue = amount.value;

        if (amtvalue === "" || amtvalue <= 0) {
            amtvalue = 1;
        }

        
        const from = fromcurr.value.toLowerCase();
        const to = tocurr.value.toLowerCase();

        const URL = `${BASE_URL}/${from}.json`;

        try {
            let response = await fetch(URL);
            let data = await response.json();

            
            let rate = data[from][to];
            if (!rate) throw new Error("Exchange rate not found");

            let finalAmount = (amtvalue * rate).toFixed(2);
            msg.innerText = `${amtvalue} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
        } catch (error) {
            msg.innerText = "Error fetching exchange rate.";
            console.error("Fetch error:", error);
        }
    });


});
window.addEventListener("load", () => {
  updateExchangeRate();
});
