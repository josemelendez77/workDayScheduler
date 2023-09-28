$(document).ready(function() {
  const todaysDate = moment();
  $("#currentDay").text(todaysDate.format("dddd | MMMM Do YYYY | hh:mm a"));
  function createScheduler(date) {
      date = moment(date).hour(8);

      for (let i = 0; i < 12; i++) {
        
          const rowDiv = $("<div>").addClass("row").attr("id", `row${i}`);

          const hourDiv = $("<div>").addClass("col-1 hour time-block d-flex align-items-center justify-content-center").text(date.format("H a")).attr("id", `hour${i}`);
          
          const textDiv = $("<textarea>").addClass("col-10 time-block text-box save-block").attr("id", `text${i}`);
          
          const saveDiv = $("<div>").addClass("col-1 d-flex align-items-center justify-content-center saveBtn save-block");
          let saveBtnIcon = $("<button>").addClass("btn fas fa-save fa-lg save-button").attr("id", i).attr("title", "Save");
                    
          $(".container").append(rowDiv.append(hourDiv,textDiv,saveDiv.append(saveBtnIcon)));
          if (todaysDate.isAfter(date, "hour")) {
              textDiv.addClass("past");
          } else if (todaysDate.isBefore(date, "hour")) {
              textDiv.addClass("future");
          } else {
              textDiv.addClass("present");
          }
          date.add(1, "hour");
      }        
  }

  $( window ).on("load", createScheduler());
  let saveButton = $(".saveBtn");
  let textBox = $(".text-box");
  let clearBtn = $(".clr-btn");

  function displayToDo() {
      for (let i = 0; i < 12; i++) {
          let storedCalList = localStorage.getItem("text" + i);
          $("#text" + i).text(storedCalList);
      }
  }

  function addText(event) {
      event.preventDefault();
      localStorage.setItem($(this)[0].previousElementSibling.id, $(this)[0].previousElementSibling.value);
  }
  saveButton.click(addText);
  displayToDo();

  clearBtn.on("click", function() {
      localStorage.clear();
      textBox.empty();
      location.reload();
  });
});