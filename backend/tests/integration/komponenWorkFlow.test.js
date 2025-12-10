const request = require('supertest');
const express = require('express');
const komponenRoutes = require('../../routes/komponenRoutes');
const Komponen = require('../../models/komponenModel');

jest.mock('../../models/komponenModel');
const app = express();
app.use(express.json());
app.use('/komponen', komponenRoutes);

describe('Komponen Full Workflow Test', () => {
  let komponenList;
  beforeAll(() => {
    console.log('Starting Full Workflow Tests');
  });

  beforeEach(() => {
    komponenList = [
      { id_komponen: 1, nama_komponen: 'UTS', bobot_komponen: 30, id_tubes: 1 },
      { id_komponen: 2, nama_komponen: 'UAS', bobot_komponen: 40, id_tubes: 1 }
    ];
    jest.clearAllMocks();
  });

  afterEach(() => {
    komponenList = [
      { id_komponen: 1, nama_komponen: 'UTS', bobot_komponen: 30, id_tubes: 1 },
      { id_komponen: 2, nama_komponen: 'UAS', bobot_komponen: 40, id_tubes: 1 }
    ];
  });

  afterAll(() => {
    console.log('Full Workflow Tests Completed');
  });
  test('workflow: create, read, update, delete komponen', async () => {
    const newKomponen = {
      nama_komponen: 'Quiz',
      bobot_komponen: 10,
      id_tubes: 1
    };

    const mockCreated = { id_komponen: 3, ...newKomponen };
    Komponen.create.mockResolvedValue(mockCreated);

    let response = await request(app)
      .post('/komponen')
      .send(newKomponen);

    expect(response.status).toBe(200);
    expect(response.body.data.nama_komponen).toBe('Quiz');
    Komponen.getById.mockResolvedValue(mockCreated);
    response = await request(app).get('/komponen/3');
    expect(response.status).toBe(200);
    expect(response.body.bobot_komponen).toBe(10);

    const updateData = {
      nama_komponen: 'Quiz Updated',
      bobot_komponen: 15,
      id_tubes: 1
    };

    const mockUpdated = { id_komponen: 3, ...updateData };
    Komponen.update.mockResolvedValue(mockUpdated);
    response = await request(app)
      .put('/komponen/3')
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.data.bobot_komponen).toBe(15);
    Komponen.remove.mockResolvedValue(true);
    response = await request(app).delete('/komponen/3');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Komponen deleted');
  });

  test('workflow: verify bobot calculation', async () => {
    Komponen.getAll.mockResolvedValue(komponenList);
    const response = await request(app).get('/komponen');
    const totalBobot = response.body.reduce(
      (sum, k) => sum + k.bobot_komponen, 
      0
    );
    expect(totalBobot).toBe(70);
    expect(response.body.length).toBe(2);
  });

  test('workflow: test komponen by tubes', async () => {
    const tubesKomponen = komponenList.filter(k => k.id_tubes === 1);
    Komponen.getAll.mockResolvedValue(tubesKomponen);
    const response = await request(app).get('/komponen');
    expect(response.body.every(k => k.id_tubes === 1)).toBe(true);
    expect(response.body.length).toBe(2);
  });
});