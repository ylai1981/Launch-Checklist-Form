window.addEventListener("load", function(){
   
   function launchCheck(){
      let pilotNameInput = document.getElementById("pilotName");
      let copilotNameInput = document.getElementById("copilotName");
      let fuelLevelInput = document.getElementById("fuelLevel");
      let cargoMassInput = document.getElementById("cargoMass");  
      let status;

      function showShuttleStatus(status){
         
         if(status === 1){
            document.getElementById("faultyItems").style="visibility: hidden";
            document.getElementById("launchStatus").innerHTML = "Awaiting Information Before Launch";
            document.getElementById("launchStatus").style.color = "black";
            document.getElementById("missionTarget").innerHTML = "";
         }else if(status === 2){
            document.getElementById("faultyItems").style="visibility: visible";
            document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready For Launch";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("missionTarget").innerHTML = "";
         }else if(status === 3){
            document.getElementById("faultyItems").style="visibility: hidden";
            document.getElementById("launchStatus").innerHTML = "Shuttle Is Ready For Launch";
            document.getElementById("launchStatus").style.color = "green"; 
         }
         
      }
   
     
      if(pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === ""){
         status = 1;
         alert("ALL FIELDS ARE REQUIRED!");
         showShuttleStatus(status);
         
      }else { 
         
         if(!(isNaN(pilotNameInput.value)) || !(isNaN(copilotNameInput.value)) || isNaN(Number(fuelLevelInput.value)) || isNaN(Number(cargoMassInput.value))){
            
            status = 1;
            alert("One or more field/s have an invalid input!");
            showShuttleStatus(status);
         }else{
            
            document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
            document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;
         
        
            if(Number(fuelLevelInput.value) < 10000 && Number(cargoMassInput.value) > 10000){
               
               status = 2;
               document.getElementById("fuelStatus").innerHTML = "Fuel Level too low for launch";
               document.getElementById("cargoStatus").innerHTML = "Cargo Mass too high for launch";
               showShuttleStatus(status); 
            }else if(Number(fuelLevelInput.value) < 10000){
               
               status = 2;
               document.getElementById("fuelStatus").innerHTML = "Fuel Level too low for launch";  
               document.getElementById("cargoStatus").innerHTML = "Cargo Mass low enough for launch"
               showShuttleStatus(status); 
            }else if(Number(cargoMassInput.value) > 10000){
               
               status = 2;
               document.getElementById("cargoStatus").innerHTML = "Cargo Mass too high for launch"; 
               document.getElementById("fuelStatus").innerHTML = "Fuel Level high enough for launch"
               showShuttleStatus(status); 
            }else {
               
               status = 3;
               showShuttleStatus(status);
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
      debugger;
      launchCheck();
      event.preventDefault();
      
      });

      
         
       

   });


