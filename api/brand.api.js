import httpClient from './httpClient';

const END_POINT = '/project';

const getAll = () => httpClient.get(END_POINT);

const getById = (id) => httpClient.get(END_POINT + `?id=${id}`);

const add = (projectObject) => httpClient.post(END_POINT, projectObject);

const update = (projectObject) => httpClient.put(END_POINT, projectObject);

const deleteById = (id) => httpClient.delete(END_POINT + `?id=${id}`);

export {
    getAll,
    getById,
    add,
    update,
    deleteById
}