// import React, { useState } from 'react';
// import Downloader from './Downloader';
// import { Attachment } from 'models/attachment';

// const useFileDownloader = () => {
//   const [files, setFiles] = useState<Attachment[]>([]);

//   const download = (file: Attachment) => setFiles(fileList => [...fileList, { ...file }]);

//   const remove = (removeId: string) =>
//     setFiles(files => [...files.filter(file => file.id !== removeId)]);

//   return [
//     (e: Attachment) => download(e),
//     files.length > 0 ? <Downloader files={files} remove={(e: Attachment) => remove(e.id)} /> : null,
//   ];
// };

// export default useFileDownloader;
export {};
