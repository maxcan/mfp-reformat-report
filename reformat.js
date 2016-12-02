// @match        http: month =//www.myfitnesspal.com/reports/printable_diary/canmax

$(document).ready(function () {
    // console.log("running reformat from ext");
    $("#wagtable").remove();
    var tableHtml = "<table class='table0' width='800' id='wagtable'><tr><td>date</td> " +
        "<td>cals</td> <td>carbs</td> <td>fat</td> " +
        "<td>protein</td><td>cholest (MG)</td>  <td>sodium (MG)</td> " +
        "<td>sugars</td><td>fiber</td></tr></table>"
    $("body").prepend(tableHtml);

    $("h2.main-title-2").each(function (idx, obj) {
        var dt = $(obj).text();
        var ftr = $(obj).next().find("tfoot tr").clone();

        ftr.find("td.first").text(dt).addClass("date");
        ftr.find("td").each(function (tdIdx, tdObj) {
            $(tdObj).text($(tdObj).text().replace(/m?g/, ""));
        });
        // console.log(ftr.html());
        $("#wagtable").append(ftr);
    }
    );
    $("table#wagtable td.last").removeClass("last");
    $.getJSON("http://www.myfitnesspal.com/reports/results/progress/1/90.json?report_name=Weight&").done(
        function (wgtResults) {
            if (!wgtResults || !wgtResults.data) {
                // console.log("didn't receive weight data");
                return;
            }
            var wgtData = _.fromPairs(_.map(wgtResults.data, function (o) { return [o.date, o.total] }));
            // console.log("found wgt Results:", wgtResults, wgtData)
            $("table#wagtable tr").each(function (idx, tableRow) {
                if (idx == 0) {
                    $(tableRow).append("<td>weight</td>");
                    return
                }
                // console.log("converting str: " , $(tableRow).find("td.date").text(),
                // " to: ", dtStrToShort($(tableRow).find("td.date").text()))
                var wgt = wgtData[dtStrToShort($(tableRow).find("td.date").text())]
                wgt = wgt || "<em>missing</em>";
                $(tableRow).append("<td>" + wgt + "</td>")
            })
        }
    )
});

function dtStrToShort(dtStr) {
    var month;
    var mtch = dtStr.match(/^\s*([A-Za-z]*)\s+(\d+),\s*\d*\s*$/);
    if (!mtch || mtch.length < 3) { return null }
    var day = (Number(mtch[2]) < 10 ? "0" + mtch[2] : month = mtch[2]);
    switch (mtch[1]) {
        case "January": month = "1"; break;
        case "February": month = "2"; break;
        case "March": month = "3"; break;
        case "April": month = "4"; break;
        case "May": month = "5"; break;
        case "June": month = "6"; break;
        case "July": month = "7"; break;
        case "August": month = "8"; break;
        case "September": month = "9"; break;
        case "October": month = "10"; break;
        case "November": month = "11"; break;
        default: month = "12"
    }
    return month + "/" + day;
}
