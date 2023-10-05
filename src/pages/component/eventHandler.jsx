import Cookies from 'js-cookie';

export const handleDownloadCVUrl = async ({ cvUrl, warn, talentName, success, sucOpen }) => {
  const dataArray = Cookies.get('loginRequirement');
  const cookieData = JSON.parse(dataArray || '[]');
  const userId = cookieData.userId;

  if (userId === undefined) {
    warn();
    return;
  } else {
    const response = await fetch(cvUrl);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'CV ' + talentName + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
    const successTitle = 'CV has been downloaded successfully!';
    const successDescription = 'You can check it in your device';
    success(successTitle, successDescription);
    sucOpen();
  }
};
