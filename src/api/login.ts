import { ILoginForm, IRegisterParam } from '@/views/login/index.model';
import Service from '@/utils/request';

export const logout = (param: string) => Service.post('login/xxx', param);

export const login = async (param: ILoginForm) => await Service.post('/script-editor/entry/4001', param);

export const Register = async (param: IRegisterParam) => await Service.post('/script-editor/entry/4000', param);

export const UserInfo = async () => await Service.post('/script-editor/entry/4002');

export const ChangeUserInfo = async (param: any) => await Service.post('/script-editor/entry/4003', param);
