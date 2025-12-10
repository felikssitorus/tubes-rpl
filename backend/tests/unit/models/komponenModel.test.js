const pool = require('../../../config/db');
const Komponen = require('../../../models/komponenModel');
jest.mock('../../../config/db');

describe('Komponen Model Test', () => {

  beforeAll(() => {
    console.log('Start testing Komponen Model');
  });

  afterAll(() => {
    console.log('Done testing Komponen Model');
  });

  beforeEach(() => {
    console.log('Before each test');
    jest.clearAllMocks();
  });

  afterEach(() => {
    console.log('After each test');
  });

  test('should test basic assertion', () => {
    expect(1).toBe(1);
  });

  test('should return all komponen', async () => {
    const mockData = [
      { id_komponen: 1, nama_komponen: 'UTS', bobot_komponen: 30, id_tubes: 1 },
      { id_komponen: 2, nama_komponen: 'UAS', bobot_komponen: 40, id_tubes: 1 }
    ];

    pool.query.mockResolvedValue({ rows: mockData });

    const result = await Komponen.getAll();

    expect(result).toEqual(mockData);
    expect(result.length).toBe(2);
    expect(pool.query).toHaveBeenCalledWith(
      'SELECT * FROM komponen ORDER BY id_komponen ASC'
    );
  });

  test('should return komponen by id', async () => {
    const mockData = { 
      id_komponen: 1, 
      nama_komponen: 'UTS', 
      bobot_komponen: 30,
      id_tubes: 1 
    };

    pool.query.mockResolvedValue({ rows: [mockData] });

    const result = await Komponen.getById(1);

    expect(result).toEqual(mockData);
    expect(result.nama_komponen).toBe('UTS');
    expect(result.bobot_komponen).toBe(30);
  });

  test('should create komponen and return with id', async () => {
    const newKomponen = {
      nama_komponen: 'Quiz',
      bobot_komponen: 10,
      id_tubes: 1
    };

    pool.query
      .mockResolvedValueOnce({ rows: [{ max_id: 2 }] })
      .mockResolvedValueOnce({ 
        rows: [{ id_komponen: 3, ...newKomponen }] 
      });

    const result = await Komponen.create(newKomponen);

    expect(result.id_komponen).toBe(3);
    expect(result.nama_komponen).toBe('Quiz');
    expect(pool.query).toHaveBeenCalledTimes(2);
  });
});