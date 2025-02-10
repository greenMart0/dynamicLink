module.exports = async (req, res) => {
    const ref = req.query.ref || "unknown";
  
    // Referral information
    const referralText = `Referral Code: ${ref}`;
    const referralFileName = `ref-${ref}.txt`;
  
    // APK download link
    const githubUrl = "https://objects.githubusercontent.com/github-production-release-asset-2e65be/906700536/ff2c8204-49a3-4c17-93c5-3e8a6c6459b1?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=releaseassetproduction%2F20250210%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250210T091527Z&X-Amz-Expires=300&X-Amz-Signature=6570eb2c0b65ff06245f19f8fcda34fdcd7e11345b826aaa060de493ad139b45&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3Dapp-release.apk&response-content-type=application%2Fvnd.android.package-archive";
  
    // HTML with CSS animation and JS logic
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Preparing Your Download...</title>
        <style>
          body {
            background-color: #f4f4f9;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            padding: 20px;
            color: #333;
          }
          .loader {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #4CAF50;
            border-radius: 50%;
            width: 80px;
            height: 80px;
            animation: spin 1s linear infinite;
            margin: 20px 0;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .message {
            font-size: 1.2em;
            margin: 10px 0;
            text-align: center;
          }
          .footer {
            margin-top: 30px;
            font-size: 0.9em;
            color: #777;
          }
        </style>
      </head>
      <body>
        <h1>Preparing Your Download...</h1>
        <div class="loader"></div>
        <div class="message" id="status">Saving your referral code...</div>
  
        <div class="footer">Please wait, your download will start automatically.</div>
  
        <script>
          // Step 1: Trigger referral file download
          const referralText = "${referralText}";
          const referralFileName = "${referralFileName}";
  
          const refBlob = new Blob([referralText], { type: "text/plain" });
          const refLink = document.createElement("a");
          refLink.href = URL.createObjectURL(refBlob);
          refLink.download = referralFileName;
          document.body.appendChild(refLink);
          refLink.click();
          document.body.removeChild(refLink);
  
          // Update status message
          document.getElementById("status").innerText = "Referral saved! Downloading app...";
  
          // Step 2: Start APK download after 2 seconds
          setTimeout(() => {
            window.location.href = "${githubUrl}";
          }, 2000);
        </script>
      </body>
      </html>
    `;
  
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(htmlContent);
  };
  