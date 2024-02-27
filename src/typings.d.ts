declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

interface ColumnsFunctionProps
{
    setCurrentRow: (currentRow: any) => void
    setUpdateModalVisible: (visible: boolean) => void
    handleDelete: (record: any) => void
}
interface InitialState
{
    currentUser?: API.LoginUserVO,
    settings?: Partial<LayoutSettings>
}