import { saveAs } from 'file-saver';

const DISPOSITION_FILENAME = /filename=(?:")?(\S+)\.(\w+)(?:")?/;

function getFileNameFromHeader(contentTypeHeader: string): string {
  const [, name, ext] = DISPOSITION_FILENAME.exec(contentTypeHeader.replace(/\s/g, '_')) || [];
  return `${name}.${ext}`;
}

export function saveFileFromResponse({
  headers,
  data,
}: {
  headers: Record<string, string>;
  data: Blob;
}): void {
  if (!(data instanceof Blob)) {
    throw new Error(
      "Only Blob response can be used in useFileDownload. Set { responseType: 'blob' } for request",
    );
  }
  const contentDisposition = headers['content-disposition'];
  saveAs(
    new Blob([data], { type: headers['content-type'] }),
    getFileNameFromHeader(contentDisposition),
  );
}
