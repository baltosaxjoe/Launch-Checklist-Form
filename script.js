// Write your JavaScript code here!
window.addEventListener("load", function(){
   destination = document.getElementById("missionTarget");
   fullForm = document.getElementsByTagName("form")
   submitButton = document.getElementById("formSubmit");
   pilotField = document.getElementById("pilotName");
   copilotField = document.getElementsByName("copilotName")[0];
   fuelField = document.getElementsByName("fuelLevel")[0];
   cargoField = document.getElementsByName("cargoMass")[0];
   faultyItems = document.getElementById("faultyItems");
   pilotStatus = document.getElementById("pilotStatus");
   copilotStatus = document.getElementById("copilotStatus");
   fuelStatus = document.getElementById("fuelStatus");
   cargoStatus = document.getElementById("cargoStatus");
   launchStatus = document.getElementById("launchStatus")
   num = Math.floor((Math.random()*6))

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      let planets = response.json();
      planets.then( function(json){
         destination.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[num].name}</li>
               <li>Diameter: ${json[num].diameter}</li>
               <li>Star: ${json[num].star}</li>
               <li>Distance from Earth: ${json[num].distance}</li>
               <li>Number of Moons: ${json[num].moons}</li>
            </ol>
            <img src="${json[num].image}">`
      })
   })
   
   submitButton.addEventListener("click", function(event){
      if ((pilotField.value == "") || (copilotField.value == "") || (cargoField.value == "") || (fuelField.value == "")) {
         event.preventDefault()
         window.alert("All fields must be filled")
      }
      if (!isNaN(pilotField.value) || !isNaN(copilotField.value)) {
         event.preventDefault()
         window.alert("Please enter a valid name in the pilot and copilot fields.")
      }
      if (isNaN(cargoField.value) || isNaN(fuelField.value)) {
         event.preventDefault();
         window.alert("Please enter a valid numerical value for the fuel and cargo fields")
      }

      if (fuelField.value < 10000){
         event.preventDefault()
         faultyItems.style.visibility = "visible";
         pilotStatus.innerHTML = `Pilot ${pilotField.value} is ready for launch.`
         copilotStatus.innerHTML = `Co-pilot ${copilotField.value} is ready for launch.`
         fuelStatus.innerHTML = "Not enough fuel to launch."
         launchStatus.style.color = "red";
         launchStatus.innerHTML = "Shuttle is not ready for launch."
      }

      if (cargoField.value > 10000){
         event.preventDefault()
         faultyItems.style.visibility = "visible";
         pilotStatus.innerHTML = `Pilot ${pilotField.value} is ready for launch.`
         copilotStatus.innerHTML = `Co-pilot ${copilotField.value} is ready for launch.`
         cargoStatus.innerHTML = "Cargo is too large to launch."
         launchStatus.style.color = "red";
         launchStatus.innerHTML = "Shuttle is not ready for launch."
      }
      
      if (fuelField.value >= 10000 && cargoField.value <= 10000) {
         event.preventDefault()
         launchStatus.style.color = "green";
         launchStatus.innerHTML = "Shuttle is ready for launch."
         faultyItems.style.visibility = "hidden";
      }
    

   })
})
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
