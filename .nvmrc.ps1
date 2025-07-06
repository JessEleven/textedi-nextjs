$version = Get-Content .nvmrc

if ($version) {
    nvm use $version
    
} else {
    Write-Host "No .nvmrc file found."
}