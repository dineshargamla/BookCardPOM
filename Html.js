const fs = require('fs');
const path = require('path');
const os = require('os');
const  timeStamp = new Date().getTime();
// const path = require('path');


class HtmlReportSupport {
    static iStartTime = 0;
    static iEndTime = 0;
    static iExecutionTime = 0;
    static iSuiteStartTime = 0;
    static iSuiteEndTime = 0;
    static iSuiteExecutionTime = 0;
    static list = [];
    static startStepTime = 0;
    static endStepTime = 0;
    static stepExecutionTime = 0;
    static strTestName = "";
    static startedAt = "";
    static tc_name = "";
    static packageName = "";
    static map = new Map();
    static executionTime = new Map();
    // static config = new ConfiguratorSupport("config.properties");
    static currentSuit = "";
    static pCount = 0;
    static fCount = 0;
    static key = [];
    static value = [];
    static workingDir = process.cwd().replace(new RegExp(`\\${path.sep}`, 'g'), "/");
    static BFunctionNo = 0;

    // static configProps = new ConfiguratorSupport("config.properties");
    async createHtmlSummaryReport() {
// Example report object with filePath function and timeStamp property
const report = {
    filePath: () => __dirname, // Replace with your actual path retrieval function
    timeStamp: new Date().toISOString().replace(/[:.-]/g, "_"), // Example timestamp
  };
  const filePath = path.join(report.filePath(), "SummaryResults_" + report.timeStamp + ".html");
  let writer;

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        writer = fs.createWriteStream(filePath, { flags: 'a' });

        try {
            writer.write("<!DOCTYPE html>");
            writer.write("<html> ");
            writer.write("<head> ");
            writer.write("<meta charset='UTF-8'> ");
            writer.write("<title>Quickflix - Automation Execution Results Summary</title>");

            writer.write("<style type='text/css'>");
            writer.write("body {");
            writer.write("background-color: #FFFFFF; ");
            writer.write("font-family: Verdana, Geneva, sans-serif; ");
            writer.write("text-align: center; ");
            writer.write("} ");

            writer.write("small { ");
            writer.write("font-size: 0.7em; ");
            writer.write("} ");

            writer.write("table { ");
            writer.write("box-shadow: 9px 9px 10px 4px #BDBDBD;");
            writer.write("border: 0px solid #4D7C7B;");
            writer.write("border-collapse: collapse; ");
            writer.write("border-spacing: 0px; ");
            writer.write("width: 1000px; ");
            writer.write("margin-left: auto; ");
            writer.write("margin-right: auto; ");
            writer.write("} ");

            writer.write("tr.heading { ");
            writer.write("background-color: #041944;");
            writer.write("color: #FFFFFF; ");
            writer.write("font-size: 0.7em; ");
            writer.write("font-weight: bold; ");
            writer.write("background:-o-linear-gradient(bottom, #999999 5%, #000000 100%);	background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #999999), color-stop(1, #000000) );");
            writer.write("background:-moz-linear-gradient( center top, #999999 5%, #000000 100% );");
            writer.write("filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#999999, endColorstr=#000000);	background: -o-linear-gradient(top,#999999,000000);");
            writer.write("} ");

            writer.write("tr.subheading { ");
            writer.write("background-color: #6A90B6;");
            writer.write("color: #000000; ");
            writer.write("font-weight: bold; ");
            writer.write("font-size: 0.7em; ");
            writer.write("text-align: justify; ");
            writer.write("} ");

            writer.write("tr.section { ");
            writer.write("background-color: #A4A4A4; ");
            writer.write("color: #333300; ");
            writer.write("cursor: pointer; ");
            writer.write("font-weight: bold;");
            writer.write("font-size: 0.8em; ");
            writer.write("text-align: justify;");
            writer.write("background:-o-linear-gradient(bottom, #56aaff 5%, #e5e5e5 100%);	background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #56aaff), color-stop(1, #e5e5e5) );");
            writer.write("background:-moz-linear-gradient( center top, #56aaff 5%, #e5e5e5 100% );");
            writer.write("filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#56aaff, endColorstr=#e5e5e5);	background: -o-linear-gradient(top,#56aaff,e5e5e5);");

            writer.write("} ");

            writer.write("tr.subsection { ");
            writer.write("cursor: pointer; ");
            writer.write("} ");

            writer.write("tr.content { ");
            writer.write("background-color: #FFFFFF; ");
            writer.write("color: #000000; ");
            writer.write("font-size: 0.7em; ");
            writer.write("display: table-row; ");
            writer.write("} ");

            writer.write("tr.content2 { ");
            writer.write("background-color:#;E1E1E1");
            writer.write("border: 1px solid #4D7C7B;");
            writer.write("color: #000000; ");
            writer.write("font-size: 0.7em; ");
            writer.write("display: table-row; ");
            writer.write("} ");

            writer.write("td, th { ");
            writer.write("padding: 5px; ");
            writer.write("border: 1px solid #4D7C7B; ");
            writer.write("text-align: inherit\0/; ");
            writer.write("} ");

            writer.write("th.Logos { ");
            writer.write("padding: 5px; ");
            writer.write("border: 0px solid #4D7C7B; ");
            writer.write("text-align: inherit /;");
            writer.write("} ");

            writer.write("td.justified { ");
            writer.write("text-align: justify; ");
            writer.write("} ");

            writer.write("td.pass {");
            writer.write("font-weight: bold; ");
            writer.write("color: green; ");
            writer.write("} ");

            writer.write("td.fail { ");
            writer.write("font-weight: bold; ");
            writer.write("color: red; ");
            writer.write("} ");

            writer.write("td.done, td.screenshot { ");
            writer.write("font-weight: bold; ");
            writer.write("color: black; ");
            writer.write("} ");

            writer.write("td.debug { ");
            writer.write("font-weight: bold; ");
            writer.write("color: blue; ");
            writer.write("} ");

            writer.write("td.warning { ");
            writer.write("font-weight: bold; ");
            writer.write("color: orange; ");
            writer.write("} ");
            writer.write("</style> ");

            writer.write("<script> ");
            writer.write("function toggleMenu(objID) { ");
            writer.write(" if (!document.getElementById) return;");
            writer.write(" var ob = document.getElementById(objID).style; ");
            writer.write("if(ob.display === 'none') { ");
            writer.write(" try { ");
            writer.write(" ob.display='table-row-group';");
            writer.write("} catch(ex) { ");
            writer.write("	 ob.display='block'; ");
            writer.write("} ");
            writer.write("} ");
            writer.write("else { ");
            writer.write(" ob.display='none'; ");
            writer.write("} ");
            writer.write("} ");
            writer.write("function toggleSubMenu(objId) { ");
            writer.write("for(i=1; i<10000; i++) { ");
            writer.write("var ob = document.getElementById(objId.concat(i)); ");
            writer.write("if(ob === null) { ");
            writer.write("break; ");
            writer.write("} ");
            writer.write("if(ob.style.display === 'none') { ");
            writer.write("try { ");
            writer.write(" ob.style.display='table-row'; ");
            writer.write("} catch(ex) { ");
            writer.write("ob.style.display='block'; ");
            writer.write("} ");
            writer.write(" } ");
            writer.write("else { ");
            writer.write("ob.style.display='none'; ");
            writer.write("} ");
            writer.write(" } ");
            writer.write("} ");
            writer.write("</script> ");
            writer.write("</head> ");

            writer.write("<body> ");
            writer.write("</br>");

            writer.write("<table id='Logos'>");
            writer.write("<colgroup>");
            writer.write("<col style='width: 25%' />");
            writer.write("<col style='width: 25%' />");
            writer.write("<col style='width: 25%' />");
            writer.write("<col style='width: 25%' />");
            writer.write("</colgroup> ");
            writer.write("<thead> ");

            writer.write("<tr class='content'>");
            writer.write("<th class ='Logos' colspan='2' >");
            writer.write("<img align ='left' src= ./Screenshots//" + config.getProperty("Client_logo")
                + ".png></img>");
            writer.write("</th>");
            writer.write("<th class = 'Logos' colspan='2' > ");
            writer.write("<img align ='right' src= .//Screenshots//our.png></img>");
            writer.write("</th> ");
            writer.write("</tr> ");

            writer.write("</thead> ");
            writer.write("</table> ");

            writer.write("<table id='header'> ");
            writer.write("<colgroup> ");
            writer.write("<col style='width: 25%' /> ");
            writer.write("<col style='width: 25%' /> ");
            writer.write("<col style='width: 25%' /> ");
            writer.write(" <col style='width: 25%' /> ");
            writer.write("</colgroup> ");

            writer.write("<thead> ");

            writer.write("<tr class='heading'> ");
            writer.write("<th colspan='4' style='font-family:Copperplate Gothic Bold; font-size:1.4em;'> ");
            writer.write("Quickflix -  Automation Execution Result Summary ");
            writer.write("</th> ");
            writer.write("</tr> ");
            writer.write("<tr class='subheading'> ");
            writer.write("<th>&nbsp;Date&nbsp;&&nbsp;Time&nbsp;:&nbsp;" + ""
                + "</th> ");
            // writer.write("<th>&nbsp;:&nbsp;08-Apr-2013&nbsp;06:24:21&nbsp;PM</th> ");
            writer.write("<th> &nbsp;" + ReportStampSupport.dateTime() + "&nbsp;</th> ");
            writer.write("<th>&nbsp;OnError&nbsp;:&nbsp;</th> ");
            writer.write("<th>NextTestCase</th> ");
            writer.write("</tr> ");


            writer.write("<tr class='subheading'> ");
            writer.write("<th>&nbsp;Suite Executed&nbsp;:&nbsp;</th> ");
            writer.write("<th>Regression</th> ");
            writer.write("<th>&nbsp;Browser&nbsp;:</th> ");
            writer.write("<th>"
                + browserType + "</th> ");
            writer.write("</tr> ");


            writer.write("<tr class='subheading'> ");
            writer.write("<th>&nbsp;Host Name&nbsp;:</th> ");
            writer.write("<th>" +
                os.hostname() + "</th> ");
            writer.write("<th>&nbsp;No.&nbsp;Of&nbsp;Threads&nbsp;:&nbsp;</th> ");
            writer.write("<th>"
                + "NA" + "</th> ");
            writer.write("</tr> ");

            writer.write("<tr class='subheading'> ");
            writer.write("<th colspan='4'> ");
            writer.write("&nbsp;Environment -  " + URL + "");
            writer.write("</th> ");
            writer.write("</tr> ");
            writer.write("</thead> ");
            writer.write("</table> ");
            writer.write("<table id='main'> ");
            writer.write("<colgroup> ");
            writer.write("<col style='width: 5%' /> ");
            writer.write("<col style='width: 35%' /> ");
            writer.write("<col style='width: 42%' /> ");
            writer.write("<col style='width: 10%' /> ");
            writer.write("<col style='width: 8%' /> ");
            writer.write("</colgroup> ");
            writer.write("<thead> ");
            writer.write("<tr class='heading'> ");
            writer.write("<th>S.NO</th> ");
            writer.write("<th>Test Case</th> ");
            writer.write("<th>Description</th> ");
            writer.write("<th>Time</th> ");
            writer.write("<th>Status</th> ");
            writer.write("</tr> ");
            writer.write("</thead> ");
            const iterator1 = map.entries();
            let serialNo = 1;
            for (const [key, value] of iterator1) {
                const keyArr = key.split(":");
                writer.write("<tbody> ");
                writer.write("<tr class='content2' > ");
                writer.write("<td class='justified'>" + serialNo + "</td>");
                if (value === "PASS") {
                    writer.write("<td class='justified'><a href='" + keyArr[1] + "_Results_"
                        + TestEngine.timeStamp + ".html#'"
                        + " target='about_blank'>" + keyArr[1]
                        + "</a></td>");
                } else {
                    writer.write("<td class='justified'><a href='" + keyArr[1] + "_Results_"
                        + TestEngine.timeStamp + ".html'"
                        + " target='about_blank'>" + keyArr[1] + "</a></td>");
                }
                writer.write("<td class='justified'>" + TestEngine.testDescription.get(keyArr[1])
                    + "</td>");
                writer.write("<td>" + executionTime.get(keyArr[1]) + " Seconds</td>");
                if (TestEngine.testResults.get(keyArr[1]) === "PASS")
                    writer.write("<td class='pass'>Passed</td> ");
                else
                    writer.write("<td class='fail'>Failed</td> ");
                writer.write("</tr>");
                writer.write("</tbody> ");
                serialNo = serialNo + 1;
            }
            writer.end();

        } catch (e) {
            writer.end();
        }
    }

    async htmlCreateReport() {
        // Clear the map if needed
        const filePath = path.join(TestEngine.filePath(), `${strTestName}_Results_${TestEngine.timeStamp}.html`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }



    async closeSummaryReport() {
        var file = new File(TestEngine.filePath() + "/" + "SummaryResults_" + TestEngine.timeStamp + ".html");
        var writer = null;
        try {
            writer = new FileWriter(file, true);
            writer.write("<table id='footer'>");
            writer.write("<colgroup>");
            writer.write("<col style='width: 25%' />");
            writer.write("<col style='width: 25%' />");
            writer.write("<col style='width: 25%' />");
            writer.write("<col style='width: 25%' /> ");
            writer.write("</colgroup> ");
            writer.write("<tfoot>");
            writer.write("<tr class='heading'>");
            writer.write("<th colspan='4'>Total Duration  In Seconds (Including Report Creation) : " + ((int)`${HtmlReportSupport.iSuiteExecutionTime}`) + "</th>");
            writer.write("</tr>");
            writer.write("<tr class='content'>");
            writer.write("<td class='pass'>&nbsp;Tests Passed&nbsp;:</td>");
            writer.write("<td class='pass'> " + TestEngine.passCounter + "</td> ");
            writer.write("<td class='fail'>&nbsp;Tests Failed&nbsp;:</td>");
            writer.write("<td class='fail'> " + TestEngine.failCounter + "</td> ");
            writer.write("</tr>");
            writer.write("</tfoot>");
            writer.write("</table> ");
            writer.close();
        } catch (e) { }
    }

    async copyLogos() {
        var srcFolder = new File("Logos");
        var destFolder = new File(TestEngine.filePath() + "\\Screenshots");
        if (!srcFolder.exists()) {
            console.log("Directory does not exist.");
        } else {
            try {
                copyFolder(srcFolder, destFolder);
            } catch (e) { }
        }
    }

    async copyFolder(src, dest) {
        if (src.isDirectory()) {
            if (!dest.exists()) {
                dest.mkdir();
                console.log("Directory copied from " + src + "  to " + dest);
            }
            var files = src.list();
            for (var i = 0; i < files.length; i++) {
                var srcFile = new File(src, files[i]);
                var destFile = new File(dest, files[i]);
                copyFolder(srcFile, destFile);
            }
        } else {
            var inStream = new FileInputStream(src);
            var outStream = new FileOutputStream(dest);
            var buffer = new byte[1024];
            var length;
            while ((length = inStream.read(buffer)) > 0) {
                outStream.write(buffer, 0, length);
            }
            inStream.close();
            outStream.close();
            console.log("File copied from " + src + " to " + dest);
        }
    }




}

class ConfiguratorSupport {
    constructor(filePath) {
        this.filePath = filePath;
        // Load properties from file
    }
}

module.exports = HtmlReportSupport;


