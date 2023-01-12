import supertest from 'supertest';

import { createApp } from 'src/app';

describe('Todo Integration tests', () => {
    let server: Express.Application;
    let createdTodoId: string;

    beforeAll(async () => {
        server = await createApp();
    });

    describe('GET /api/todo', () => {
        it('returns 200', async () => {
            const response = await supertest(server).get('/api/todo');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });
    });

    describe('POST /api/todo', () => {
        it('returns 201', async () => {
            const response = await supertest(server).post('/api/todo').send({ description: 'Test todo' });
            expect(response.status).toBe(201);
            expect(response.body.description).toBe('Test todo');
            expect(response.body.id).toBeString();

            createdTodoId = response.body.id;
        });

        it('returns 400', async () => {
            const response = await supertest(server).post('/api/todo').send({});
            expect(response.status).toBe(400);
            expect(response.body.error_code).toBe('API_VALIDATION_ERROR');
        });
    });

    describe('PUT /api/todo', () => {
        it('returns 200', async () => {
            const response = await supertest(server)
                .put(`/api/todo/${createdTodoId}`)
                .send({ description: 'Updated test todo' });
            expect(response.status).toBe(200);
            expect(response.body.description).toBe('Updated test todo');
        });

        it('returns 400', async () => {
            const response = await supertest(server).put(`/api/todo/${createdTodoId}`).send({});
            expect(response.status).toBe(400);
            expect(response.body.error_code).toBe('API_VALIDATION_ERROR');
        });

        it('returns 404', async () => {
            const response = await supertest(server).put(`/api/todo/xxxx`).send({ description: 'Updated test todo' });
            expect(response.status).toBe(404);
            expect(response.body.error_code).toBe('NOT_FOUND_ERROR');
        });
    });

    describe('DELETE /api/todo', () => {
        it('returns 200', async () => {
            let response = await supertest(server).delete(`/api/todo/${createdTodoId}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Successfully deleted');

            response = await supertest(server).get('/api/todo');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([]);
        });

        it('returns 404', async () => {
            const response = await supertest(server).delete('/api/todo/xxxxx');
            expect(response.status).toBe(404);
            expect(response.body.error_code).toBe('NOT_FOUND_ERROR');
        });
    });
});
