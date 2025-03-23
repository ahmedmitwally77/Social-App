export type userState = {
  token: string | null;
};

export type IuserProfile = {
    _id: string;
    name: string;
    email: string;
    dateOfBirth: string; // You can use Date if you plan to parse it
    gender: "male" | "female" | "other"; // Assuming limited options
    photo: string;
    createdAt: string; // You can use Date if you plan to parse it
};
