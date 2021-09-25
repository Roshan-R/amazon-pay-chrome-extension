let required_date = getDate();
// format of date : 24 Sep 2021

function getData() {
    let a_eles = document.querySelectorAll('.a-size-medium.a-color-attainable');
    let d_eles = document.querySelectorAll('.a-size-base.a-color-tertiary')

    let dates = [];
    let amounts = [];
    let sum = 0.0;

    for (let i = 0; i < a_eles.length; i++) {
        if (a_eles[0].innerText[0] == '+') {
            amounts.push(parseFloat(a_eles[i].innerText.substring(3)));
        }
    }

    for (let i = 0; i < d_eles.length; i++) {
        if (i % 3 == 0) { dates.push(d_eles[i + 1].innerText.substring(0, 11)); }
    }

    dates.forEach((date, index) => {
        if (date == required_date) {
            console.log(required_date);
            sum = sum + amounts[index];
        }
    });

    console.log('The total sum is : ', sum);
    let data = {
        sum: sum.toFixed(2),
        length: a_eles.length
    };
    return data;
}

function getDate() {
    var today = new Date();
    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]
    let m = months[today.getMonth()];
    let dd = String(today.getDate()).padStart(2, '0');
    let yyyy = today.getUTCFullYear();
    return dd + ' ' + m + ' ' + yyyy;
}


document.getElementById('scroller-content-desktop').innerHTML +=
`
<div id="total-tab-desktop" class="a-section option-desktop">
  <span class="a-declarative" data-action="total-tab-desktop" data-cashbacks-tab-desktop="{}">
      <span id="calculateTotal" class="a-size-small">
          Calculate Today's Total
      </span>
  </span>
</div>
`
let btn_calculate = document.getElementById('calculateTotal');
btn_calculate.addEventListener("click", getSum);

function getSum() {
    let data = getData();
    document.querySelector('.a-size-large').innerHTML = "Total : ₹" + data.sum;
    if (data.length <= 20) {
        alert("Are you sure you scrolled down far enough?");
        document.querySelector('.a-size-large').innerHTML += ' - Scroll down and check again';
    }
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(request, sender, sendResponse) {
    console.log(request);
    let new_day = request.substring(8);
    let old_day = required_date.split(' ')[0];
    required_date =  required_date.replace(old_day, new_day);
    console.log("New date : " + required_date);
    getSum();
}