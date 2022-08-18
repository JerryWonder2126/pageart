// eslint-disable-next-line node/no-extraneous-import
import {BlobServiceClient, ContainerClient} from '@azure/storage-blob';
import {v1 as uuidv1} from 'uuid';
import {IAzureResponse} from './azure.interface';

export class AzureService {
  // Basically deals with establishing a connection to Azure Storage Account
  private IMG_URL_PREFIX = `https://${this.storageAccountName}.blob.core.windows.net/${this.containerName}/`;

  get imgUrlPrefix() {
    return this.IMG_URL_PREFIX;
  }

  private AZURE_STORAGE_CONNECTION_STRING: string = process.env
    .AZURE_STORAGE_CONNECTION_STRING as string;

  constructor(
    public containerName: string,
    public storageAccountName: string
  ) {}

  private async connectToAzureBlobService() {
    return await BlobServiceClient.fromConnectionString(
      this.AZURE_STORAGE_CONNECTION_STRING
    );
  }

  private async prepareForConnection() {
    try {
      const blobServiceClient: BlobServiceClient =
        await this.connectToAzureBlobService();
      const containerClient: ContainerClient =
        await blobServiceClient.getContainerClient(this.containerName);
      return containerClient;
    } catch (err: any) {
      throw new Error(JSON.stringify(err));
    }
  }

  async getContainerClient(containerName?: string) {
    /**
     * Get a reference to a container
     * @param containerName - name of contianer (optional), if not given, connects to default container
     */
    try {
      let containerClient: ContainerClient;
      if (containerName) {
        const blobService = await this.connectToAzureBlobService();
        containerClient = await blobService.getContainerClient(containerName);
      } else {
        containerClient = await this.prepareForConnection();
      }
      return containerClient;
    } catch (err: any) {
      throw new Error(JSON.stringify(err));
    }
  }

  async createNewContainer(containerName: string) {
    const response: IAzureResponse = {};
    try {
      // Create a unique name for the container
      containerName += uuidv1();
      const containerClient = await this.getContainerClient(containerName);
      // Create the container
      await containerClient.create();
      response.name = containerName;
    } catch (err: any) {
      response.error = true;
      throw new Error(JSON.stringify(err));
    }
    return response;
  }

  async uploadToBlob(file: any, containerClient?: ContainerClient) {
    /**
     * Saves a new image to container
     * @param file - image file to be uploaded to container
     * @param containerClient - an object that is already connected to the container (optional)
     */
    const response: IAzureResponse = {};
    try {
      if (!containerClient) {
        containerClient = await this.prepareForConnection();
      }
      const [name, extension] = file.name.split('.');
      const fileName = `${name.replace(' ', '-')}-${uuidv1()}.${extension}`; //'art-page' + uuidv1();
      // Get a block blob client
      const blockBlobClient = await containerClient.getBlockBlobClient(
        fileName
      );
      const uploadBlobResponse = await blockBlobClient.upload(
        file.data,
        file.size
      );
      response.name = fileName;
      response.requestId = uploadBlobResponse.requestId;
    } catch (err: any) {
      response.error = true;
      console.log(err);
      throw new Error(JSON.stringify(err));
    }
    return response;
  }

  async deleteImageFromBlob(
    fileName: string,
    containerClient?: ContainerClient
  ) {
    /**
     * Deletes an image from container
     * @param fileName - the name of the image to be deleted
     * @param containerClient - an obj connected to the container (optional)
     */
    const response: IAzureResponse = {name: uuidv1()};
    try {
      if (!containerClient) {
        containerClient = await this.prepareForConnection();
      }
      // Get a block blob client
      const blockBlobClient = await containerClient.getBlockBlobClient(
        fileName
      );
      await blockBlobClient.delete();
      response.name = fileName;
      // response.requestId = uploadBlobResponse.requestId;
    } catch (err: any) {
      if (err.RestError !== 'The specified blob does not exist.') {
        response.error = true;
        throw new Error(JSON.stringify(err));
      }
    }
    return response;
  }
}
