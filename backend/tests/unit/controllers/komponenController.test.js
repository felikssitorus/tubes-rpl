const komponenController = require('../../../controllers/komponenController');
const Komponen = require('../../../models/komponenModel');

jest.mock('../../../models/komponenModel');

describe('Komponen Controller Test', () => {
  let req, res;

  beforeAll(() => {
    console.log('Initialize Komponen Controller Tests');
  });

  beforeEach(() => {
    req = {
      params: {},
      body: {}
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    console.log('Komponen Controller Tests Completed');
  });

  test('should get all komponen', async () => {
    const mockData = [
      { id_komponen: 1, nama_komponen: 'UTS', bobot_komponen: 30 },
      { id_komponen: 2, nama_komponen: 'UAS', bobot_komponen: 40 }
    ];

    Komponen.getAll.mockResolvedValue(mockData);

    await komponenController.getAllKomponen(req, res);

    expect(Komponen.getAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  test('should get komponen by id', async () => {
    const mockData = { 
      id_komponen: 1, 
      nama_komponen: 'UTS', 
      bobot_komponen: 30 
    };

    req.params.id_komponen = 1;
    Komponen.getById.mockResolvedValue(mockData);

    await komponenController.getKomponen(req, res);

    expect(Komponen.getById).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  test('should create komponen with valid data', async () => {
    const newKomponen = {
      nama_komponen: 'Quiz',
      bobot_komponen: 10,
      id_tubes: 1
    };

    const mockCreated = { id_komponen: 3, ...newKomponen };

    req.body = newKomponen;
    Komponen.create.mockResolvedValue(mockCreated);

    await komponenController.createKomponen(req, res);

    expect(Komponen.create).toHaveBeenCalledWith(newKomponen);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Komponen created',
      data: mockCreated
    });
  });

  test('should update komponen', async () => {
    const updateData = {
      nama_komponen: 'UTS Updated',
      bobot_komponen: 35,
      id_tubes: 1
    };

    const mockUpdated = { id_komponen: 1, ...updateData };

    req.params.id_komponen = 1;
    req.body = updateData;
    Komponen.update.mockResolvedValue(mockUpdated);

    await komponenController.updateKomponen(req, res);

    expect(Komponen.update).toHaveBeenCalledWith(1, updateData);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Komponen updated',
      data: mockUpdated
    });
  });

  test('should delete komponen', async () => {
    req.params.id_komponen = 1;
    Komponen.remove.mockResolvedValue(true);

    await komponenController.deleteKomponen(req, res);

    expect(Komponen.remove).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({ message: 'Komponen deleted' });
  });
});