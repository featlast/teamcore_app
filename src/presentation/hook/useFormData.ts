import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { getDataForm } from '../../api/data-form';

interface Question {
  question_id: string;
}

interface FormData {
  [key: string]: string;
}

interface UseFormDataResult {
  formData: { data: Question[] } | null;
  error: string | null;
  loading: boolean;
  validationSchema: Yup.ObjectSchema<any>;
  initialValues: FormData;
}

export function useFormData(): UseFormDataResult {
  const [formData, setFormData] = useState<{ data: Question[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataForm();
        if (result?.data && result?.data?.status >= 400) {
          setError(result.response.data);
        } else {
          setFormData(result?.data);
        }
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('Ocurrió un error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const validationSchema = Yup.object().shape(
    formData?.data?.reduce((acc: {[key: string]: any}, question: Question) => {
      acc[question.question_id] = Yup.string().required('Esta pregunta es obligatoria');
      return acc;
    }, {}) || {}
  );

  const initialValues: FormData = formData?.data?.reduce((acc: FormData, question: Question) => {
    acc[question.question_id] = '';
    return acc;
  }, {}) || {};

  return { formData, error, loading, validationSchema, initialValues };
}
