import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

const useRequestSignature = () => {
    return useMutation({
        mutationFn: async (address: string) => {
            const path = '/api/auth/request-signature';
            const res = await axiosInstance.post(path, { address });
            return res.data;
        }
    });
};

export default useRequestSignature;