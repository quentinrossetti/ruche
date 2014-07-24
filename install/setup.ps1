# -- CONFIGURATION -------------------------------------------------------------

$ConfigVersion = '0.0.1';
$CongigPackage = 'http://localhost:42001';

# Allows to try/catch non-terminating errors
$ErrorActionPreference = 'Stop';


# -- FUNCTIONS -----------------------------------------------------------------

function error($Message) {
  Write-Host 'Error: ' -f Red -NoNewLine;
  Write-Host $Message;
}

# -- EXECUTION -----------------------------------------------------------------

# Welcome message
Write-Host '';
Write-Host 'Welcome to ' -NoNewLine;
Write-Host 'ruche' -f Yellow -NoNewLine;
Write-Host ' setup!';
Write-Host '';

# Define and create the install directory
Write-Host 'By deflaut ruche will be installed in your personal directory' $env:USERPROFILE'\.ruche if you want to change this type the directory you want in. If not type "y" or leave blank.';
do {
  $RucheRoot = Read-Host 'Install in ~/.ruche/ ? [y/an other path]'
  if ($RucheRoot -eq 'y' -or $RucheRoot -eq '') {
    $RucheRoot = $env:USERPROFILE + '\.ruche';
  }
  try {
    $Err = $False;
    New-Item $RucheRoot -Type Directory -Force > $null;
    $(Get-Item $RucheRoot -Force).Attributes = 'Hidden';
  } catch {
    $Err = $True;
    error('Unable to create '+$RucheRoot+' please retry with an other path or check you permissions.');
  }
}
while ($Err -eq $True);

# Use the default structure
$InstallPath = $RucheRoot+'\share\ruche\ruche-'+$ConfigVersion+'-win32';
try {
  New-Item $RucheRoot'\share'   -Type Directory -Force > $null;
  New-Item $RucheRoot'\bin'     -Type Directory -Force > $null;
  New-Item $RucheRoot'\etc'     -Type Directory -Force > $null;
  New-Item $RucheRoot'\tmp'     -Type Directory -Force > $null;
  New-Item $RucheRoot'\var\run' -Type Directory -Force > $null;
  New-Item $RucheRoot'\var\www' -Type Directory -Force > $null;
  New-Item $RucheRoot'\var\db'  -Type Directory -Force > $null;
  New-Item $InstallPath         -Type Directory -Force > $null;
} catch {
  error('Unable to create the directories in '+$RucheRoot+' please check you permissions.');
}

# Download ruche archive
$HttpClient = New-Object System.Net.WebClient;
$HttpUrl    = $CongigPackage + '/ruche-' + $ConfigVersion + '-win32.zip';
try {
  $HttpClient.DownloadFile($HttpUrl, 'ruche.zip');
} catch {
  error('Unable to download the file, please ceck your internet connexion. Otherwise '+$CongigPackage+' may be down, excuse us for the inconvenience.');
}

# Extract
# Split-Path $script:MyInvocation.MyCommand.Path
#unzip "ruche.zip" $pwd "c:/dev/test"
$path = 'ruche.zip'
$destination = 'C:/dev/test'
$shell_app= New-Object -com shell.application
$files = Get-ChildItem -Path $path -filter *.zip -recurse
foreach($file in $files) {
  $zip_file = $shell_app.namespace($file.FullName)
  $copyHere = $shell_app.namespace($destination)
  $copyHere.Copyhere($zip_file.items())
}
