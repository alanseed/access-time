// function to set the local time and make the table 
function makeTable() {
  var rows = document.getElementsByTagName("tr") ;
  var curTime = luxon.DateTime.now().setLocale("Australia/Sydney");
  var startTime = curTime.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  var startTimeUtc = startTime.toUTC();
  var numberDays = 7;
  var numberHours = numberDays * 24;

  var table = d3.select("table") ; 
  table.selectAll("tbody").remove(); 
  table.append("tbody"); 
  var tbody = table.select("tbody");

  for (let i = 0; i < numberHours; i++) {
    let offset = new luxon.Duration.fromObject({ hours: i });
    let rowTime = startTime.plus({ hours: i });
    let rowTimeUTC = startTimeUtc.plus({ hours: i });
    let row = tbody.append("tr");
    let cell = row.append("td");
    cell.text(rowTime.setLocale('au').toFormat('dd/HH'));
    let cellUTC = row.append("td"); 
    cellUTC.text(rowTimeUTC.setLocale('au').toFormat('dd/HH'));
  }
};

makeTable();
