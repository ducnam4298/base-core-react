import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from 'store';

const useConfig = (configName: string) => {
  const { siteConfiguration } = useSelector((state: ApplicationState) => state.ContextState);

  const config = useMemo(() => {
    return (
      (siteConfiguration || []).find(config => config.configName === configName)?.configValue ?? ''
    );
  }, [siteConfiguration, configName]);

  return config;
};

export default useConfig;
