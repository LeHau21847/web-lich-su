Write-Host "Dang ket noi voi Vercel..."
npx vercel login
if ($?) {
    Write-Host "Dang tai len Vercel..."
    npx vercel --prod --yes
}
Write-Host "Hoan thanh! Bam Enter de thoat."
Read-Host
