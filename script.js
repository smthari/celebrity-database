// function to convert number to lakh and crore
function numDifferentiation(value) {
  var val = Math.abs(value);
  if (val >= 10000000) {
    val = (val / 10000000).toFixed(2) + " Cr";
  } else if (val >= 100000) {
    val = (val / 100000).toFixed(2) + " Lac";
  }
  return val;
}

// function to get date of birth
function DateOfBirth(value) {
  // replace - from date
  var dob = value.replaceAll("-", " ");
  // console.log(dob);

  // month names array we'll use to find month of above dob
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // getting month in number by slicing assiging as index
  let index = dob.slice(5, 7);

  // substring month number index - 1 to find proper month eg : 10-1 = 9 sep because above index counted from 0
  let month = monthNames[index - 1];

  // replaced dob to find month
  dobMonth = dob.replace(index, month);
  // console.log(dobMonth);
  return dobMonth;
}

// for testing purpose
/* let date = "2022/21/10";
DateOfBirth(date); */

// targeting form element by id
const form = document.getElementById("my_form");

// adding submit event listner to form and calling getVal function
form.addEventListener("submit", function getVal(event) {
  // event prevent to clear form
  event.preventDefault();

  // getting value of input by id
  const celebrity = document.getElementById("celebrity").value;
  console.log(celebrity); // for demo purpose

  // to clear form input with reset and prevent default
  form.reset();

  // rapid api ninja celebrity api
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "634c0cf5d3mshc19c84eabf50dc7p1e5c91jsnab06b9aadfc1",
      "X-RapidAPI-Host": "celebrity-by-api-ninjas.p.rapidapi.com",
    },
  };

  // fetching api
  // passed celebrity as an variable for dynamic search
  fetch(
    "https://celebrity-by-api-ninjas.p.rapidapi.com/v1/celebrity?name=" +
      celebrity,
    options
  )
    // transforming response in json format
    .then((response) => response.json())
    .then((response) => {
      // printing response in log to see all possible object properties
      console.log(response[0]);
      console.log(typeof response[0]);

      // assigned response to data variable
      const data = response[0];

      // destructuring  all possibile object properties
      const {
        name,
        age,
        gender,
        birthday,
        nationality,
        net_worth,
        height,
        occupation,
      } = data;

      // console.log(occupation);

      // replaced _ by " " alloccupation and joined with ", "
      const alloccupation = occupation.join(", ").toString().replace(/_/g, " ");
      // console.log(alloccupation);

      // targeting main contaienr by id
      const container = document.getElementById("container");

      // creating new div element and setting class attribute
      const info = document.createElement("div");
      info.setAttribute("class", `information`);

      // html code for info container and table ui
      // used ternary operator to pass condition in each table row data to check if value is undefined then add --- else return value
      info.innerHTML = `
      <h1 class="heading" id="headingResult">Celebrity Results</h1>
      <table>
      <thead>
      <tr><th colspan="2">${name}</th></tr>
      </thead>
      <tbody>
      
      <tr><td>age</td><td>${age == undefined ? " --- " : age}</td></tr>
              <tr><td>gender</td><td>${
                gender == undefined ? " --- " : gender
              }</td></tr>
              <tr><td>birthday</td><td>${
                DateOfBirth(birthday.toString())
                /* birthday.toString() == undefined ? " --- " : birthday.toString() */
              }</td></tr>
              <tr><td>occupation</td><td>${
                alloccupation == undefined ? " --- " : alloccupation
              }</td></tr>
              <tr><td>Net Worth</td><td>INR ${numDifferentiation(
                net_worth
              )}</td></tr>
              <tr><td>nationality</td><td>${
                nationality.toUpperCase() == undefined
                  ? " --- "
                  : nationality.toUpperCase()
              }</td></tr>
              <tr><td>height</td><td>${
                height == undefined ? " --- " : height
              }</td></tr>
      </tbody>
      </table>
      `;

      /* appending info div into info container */
      container.append(info);

      /* styling result heading using cssText  */
      document.getElementById("headingResult").style.cssText =
        "color: #111; text-transform:capitalize; padding-top:1rem; ";
    })

    // catching error
    .catch((err) => {
      // alert if user not found
      alert(celebrity + " Not Found !");

      // printing error in log to see exact error
      console.log(err);
    });
});
