
// function to set the local time and make the table 
function makeTable() {
  var curTime = luxon.DateTime.local().setZone(timeZone);
  var startTime = curTime.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  var startTimeUtc = startTime.toUTC();
  var numberDays = 7;
  var numberHours = numberDays * 24;

  var table = d3.select("table");
  table.selectAll("tbody").remove();
  table.append("tbody");
  var tbody = table.select("tbody");

  for (let i = 0; i < numberHours; i++) {
    let rowTime = startTime.plus({ hours: i });
    let rowTimeUTC = startTimeUtc.plus({ hours: i });
    let row = tbody.append("tr");
    let cell = row.append("td");
    cell.text(rowTime.setLocale('en-AU').toFormat('dd/HH:mm'));
    let cellUTC = row.append("td");
    cellUTC.text(rowTimeUTC.setLocale('en-AU').toFormat('dd/HH:mm'));
  }
};

var zoneId = 4;
var timeZones = [
  "Australia/Lord_Howe",
  "Antarctica/Macquarie",
  "Australia/Hobart",
  "Australia/Melbourne",
  "Australia/Sydney",
  "Australia/Broken_Hill",
  "Australia/Brisbane",
  "Australia/Lindeman",
  "Australia/Adelaide",
  "Australia/Darwin",
  "Australia/Perth",
  "Australia/Eucla"
];
var timeZone = timeZones[zoneId-1];

makeTable();

d3.select("select").on("change", function () { 
  timeZone = timeZones[this.value-1]; 
  makeTable();
});
