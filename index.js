/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(array) {
    const [firstName, familyName, title, payPerHour] = array;
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }

  function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find((employee) => employee.firstName === firstNameString);
  }
// this function creates a new TimeiNEvent object for the employee.
//the function takes a dateStamp parameter in the format "YYYY-MM-DD HH:mm", splits it into date and hour.
//the newly created TimeInEvent object is returned with the provided date and hour.
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const timeInEvent = {
      type: 'TimeIn',
      hour: parseInt(hour),
      date,
    };
    this.timeInEvents.push(timeInEvent);
    return this;
  }

// Creates a new TimeOutEvent object for the employee.
//The function takes a dateStamp parameter in the format "YYYY-MM-DD HH:mm", splits it into date and hour.
//The newly created TimeOutEvent object is returned with the provided date and hour.
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const timeOutEvent = {
      type: 'TimeOut',
      hour: parseInt(hour),
      date,
    };
    this.timeOutEvents.push(timeOutEvent);
    return this;
  }
//Calculates the hours worked by the employee on a specific date.
  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = this.timeOutEvents.find((event) => event.date === date);

    if (timeInEvent && timeOutEvent) {
      const timeIn = timeInEvent.hour;
      const timeOut = timeOutEvent.hour;
      const hoursWorked = (timeOut - timeIn) / 100;
      return hoursWorked;
    }
  }
//Calculates the wages earned by the employee on a specific date.
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const amountOwed = hoursWorked * this.payPerHour;
    return amountOwed;
  }
//Creates an array of EmployeeRecords from an array of employee data.
  function createEmployeeRecords(array) {
    return array.map((emp) => createEmployeeRecord(emp));
  }
//Calculates the total payroll for all employees.
  function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;

    employeeRecords.forEach((employee) => {
      totalPayroll += allWagesFor.call(employee);
    });

    return totalPayroll;
  }