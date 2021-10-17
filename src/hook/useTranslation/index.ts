import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from 'store';

const useTranslation = () => {
  const { languages, language = '' } = useSelector((state: ApplicationState) => state.ContextState);

  const dataLang = useMemo(() => {
    return languages && Object.keys(languages)?.length ? languages[language] : {};
  }, [language, languages]);

  return dataLang;
};

export default useTranslation;
