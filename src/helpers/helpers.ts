import {IParsedResponse} from './general.interface';

export function handleError(response: IParsedResponse, err: any) {
  /**
   * Modifies error property on response object
   */
  //   if ('stack' in err) {
  //     response.error = err.stack;
  //   } else {
  //     response.error = JSON.stringify(err);
  //   }
  console.log(err);
  response.error = err.stack;
}

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
