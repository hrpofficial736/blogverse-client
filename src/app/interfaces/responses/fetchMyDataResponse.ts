export interface fetchMyDataResponse {
  data?: {
    username: string;
    name: string;
    email: string;
    image: string;
    country: string;
    profession: string;
    description: string;
    blogs: [];
  };
  error?: string;
}
