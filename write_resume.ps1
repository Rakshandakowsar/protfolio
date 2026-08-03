$path = 'C:\Users\User\OneDrive\Desktop\protfolio\public\resume.pdf'
$text = "RAKSHANDA KOWSAR

I want this matter when they download my resume"
$streamText = "BT /F1 16 Tf 72 720 Td ($($text -replace '\\', '\\\\' -replace '\(', '\\(' -replace '\)', '\\)')) Tj ET"
$streamBytes = [System.Text.Encoding]::ASCII.GetBytes($streamText)
$streamLength = $streamBytes.Length

$objects = @(
  '1 0 obj',
  '<< /Type /Catalog /Pages 2 0 R >>',
  'endobj',
  '2 0 obj',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  'endobj',
  '3 0 obj',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
  'endobj',
  '4 0 obj',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  'endobj',
  '5 0 obj',
  "<< /Length $streamLength >>",
  'stream',
  $streamText,
  'endstream',
  'endobj'
)

$sb = [System.Text.StringBuilder]::new()
$sb.AppendLine('%PDF-1.4') | Out-Null
$offsets = @()
$offsets += $sb.Length
for ($i = 0; $i -lt $objects.Count; $i++) {
  $offsets += $sb.Length
  $sb.AppendLine($objects[$i]) | Out-Null
}

$xrefOffset = $sb.Length
$sb.AppendLine('xref') | Out-Null
$sb.AppendLine('0 6') | Out-Null
$sb.AppendLine('0000000000 65535 f ') | Out-Null
for ($i = 1; $i -le 5; $i++) {
  $sb.AppendLine((('{0:D10}' -f $offsets[$i]) + ' 00000 n ')) | Out-Null
}
$sb.AppendLine('trailer') | Out-Null
$sb.AppendLine('<< /Size 6 /Root 1 0 R >>') | Out-Null
$sb.AppendLine('startxref') | Out-Null
$sb.AppendLine($xrefOffset.ToString()) | Out-Null
$sb.AppendLine('%%EOF') | Out-Null

[System.IO.File]::WriteAllText($path, $sb.ToString(), [System.Text.Encoding]::ASCII)
Write-Host "Wrote $path"
