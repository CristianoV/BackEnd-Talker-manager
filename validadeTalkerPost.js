const HTTP_BAD_REQUEST_STATUS = 401;
const HTTP_BAD_REQUEST_STATUS2 = 400;

const validadeToken = (_request, response, next) => {
    const { authorization } = _request.headers;
    if (!authorization) {
        return response.status(HTTP_BAD_REQUEST_STATUS).json({
            message: 'Token não encontrado',
        });
    }
    if (authorization.length < 16) {
        return response.status(HTTP_BAD_REQUEST_STATUS).json({
            message: 'Token inválido',
        });
    }
    next();
    };

    const validadeName = (_request, response, next) => {
        const { name } = _request.body;
        if (!name) {
            return response.status(HTTP_BAD_REQUEST_STATUS2).json({
                message: 'O campo "name" é obrigatório',
            });
        }
        if (name.length < 3) {
            return response.status(HTTP_BAD_REQUEST_STATUS2).json({
                message: 'O "name" deve ter pelo menos 3 caracteres',
            });
        }
        next();
    };

    module.exports = { validadeToken, validadeName };