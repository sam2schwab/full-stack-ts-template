const defaultConfig = {
    API_URL: '/api',
};
const config = process.env.NODE_ENV === 'development' ? {} : {};

export default { ...defaultConfig, ...config };
