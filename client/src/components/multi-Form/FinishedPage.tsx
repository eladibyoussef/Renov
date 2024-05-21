import { useAppSelector } from "@/store/hooks";
import { selectResponse , selectProfessionalError } from "@/features/professional/professionalSlice";



const FinishedPage = () => {
  const response = useAppSelector(selectResponse)
  const error = useAppSelector(selectProfessionalError)
  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Thank You!</h2>
      {response ? <p className="text-lg text-gray-700">
      {response}

      </p>:<p className="text-lg text-gray-700">
      {error}

      </p>}
    </div>
  );
};

export default FinishedPage;
