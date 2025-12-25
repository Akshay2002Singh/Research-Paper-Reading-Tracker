import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import PaperForm from '@/components/PaperForm';
import { createPaper } from '@/api/papers';

export default function AddPaper() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createPaper,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['papers'] });
            queryClient.invalidateQueries({ queryKey: ['analytics'] });
            navigate('/library');
        },
        onError: (error) => {
            console.error(error);
            alert('Failed to add paper. check console.');
        }
    });

    return (
        <div className="container py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PaperForm onSubmit={(data) => mutation.mutate(data)} isLoading={mutation.isPending} />
        </div>
    );
}
