import { downloadCV, fetchWishlist } from "apis";
import  Cookies from "js-cookie";

const dataArray = Cookies.get('loginRequirement');
const cookieData = JSON.parse(dataArray || '[]');
const userId = cookieData.userId;

export const handleDownloadCV = ({talentId, talentName}) => {
    downloadCV(talentId)
      .then((response) => {
        // The response data from the server is transformed into a Blob object
        // with the type 'application/pdf'. Blob is a binary data representation,
        // and in this context, it is used to create a PDF file.
        const blob = new Blob([response.data], { type: 'application/pdf' });

        // Determine the filename for the downloaded file
        let filename = 'CV ' + talentName + '.pdf';
        const contentDispositionHeader = response.headers['content-disposition'];
        if (contentDispositionHeader && typeof contentDispositionHeader === 'string') {
          const filenameMatch = contentDispositionHeader.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
          if (filenameMatch && filenameMatch[1]) {
            filename = filenameMatch[1].replace(/['"]/g, '');
          }
        }

        // Create a URL object from the blob data
        const blobUrl = window.URL.createObjectURL(blob);

        // Create a temporary <a> element to trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        link.click();

        // Clean up the temporary URL object
        window.URL.revokeObjectURL(blobUrl);

        console.log('CV berhasil di download');
      })
      .catch((error) => {
        console.error('Error downloading CV:', error);
      });
  };

export const fetchDataWishlist = () => {
  fetchWishlist(userId)
        .then((response)=>{
            const talentIdArr = response.data.map((item)=>item.talentId);
            // setIsWishlist(talentIdArr.includes(parseInt(id)));
        })
        .catch((error)=>{
            console.error(error);
        });
}

