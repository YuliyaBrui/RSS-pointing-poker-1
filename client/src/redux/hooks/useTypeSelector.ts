import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '..';

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
