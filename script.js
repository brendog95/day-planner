$(document).ready(function() {
  
    // getting month, day and year using moment
    const now = moment().format('MMMM Do YYYY');
    
    // setting the time
    var nowHour24 = moment().format('H');

    // changing todays date header to current date
    var dateHead = $('.date-element');
    dateHead.text(now);
  
    // Get stored todos from localStorage
    // Parsing the JSON string to an object
    var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  
    // If plans were retrieved from localStorage, update the plan array to it
    if (storedPlans !== null) {
      planTextArr = storedPlans;
    } else {
      // only shows up if there are no stored plans
      planTextArr = new Array(7);
      planTextArr[6] = "Go for a bike ride!";
    }
  
    // set variable referencing planner element
    var plannerDiv = $('#plannerContainer');
    // clear existing elements
    plannerDiv.empty();
  
    // build calendar by row for fix set of hours
    for (var hour = 7; hour <= 17; hour++) {
      // index for array use offset from hour
      var index = hour - 7;
      
      // adding rows 
      var rowDiv = $('<div>');
      rowDiv.addClass('row');
      rowDiv.addClass('plannerRow');
      rowDiv.attr('hour-index',hour);
    
      // sets column width for the time
      var timeDiv = $('<div>');
      timeDiv.addClass('col-md-1');
    
      // create time-span element
      var timeSpan = $('<span>');
      // can use this to get value
      timeSpan.attr('class','time-span');
      
      // set hours to be displayed
      var showTime = 0;
      var timeOfDay = "";
      if (hour > 12) { 
        showTime = hour - 12;
        timeOfDay = "pm";
      } else {
        showTime = hour;
        timeOfDay = "am";
      }
      
      // populate time-span with time
      timeSpan.text(`${showTime} ${timeOfDay}`);
  
      // insert into col inset into time-span
      rowDiv.append(timeDiv);
      timeDiv.append(timeSpan);
  
      // build row components
      var dailyPlanSpan = $('<input>');
  
      dailyPlanSpan.attr('id',`input-${index}`);
      dailyPlanSpan.attr('hour-index',index);
      dailyPlanSpan.attr('type','text');
      dailyPlanSpan.attr('class','dailyPlan');
  
      // access index from data array for hour 
      dailyPlanSpan.val( planTextArr[index] );
      
      // create col to control width
      var inputDiv = $('<div>');
      inputDiv.addClass('col-md-9');
  
      // add col width and row component to row
      rowDiv.append(inputDiv);
      inputDiv.append(dailyPlanSpan);
      // STOP building Time box portion of row
  
      // creates save button area
      var saveDiv = $('<div>');
      saveDiv.addClass('col-md-2');

      //creates a save button and adds a class for styling
      var saveButton = $('<button>');
      saveButton.text("Set Plan")
      saveButton.addClass("save-button")
      
      // add col width and row component to row
      rowDiv.append(saveDiv);
      saveDiv.append(saveButton);
      
      // set row color based on time
      changeRowColor(rowDiv, hour);
      
      // add row to planner container
      plannerDiv.append(rowDiv);
    };
  
    // sets the new colors for each row depending on the hour
    function changeRowColor ($hourRow,hour) { 
      if ( hour < nowHour24) {
        $hourRow.css("background-color","lightblue")
      } else if ( hour > nowHour24) {
        $hourRow.css("background-color","lightgreen")
      } else {
        $hourRow.css("background-color","#FFFF99")
      }
    };
  
    // saves to local storage
    // conclick function to listen for user clicks on plan area
    $(document).on('click','button', function(event) {
      event.preventDefault();

      var input= dailyPlanSpan.val();
      console.log(input)
      
      localStorage.setItem("dailyplan", input);


  
    });
  });