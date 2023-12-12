import { ICompilerTemplate } from '../../../../../config/HtmlCompiler';

export type SendMailDTO = {
    email: string;
    subject: string;
    template: ICompilerTemplate;
};
