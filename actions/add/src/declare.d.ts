import '@flump/registry';

type ResultString = (result: unknown) => string | Promise<string>;

type AddConfig = ({
    template: string | ResultString;
} | { templateFile: string | ResultString }) & {
    dest: string | ResultString;
};

declare module '@flump/registry' {
    interface ActionTypes {
        add: AddConfig;
    }
}
