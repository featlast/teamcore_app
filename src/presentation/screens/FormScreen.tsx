import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {getDataForm, sendDataForm} from '../../api/data-form';
import {colors} from '../../theme/colors';
import {useFormData} from '../hook/useFormData';
import {SvgUri} from 'react-native-svg';
import Toast from 'react-native-toast-message';
import {Answer, Question, FormData} from './interfaces/interfaces';

const FormScreen = () => {
  //TODO:Pendiente refactorizar styles, usehook, and fx
  ///get Data form
  //TODO: Pendiente implementar el hook
  // const {formData, error, loading, validationSchema, initialValues} = useFormData();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
        setError('Ocurrió un error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  const validationSchema = Yup.object().shape(
    formData?.data?.reduce((acc: {[key: string]: any}, question: Question) => {
      acc[question.question_id] = Yup.string().required('Esta pregunta es obligatoria');
      return acc;
    }, {}),
  );

  const initialValues: FormData = formData?.data.reduce((acc: FormData, question: Question) => {
    acc[question.question_id] = '';
    return acc;
  }, {});

  const handleSubmit = async (values: FormData) => {
    const currentDate = new Date().toISOString();
    const formattedData = {
      date: currentDate,
      data: Object.entries(values).map(([question_id, answer_id]) => ({
        question_id,
        answer_id,
      })),
    };

    try {
      setIsLoading(true);
      const response = await sendDataForm(formattedData);
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Éxito Las respuestas',
          text2: 'se han enviado correctamente ✌️',
        });
        Alert.alert('Info Exitosa');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Hubo un problema al enviar las respuestas',
          text2: '⚠️',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `Error al enviar las respuestas:${error}`,
        text2: '⚠️',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.white}}>
      <SvgUri
        width={150}
        height={150}
        uri="https://www.teamcore.net/wp-content/uploads/2020/10/logoteamcore-azul-37.svg"
        style={{alignSelf: 'center'}}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({handleChange, handleSubmit, values, errors, touched, isValid}) => (
          <View>
            {formData?.data?.map((question: Question) => (
              <View style={{paddingTop: 30}} key={question.question_id}>
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: 'justify',
                    color: colors.primary,
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontWeight: 'bold',
                  }}>
                  {question.question}
                </Text>
                {question.answers.map((answer: Answer) => (
                  <TouchableOpacity
                    key={answer.answer_id}
                    onPress={() => handleChange(question.question_id)(answer.answer_id)}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          borderWidth: 2,
                          borderColor: 'black',
                          marginRight: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginLeft: 10,
                        }}>
                        {values[question.question_id] === answer.answer_id && (
                          <View
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: 5,
                              backgroundColor: 'black',
                            }}
                          />
                        )}
                      </View>
                      <Text
                        style={{
                          fontSize: 15,
                          color: colors.primary,
                        }}>
                        {answer.answer}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
                {touched[question.question_id] && errors[question.question_id] && (
                  <Text style={{color: 'red'}}>{errors[question.question_id]}</Text>
                )}
              </View>
            ))}
            <TouchableOpacity
              onPress={() => handleSubmit()}
              disabled={!isValid}
              style={{
                backgroundColor: isValid ? 'blue' : 'gray',
                padding: 10,
                marginTop: 40,
                alignItems: 'center',
                width: '80%',
                height: 40,
                borderRadius: 10,
                alignSelf: 'center',
              }}>
              {isLoading ? (
                <ActivityIndicator size={'small'} color={colors.white} />
              ) : (
                <Text style={{color: colors.white, fontWeight: 'bold'}}>Enviar</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default FormScreen;
