$(function () {
  // Function to create time blocks dynamically
  function createTimeBlocks() {
    // Get the current date using day.js
    var currentDate = dayjs();

    // Calculate the start date of the current day at 9am
    var startDate = currentDate.set('hour', 9).set('minute', 0);

    // Main container for time blocks
    var timeBlocksContainer = $('#timeBlocksContainer');

    // Loop to create time blocks for standard business hours (9 AM to 5 PM)
    for (var i = 9; i <= 17; i++) {
      // Calculate the date for each time block
      var currentHour = startDate.add(i - 9, 'hour');

      // Create elements for each time block
      var timeBlock = $('<div>').addClass('row time-block');
      var timeOfDayDiv = $('<div>').addClass('time-of-day col-2 col-md-1').text(
        currentHour.format('hA'));
      var textArea = $('<textarea>').addClass('col-8 col-md-10 description');
      var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').html(
        '<i class="fas fa-save" aria-hidden="true"></i>');

      // Set the id for each time block
      timeBlock.attr('id', `hour-${i}`);

      // Add past, present, or future class based on the current time
      if (currentHour.isBefore(currentDate, 'hour')) {
        timeBlock.addClass('past');
      } else if (currentHour.isSame(currentDate, 'hour')) {
        timeBlock.addClass('present');
      } else {
        timeBlock.addClass('future');
      }

      // Retrieve saved event from localStorage and set it in the textarea
      var savedEvent = localStorage.getItem(`hour-${i}`);
      if (savedEvent !== null) {
        textArea.val(savedEvent);
      }

      // Append elements to the time block
      timeBlock.append(timeOfDayDiv, textArea, saveBtn);

      // Append the time block to the container
      timeBlocksContainer.append(timeBlock);
    }
  }

  // Click event for save button
  $('#timeBlocksContainer').on('click', '.saveBtn', function () {
    // Get the id of the parent time block
    var timeBlockId = $(this).parent().attr('id');
    // Get the user's description from the textarea
    var userDescription = $(this).siblings('.description').val();
    // Save the user's description in localStorage
    localStorage.setItem(timeBlockId, userDescription);
  });

  // Display the current date in the header
  var currentDate = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(currentDate);

  // Create time blocks when the page loads
  createTimeBlocks();
});

