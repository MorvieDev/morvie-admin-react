import { http } from "@api/http"

interface UploadFileRequest {

}

interface UploadFileResponse {

}

export async function uploadFile(uploadFileRequest: UploadFileRequest, file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    // const response = await http.post<{ url: string }>('/upload', formData, {
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //     },
    // });

    // return response.url;
    return "";
}