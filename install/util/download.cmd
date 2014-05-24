@set @e=0 /*
@echo off
set @e=
setlocal
  set "i=0"
  for %%i in (%*) do set /a "i+=1"
  if "%i%" neq "2" goto:eof
  cscript //nologo //e:jscript "%~f0" %1 %2
endlocal
exit /b
*/

function download(url, dest) {
  var objXMLHTTP = new ActiveXObject("MSXML2.XMLHTTP");
  objXMLHTTP.onreadystatechange=function() {
    if (objXMLHTTP.readyState === 4) {
      var objADOStream = new ActiveXObject("ADODB.Stream");
      objADOStream.open();
      objADOStream.type = 1;
      objADOStream.write(objXMLHTTP.ResponseBody);
      objADOStream.position = 0;
      objADOStream.saveToFile(dest, 2);
      objADOStream.close();
    }
  };

  objXMLHTTP.open("GET", url, false);
  objXMLHTTP.send();
}

with (WScript.Arguments) {
  try {
    var url = Unnamed(0), dest = Unnamed(1);
    download(url, dest);
  }
  catch (e) {
    WScript.echo(e.message);
  }
}