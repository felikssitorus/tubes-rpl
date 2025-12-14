const komponenController = require('../controllers/komponenController');
const Komponen = require('../models/komponenModel');

// Mock model
jest.mock('../models/komponenModel');

describe('Komponen Controller - White Box Testing', () => {
  let req, res;

  beforeEach(() => {
    // Setup mock request & response
    req = {
      body: {},
      params: {}
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('getAllKomponen', () => {
    test('should return all komponen data', async () => {
      const mockData = [
        { id_komponen: 1, nama_komponen: 'Use Case Diagram', bobot_komponen: 20, catatan: 'Test' },
        { id_komponen: 2, nama_komponen: 'Class Diagram', bobot_komponen: 30, catatan: null }
      ];
      
      Komponen.getAll.mockResolvedValue(mockData);
      
      await komponenController.getAllKomponen(req, res);
      
      expect(Komponen.getAll).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    test('should return empty array when no data', async () => {
      Komponen.getAll.mockResolvedValue([]);
      
      await komponenController.getAllKomponen(req, res);
      
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });

  describe('getKomponen', () => {
    test('should return komponen by ID', async () => {
      const mockData = { 
        id_komponen: 1, 
        nama_komponen: 'Use Case Diagram', 
        bobot_komponen: 20,
        catatan: 'Test komponen' 
      };
      req.params.id_komponen = '1';
      
      Komponen.getById.mockResolvedValue(mockData);
      
      await komponenController.getKomponen(req, res);
      
      expect(Komponen.getById).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    test('should return undefined when ID not found', async () => {
      req.params.id_komponen = '999';
      
      Komponen.getById.mockResolvedValue(undefined);
      
      await komponenController.getKomponen(req, res);
      
      expect(Komponen.getById).toHaveBeenCalledWith('999');
      expect(res.json).toHaveBeenCalledWith(undefined);
    });
  });

  describe('createKomponen', () => {
    test('should create new komponen with complete data', async () => {
      const newData = {
        id_tubes: 1,
        nama_komponen: 'Use Case Diagram',
        bobot_komponen: 25,
        catatan: 'Diagram untuk use case'
      };
      req.body = newData;
      
      const createdData = { id_komponen: 1, ...newData };
      Komponen.create.mockResolvedValue(createdData);
      
      await komponenController.createKomponen(req, res);
      
      expect(Komponen.create).toHaveBeenCalledWith(newData);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Komponen created',
        data: createdData
      });
    });

    test('should create komponen without optional catatan', async () => {
      const newData = {
        id_tubes: 1,
        nama_komponen: 'Class Diagram',
        bobot_komponen: 30
      };
      req.body = newData;
      
      const createdData = { id_komponen: 2, ...newData, catatan: null };
      Komponen.create.mockResolvedValue(createdData);
      
      await komponenController.createKomponen(req, res);
      
      expect(Komponen.create).toHaveBeenCalledWith(newData);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Komponen created',
        data: createdData
      });
    });

    test('should handle error when missing required fields', async () => {
      const invalidData = {
        nama_komponen: 'Test'
        // missing id_tubes and bobot_komponen
      };
      req.body = invalidData;
      
      Komponen.create.mockRejectedValue(new Error('Missing required fields'));
      
      await expect(komponenController.createKomponen(req, res)).rejects.toThrow('Missing required fields');
      expect(Komponen.create).toHaveBeenCalledWith(invalidData);
    });
  });

  describe('updateKomponen', () => {
    test('should update komponen successfully', async () => {
      const updateData = {
        id_tubes: 1,
        nama_komponen: 'Updated Use Case',
        bobot_komponen: 35,
        catatan: 'Updated catatan'
      };
      req.params.id_komponen = '1';
      req.body = updateData;
      
      const updatedData = { id_komponen: 1, ...updateData };
      Komponen.update.mockResolvedValue(updatedData);
      
      await komponenController.updateKomponen(req, res);
      
      expect(Komponen.update).toHaveBeenCalledWith('1', updateData);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Komponen updated',
        data: updatedData
      });
    });

    test('should update komponen with null catatan', async () => {
      const updateData = {
        id_tubes: 1,
        nama_komponen: 'Updated Class Diagram',
        bobot_komponen: 40,
        catatan: null
      };
      req.params.id_komponen = '2';
      req.body = updateData;
      
      const updatedData = { id_komponen: 2, ...updateData };
      Komponen.update.mockResolvedValue(updatedData);
      
      await komponenController.updateKomponen(req, res);
      
      expect(Komponen.update).toHaveBeenCalledWith('2', updateData);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Komponen updated',
        data: updatedData
      });
    });
  });

  describe('deleteKomponen', () => {
    test('should delete komponen successfully', async () => {
      req.params.id_komponen = '1';
      
      Komponen.remove.mockResolvedValue(true);
      
      await komponenController.deleteKomponen(req, res);
      
      expect(Komponen.remove).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith({ message: 'Komponen deleted' });
    });

    test('should handle delete non-existent komponen', async () => {
      req.params.id_komponen = '999';
      
      Komponen.remove.mockResolvedValue(false);
      
      await komponenController.deleteKomponen(req, res);
      
      expect(Komponen.remove).toHaveBeenCalledWith('999');
      expect(res.json).toHaveBeenCalledWith({ message: 'Komponen deleted' });
    });
  });
});