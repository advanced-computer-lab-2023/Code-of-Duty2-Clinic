export const filterParams = (params: any) => {
    return Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null && v !== ''));
};