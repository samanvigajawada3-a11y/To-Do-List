$serverRoot = Join-Path $env:ProgramFiles 'MongoDB\Server'
$serverVersion = Get-ChildItem -Path $serverRoot -Directory -ErrorAction SilentlyContinue |
    Sort-Object { [version]$_.Name } -Descending |
    Select-Object -First 1

if (-not $serverVersion) {
    Write-Error "MongoDB Server was not found under $serverRoot. Install MongoDB Community Server first."
    exit 1
}

$mongod = Join-Path $serverVersion.FullName 'bin\mongod.exe'
$dataDirectory = Join-Path $PSScriptRoot '.mongo-data'
New-Item -ItemType Directory -Force -Path $dataDirectory | Out-Null

Write-Host "Starting MongoDB $($serverVersion.Name) on 127.0.0.1:27017. Press Ctrl+C to stop."
& $mongod --dbpath $dataDirectory --bind_ip 127.0.0.1 --port 27017
