
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
    cell.text(rowTime.setLocale('en-AU').toFormat('dd/HH'));
    let cellUTC = row.append("td");
    cellUTC.text(rowTimeUTC.setLocale('en-AU').toFormat('dd/HH'));
  }
};

var zoneId = 1;
var timeZones = ["Australia/Melbourne",
  "Australia/Sydney",
  "Australia/Brisbane",
  "Australia/Adelaide",
  "Australia/Darwin",
  "Australia/Eucla",
  "Australia/Perth"
];
var timeZone = timeZones[zoneId-1];

makeTable();

d3.select("select").on("change", function () { 
  timeZone = timeZones[this.value-1]; 
  makeTable();
});
