import {IParsedResponse} from './general.interface';

export function handleError(response: IParsedResponse, err: any) {
  /**
   * Modifies error property on response object
   */
  response.error = err.stack;
}

export const getStatus = (result: IParsedResponse, intendedStatus: number) =>
  result.error ? 404 : intendedStatus;

export const parseImageList = (fileList: any) => {
  let imgFiles = [];
  if (fileList) {
    const images = fileList.image;
    if (images?.length) {
      imgFiles = images;
    } else {
      imgFiles[0] = images;
    }
  }
  return imgFiles;
};
