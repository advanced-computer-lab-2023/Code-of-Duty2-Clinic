export const filterParams = (params: any) => {
    return Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== null && v !== undefined && v !== ''));
};

export const displayRequiredOption = (option: any) => {
    return (!option || option === '') ? '---Not selected': option;
}