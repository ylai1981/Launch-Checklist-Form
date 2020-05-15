window.addEventListener("load", function(){
   
   function launchCheck(){
      let pilotNameInput = document.getElementById("pilotName");
      let copilotNameInput = document.getElementById("copilotName");
      let fuelLevelInput = document.getElementById("fuelLevel");
      let cargoMassInput = document.getElementById("cargoMass");  

      function showShuttleStatus(){
         debugger;
         document.getElementById("faultyItems").style="visibility: visible";
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";
      }
   
     
      if(pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === ""){
         alert("ALL FIELDS ARE REQUIRED!");
         event.preventDefault();
      }else {
         if(!(isNaN(pilotNameInput.value)) || !(isNaN(copilotNameInput.value)) || isNaN(Number(fuelLevelInput.value)) || isNaN(Number(cargoMassInput.value))){
            alert("One or more field/s have an invalid input!");
            event.preventDefault();
         }else{
            document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
            document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;
         
        debugger;
            if(Number(fuelLevelInput.value) < 10000){
               showShuttleStatus(); 
               document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";  
               
            }else if(Number(cargoMassInput.value) > 10000){
               showShuttleStatus();
               document.getElementById("cargoStatus").innerHTML = "Cargo Mass too high for launch"; 
               
            }else {
               document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
               document.getElementById("launchStatus").style.color = "green"; 
               fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
                  response.json().then( function(json) {
                     const destination = document.getElementById("missionTarget");
                     let index = Math.round(Math.random()*5);
                     destination.innerHTML = `
                        <h2>Mission Destination</h2>
                        <ol>
                           <li>Name: ${json[index].name}</li>
                           <li>Diameter: ${json[index].diameter}</li>
                           <li>Star: ${json[index].star}</li>
                           <li>Distance from Earth: ${json[index].distance}</li>
                           <li>Number of Moons: ${json[index].moons}</li>
                        </ol>
                        <img src="${json[index].image}">
                     `;
                  });
               });

            }
                         
         }
      } 
      
   }
 
   document.addEventListener("submit", function(){   
      
      launchCheck();
      
      event.preventDefault();
      
      });

      
         
       

   });


