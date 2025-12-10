const request = require('supertest');
const express = require('express');
const komponenRoutes = require('../../routes/komponenRoutes');
const Komponen = require('../../models/komponenModel');

jest.mock('../../models/komponenModel');

const app = express();
app.use(express.json());
app.use('/komponen', komponenRoutes);

describe('Komponen API Integration Test', () => {
  let testData;

  beforeAll(() => {
    console.log('Starting Komponen API Integration Tests');
  });

    beforeEach(() => {
    console.log('Setting up test data');
    testData = [
      { id_komponen: 1, nama_komponen: 'UTS', bobot_komponen: 30, id_tubes: 1 },
      { id_komponen: 2, nama_komponen: 'UAS', bobot_komponen: 40, id_tubes: 1 }
    ];
    jest.clearAllMocks();
  });
    afterEach(() => {
    console.log('Cleaning up test data');
    testData = null;
  });

  afterAll(() => {
    console.log('Komponen API Integration Tests Completed');
  });

  test('GET /komponen should return all komponen', async () => {
    Komponen.getAll.mockResolvedValue(testData);
    const response = await request(app).get('/komponen');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(testData);
    expect(response.body.length).toBe(2);
  });

  test('GET /komponen/:id should return komponen by id', async () => {
    Komponen.getById.mockResolvedValue(testData[0]);
    const response = await request(app).get('/komponen/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(testData[0]);
    expect(response.body.nama_komponen).toBe('UTS');
  });

  test('POST /komponen should create new komponen', async () => {
    const newKomponen = {
      nama_komponen: 'Quiz',
      bobot_komponen: 10,
      id_tubes: 1
    };
    const mockCreated = { id_komponen: 3, ...newKomponen };
    Komponen.create.mockResolvedValue(mockCreated);
    const response = await request(app)
      .post('/komponen')
      .send(newKomponen);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Komponen created');
    expect(response.body.data).toEqual(mockCreated);
  });

  test('PUT /komponen/:id should update komponen', async () => {
    const updateData = {
      nama_komponen: 'UTS Updated',
      bobot_komponen: 35,
      id_tubes: 1
    };

    const mockUpdated = { id_komponen: 1, ...updateData };
    Komponen.update.mockResolvedValue(mockUpdated);

    const response = await request(app)
      .put('/komponen/1')
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Komponen updated');
    expect(response.body.data.bobot_komponen).toBe(35);
  });

  test('DELETE /komponen/:id should delete komponen', async () => {
    Komponen.remove.mockResolvedValue(true);
    const response = await request(app).delete('/komponen/1');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Komponen deleted');
  });
});